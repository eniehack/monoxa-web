<script lang="ts">
	import {
		getAuth,
		GoogleAuthProvider,
		signInWithPopup,
		setPersistence,
		browserLocalPersistence
	} from 'firebase/auth';
	import { authStore } from '$lib/store';
	import { goto } from '$app/navigation';
	import { PUBLIC_BACKEND_HOSTNAME } from '$env/static/public';
	import { auth } from '$lib/firebase';

	const checkExists = async (): Promise<boolean> => {
		const endpoint = new URL('/api/v1/user/me', PUBLIC_BACKEND_HOSTNAME);
		const resp = await fetch(endpoint, {
			credentials: 'include',
			headers: {
				Authorization: `Bearer ${await getAuth().currentUser?.getIdToken()}`
			}
		});
		if (resp.status === 404) {
			return false;
		} else if (resp.ok === false) {
			throw new Error(`/api/v1/user/me request failed ${resp.status}`);
		}
		return true;
	};
	const handleGoogleLogin = async () => {
		await setPersistence(auth, browserLocalPersistence);
		signInWithPopup(auth, new GoogleAuthProvider())
			.then((res) => {
				if (res === null) {
					throw new Error('res is null');
				}
				authStore.set({ loggedIn: true, user: res.user, notebooks: undefined });
			})
			.then(async () => {
				if (!(await checkExists())) {
					goto('/register');
				} else {
					goto('/record');
				}
			})
			.catch((e) => {
				console.error(e);
			});
	};
</script>

<div>
	<button type="button" on:click={handleGoogleLogin}> Sign In with Google </button>
</div>
