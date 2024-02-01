<script lang="ts">
	import { initializeApp, type FirebaseOptions, getApps } from 'firebase/app';
	import { env } from '$env/dynamic/public';
	import {
		getAuth,
		GoogleAuthProvider,
		signInWithPopup
	} from 'firebase/auth';
	import { authStore } from '$lib/store';
	import { goto } from '$app/navigation';

	const firebaseConfig: FirebaseOptions = {
		apiKey: env.PUBLIC_FIREBASE_API_KEY,
		authDomain: env.PUBLIC_FIREBASE_AUTHDOMAIN,
		projectId: env.PUBLIC_FIREBASE_PROJECTID,
		storageBucket: env.PUBLIC_FIREBASE_STORAGEBUCKET,
		messagingSenderId: env.PUBLIC_FIREBASE_MESSAGINGSENDERID,
		appId: env.PUBLIC_FIREBASE_APPID
	};

	let app;
	if (!getApps().length) {
		app = initializeApp(firebaseConfig);
	}
	const auth = getAuth(app);
	const handleGoogleLogin = async () => {
		signInWithPopup(auth, new GoogleAuthProvider())
			.then((res) => {
				if (res === null) {
					throw new Error('res is null');
				}
				authStore.set({ loggedIn: true, user: res.user });
				goto('/record');
			})
			.catch((e) => {
				console.error(e);
			});
	};
</script>

<div>
	<button type="button" on:click={handleGoogleLogin}> Sign In with Google </button>
</div>
