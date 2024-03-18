<script lang="ts">
	import { onMount } from 'svelte';
	import { type Writable, writable } from 'svelte/store';
	import { IconPlayerStopFilled, IconPlayerRecordFilled } from '@tabler/icons-svelte';
	import { authStore } from '$lib/store';
	import { PUBLIC_BACKEND_HOSTNAME } from '$env/static/public';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { auth, initFirebaseAuth } from '$lib/firebase';

	const RECORDING_CODEC = 'audio/webm; codec=vorbis';
	//const RECORDING_CODEC = "audio/ogg; codec=vorbis";

	let contentElem: HTMLDivElement;
	let mediaRecorder: Writable<MediaRecorder | undefined> = writable();
	let chunks: Writable<Blob[]> = writable([]);
	let blob: Writable<Blob> = writable();
	let isRecording: Writable<Boolean> = writable();
	let playerElm: HTMLAudioElement;
	let downloadElm: HTMLAnchorElement;
	const backend = new URL(PUBLIC_BACKEND_HOSTNAME);

	const fetchNotebooks = async (): Promise<{ notebook_id: string }[]> => {
		const endpoint = new URL('/api/v1/user/me', PUBLIC_BACKEND_HOSTNAME);
		const resp = await fetch(endpoint, {
			credentials: 'include',
			headers: {
				Authorization: `Bearer ${await auth.currentUser?.getIdToken()}`
			}
		});
		if (resp.ok === false) {
			throw new Error(`/api/v1/user/me request failed ${resp.status}`);
		}
		const body = await resp.json();
		return body['notebooks'] satisfies { notebook_id: string }[];
	};

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

	const uploadRecording = async () => {
		if (typeof $authStore.notebooks === 'undefined') {
			return;
		}
		console.debug('loggedin');
		const uploadEndpoint = new URL(
			`/api/v1/notebook/${$authStore.notebooks[0].notebook_id}/shout/new`,
			backend
		);
		const body = new FormData();
		body.append('shout', $blob);
		const resp = await fetch(uploadEndpoint, {
			credentials: 'include',
			headers: {
				Authorization: `Bearer ${await auth.currentUser?.getIdToken()}`
			},
			body: body,
			method: 'POST'
		});
		if (resp.ok === false) {
			console.error(resp);
		}
		console.log(resp);
	};

	onMount(async () => {
		if (browser) {
			await initFirebaseAuth(auth)
				.then((user) => {
					console.log("loggedin")
					$authStore = { loggedIn: true, user: user, notebooks: undefined };
				})
				.catch((res) => {
					console.error('not loggined:', res);
					goto('/signin');
				});

			if ($authStore.loggedIn && auth.currentUser !== null) {
				authStore.update((auth) => {
					fetchNotebooks()
						.then((notebooks) => (auth.notebooks = notebooks))
						.catch((e: Error) => {
							console.error(e.message);
							goto('/signin');
						});
					return auth;
				});
			}
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
				playerElm.src = URL.createObjectURL($blob);
				/*
			downloadElm.href = URL.createObjectURL($blob);
			downloadElm.download = 'audio.webm';
			downloadElm.innerText = 'download';
			*/
			};
		}
	});
</script>

<div class="flex flex-col place-item-center" id="content" bind:this={contentElem}>
	<button class="btn btn-error btn-circle recorder__btn" on:click={handleRecording}>
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
	<audio bind:this={playerElm} controls></audio>
	{#if $isRecording === false}
		{#if typeof $authStore.notebooks !== 'undefined'}
			<select>
				{#each $authStore.notebooks as note}
					<option value={note['notebook_id']}>{note['notebook_id']}</option>
				{/each}
			</select>
		{/if}
		<button class="btn btn-primary" type="button" on:click={uploadRecording}> 投稿 </button>
	{/if}
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
