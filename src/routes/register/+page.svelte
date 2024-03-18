<script lang="ts">
	import { authStore } from '$lib/store';
	import { getAuth } from 'firebase/auth';
	import { PUBLIC_BACKEND_HOSTNAME } from '$env/static/public';
	import { goto } from '$app/navigation';
	import '@material/web/button/filled-button';
	import '@material/web/textfield/filled-text-field';

	const backend = new URL(PUBLIC_BACKEND_HOSTNAME);
	let user_id: string;
	let username: string;

	const submit = async () => {
		if ($authStore.loggedIn === false || getAuth().currentUser === null) {
			console.error('not loggined');
			return;
		}
		const endpoint = new URL('/api/v1/user/new', backend);
		const resp = await fetch(endpoint, {
			//credentials: "include",
			headers: {
				Authorization: `Bearer ${await getAuth().currentUser?.getIdToken()}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				user_id: user_id,
				name: username
			}),
			method: 'POST'
		});
		if (resp.ok === false) {
			console.error(resp);
			return;
		}
		goto('/record');
	};
</script>

<md-filled-text-field label="ユーザid" on:input={(e) => (user_id = e.target.value)} type="text">
</md-filled-text-field>
<md-filled-text-field label="ユーザ名" on:input={(e) => (username = e.target.value)} type="text">
</md-filled-text-field>
<md-filled-button type="button" on:click={submit}>送信</md-filled-button>
<!--<button type="button" >送信</button>-->
