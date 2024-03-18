<script lang="ts">
	import { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;
	// TODO: $page.error の型signatureをどうやって持ってくるのか？
	// TODO: page.ts上でfirebase authを取り扱う方法は？
	// TODO: リロードするとfirebase authのデータが失われるのは何故か？調べる
</script>

{#if $page.data.error !== null}
	<p>error: {$page.error.message}</p>
{:else}
	<h1>{data.meta.name}</h1>
	<div>
		{#each data.shouts as shout}
			<article>
				<h2>{shout}</h2>
			</article>
		{/each}
	</div>
{/if}
