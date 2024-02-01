<script lang="ts">
	import { onMount } from 'svelte';
	import { type Writable, writable } from 'svelte/store';
	import { IconPlayerStopFilled, IconPlayerRecordFilled } from '@tabler/icons-svelte';

	const RECORDING_CODEC = 'audio/webm; codec=vorbis';
	//const RECORDING_CODEC = "audio/ogg; codec=vorbis";

	let contentElem: HTMLDivElement;
	let mediaRecorder: Writable<MediaRecorder | undefined> = writable();
	let chunks: Writable<Blob[]> = writable([]);
	let blob: Writable<Blob> = writable();
	let isRecording: Writable<Boolean> = writable();

	const handleRecording = () => {
		if (typeof $mediaRecorder === 'undefined') return;
		if ($isRecording) {
			console.log('にょん');
			$mediaRecorder.stop();
			return;
		}
		console.log('にょんにょん');
		$mediaRecorder.start();
	};

	onMount(async () => {
		if (!navigator.mediaDevices) {
			window.alert('mediadevices is unavailable');
			return;
		}
		if (!MediaRecorder.isTypeSupported(RECORDING_CODEC)) {
			window.alert('unsupported mime type');
			return;
		}
		const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
		$mediaRecorder = new MediaRecorder(stream);
		$mediaRecorder.ondataavailable = (e) => {
			$chunks.push(e.data);
		};
		$mediaRecorder.onstart = () => {
			isRecording.set(true);
		};
		$mediaRecorder.onstop = () => {
			isRecording.set(false);
			$blob = new Blob($chunks, { type: RECORDING_CODEC });
			$chunks = [];
			let player = document.createElement('audio');
			player.src = URL.createObjectURL($blob);
			player.controls = true;
			let download = document.createElement('a');
			download.href = URL.createObjectURL($blob);
			download.download = 'audio.webm';
			download.innerText = 'download';
			contentElem.appendChild(player);
			contentElem.appendChild(download);
		};
	});
</script>

<div class="flex flex-col place-item-center" id="content" bind:this={contentElem}>
	<button class="bg-red-500 text-white recorder__btn" on:click={handleRecording}>
		{#if $isRecording}
			<IconPlayerStopFilled color="gray-100" size={100} />
		{:else}
			<IconPlayerRecordFilled color="gray-100" size={100} />
		{/if}
	</button>
	<p>
		{#if $isRecording}
			クリックして停止
		{:else}
			クリックしてスタート
		{/if}
	</p>
</div>

<style lang="postcss">
	.recorder__btn {
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
