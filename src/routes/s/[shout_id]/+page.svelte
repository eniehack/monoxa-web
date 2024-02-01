<script lang="ts">
	import type { PageData } from './$types';
	import { IconUserFilled, IconScript } from '@tabler/icons-svelte';

	export let data: PageData;
</script>

<div id="content">
	<h1>{data.title}</h1>
	<audio src={data.file} controls></audio>
	<div class="flex items-center">
		<IconUserFilled size={18} />
		<a href={`/@${data.user.id}`}>{data.user.name}</a>
	</div>
	<p id="script">{data.script}</p>
</div>

<style>
	/*
    #content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    } */
	#script {
		height: 500px;
		overflow-y: scroll;
	}
</style>
