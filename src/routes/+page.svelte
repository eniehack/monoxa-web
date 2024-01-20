<script lang="ts">
	import { onMount } from "svelte";
    import { type Writable, writable } from "svelte/store";
    import { IconPlayerStopFilled, IconPlayerRecordFilled } from "@tabler/icons-svelte";

    type RecordingState = "recording" | "recorded" | "notstarted" ;
    const RECORDING_CODEC = "audio/webm; codec=vorbis";
    const SPACE_KEY = "Space";

    let recordBtn;
    let playerElem: HTMLAudioElement;
    let downloadElem: HTMLAnchorElement;    
    let mediaRecorder: Writable<MediaRecorder | undefined> = writable();
    let chunks: Writable<Blob[]> = writable([]);
    let blob: Writable<Blob> = writable();
    let voiceURL: Writable<string> = writable();
    let recordingState: Writable<RecordingState> = writable("notstarted");

    const handleRecordingStop = () => {
        if ($recordingState === "recording" && typeof $mediaRecorder !== "undefined") {
            $mediaRecorder.stop();
            console.log("saved");
            //$mediaRecorder = undefined;
            return
        }
    }

    const handleRecording = async () => {
        if (typeof $mediaRecorder === "undefined" || $recordingState === "recording") return
        $mediaRecorder.start()
    }

    const handleRecordingStartByKey = (e: KeyboardEvent) => {
        if (e.code !== SPACE_KEY || $recordingState === "recording") return;
        console.log("keydown")
        console.log(e)
        handleRecording();
    }

    const handleRecordingStopByKey = (e: KeyboardEvent) => {
        if (e.code !== SPACE_KEY || $recordingState !== "recording") return; 
        console.log("keyup")
        console.log(e)
        handleRecordingStop();
    }

    const handleRecordingStartByClick = (e: UIEvent) => {
        console.log("keydown")
        console.log(e)
        handleRecording();
    }

    const handleRecordingStopByClick = (e: UIEvent) => {
        console.log("keyup")
        console.log(e)
        handleRecordingStop();
    }

    onMount(async () => {
        if (!navigator.mediaDevices) {
            window.alert("mediadevices is unavailable")
            return
        }
        if (!MediaRecorder.isTypeSupported(RECORDING_CODEC)) {
            window.alert("unsupported mime type")
            return
        }
        recordingState.subscribe(s => {
            if (s === "recorded") {
                playerElem.style.visibility = "visible"
            } else {
                playerElem.style.visibility = "hidden"
            }
        })
        const stream = await navigator.mediaDevices.getUserMedia({audio: true});
        $mediaRecorder = new MediaRecorder(stream, {mimeType: RECORDING_CODEC});
        $mediaRecorder.ondataavailable = (e) => {
            $chunks.push(e.data);
        }
        $mediaRecorder.onstart = () => {
            recordingState.set("recording");
            console.log("start")
        }
        $mediaRecorder.onstop = () => {
            console.log("stoping")
            $blob = new Blob($chunks, {type: RECORDING_CODEC});
            console.log($chunks)
            $chunks = [];
            recordingState.set("recorded");
            playerElem.src = URL.createObjectURL($blob);
            voiceURL.set(URL.createObjectURL($blob));
        }
    });
</script>

<svelte:window on:keydown={handleRecordingStartByKey} on:keyup={handleRecordingStopByKey}/>

<div class="flex flex-col place-item-center" id="content">
    <button id="record-btn" class="rounded-full bg-red-600 text-white" bind:this={recordBtn} on:pointerdown={handleRecordingStartByClick} on:pointerup={handleRecordingStopByClick}>
        {#if $recordingState === "recording"}
            <IconPlayerStopFilled color="gray-100" size={100}/>
        {:else}
            <IconPlayerRecordFilled color="gray-100" size={100} />    
        {/if}
    </button>
    <p>
        {#if $recordingState === "recording"}
            離してstop
        {:else}
            spaceキーかタップしてstart       
        {/if}
    </p>
    
    <audio id="player" bind:this={playerElem} controls></audio>
    
    {#if $recordingState === "recorded" && $blob !== null}
        <a href={$voiceURL}>download</a>
    {/if}
</div>

<style lang="postcss">
    #record-btn {
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 200px;
        text-decoration: none;
        text-align: center;
        margin: 10px 0;
    }

    #content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
