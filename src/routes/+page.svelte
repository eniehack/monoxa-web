<script lang="ts">
	import { onMount } from "svelte";

    let stopBtn;
    let startBtn;
    let playerElem: HTMLAudioElement;

    const startRecording = (mediaRecorder: MediaRecorder) => {
        mediaRecorder.start()
    }
    
    const stopRecording = (mediaRecorder: MediaRecorder) => {
        if (mediaRecorder.state === "inactive") {
            return
        }
        mediaRecorder.stop();
        console.log("saved")
    }

    let mediaRecorder: MediaRecorder;
    let chunks: Blob[] = [];
    let isRecording = false;

    onMount(async () => {
        if (!navigator.mediaDevices) {
            window.alert("mediadevices is unavailable")
            return
        }
        if (!MediaRecorder.isTypeSupported("audio/ogg")) {
            window.alert("ogg is unsupported")
            return
        }
        const stream = await navigator.mediaDevices.getUserMedia({audio: true})
        mediaRecorder = new MediaRecorder(stream, {mimeType: "audio/ogg"});
        mediaRecorder.ondataavailable = (e) => {
            chunks.push(e.data);
        }
        mediaRecorder.onstart = () => {
            isRecording = true;
        }
        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, {type: "audio/ogg; codecs=vorbis"});
            chunks = [];
            isRecording = false;
            playerElem.src = URL.createObjectURL(blob);
        }
    });
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#if !isRecording}
<button id="start-btn" bind:this={startBtn} on:click={e => startRecording(mediaRecorder)}>start</button>
{:else}
<button id="stop-btn" bind:this={stopBtn} on:click={e => stopRecording(mediaRecorder)}>stop</button>
{/if}
<audio id="player" bind:this={playerElem} controls></audio>
