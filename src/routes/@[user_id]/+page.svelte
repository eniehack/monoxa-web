<script lang="ts">
	import type { PageData } from './$types';
	import { IconUser } from '@tabler/icons-svelte';

	export let data: PageData;
</script>

<article>
	<IconUser size={100} />
	<h1>{data.name}</h1>
	<ul>
		{#each data.recordings as recording (recording.id)}
			<li>
				<a href="/s/{recording.id}">{recording.title}</a>
			</li>
		{/each}
	</ul>
</article>
