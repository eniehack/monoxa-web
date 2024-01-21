<script lang="ts">
	import type { PageData } from './$types';
    import { IconUser } from "@tabler/icons-svelte";
    import { writable, type Writable } from "svelte/store";
    import Fuse from "fuse.js";
	import { onMount } from 'svelte';
	
	export let data: PageData;
    let query: Writable<string> = writable("");
    let recordings = writable(data.recordings);

    onMount(() => {
        const fuse = new Fuse($recordings, {
            keys: ["title", "script"],
        })
        query.subscribe(val => {
            if (val.length < 1) {
                recordings.set(data.recordings);
                return;
            }
            const res = fuse.search(val);
            console.log(res)
            $recordings = res.map(rec => rec.item);
        });
    });
</script>

<article>
    <input class="form-control" type="text" name="" bind:value={$query} placeholder="入力してスクリプトを検索">
    <ul>
        {#each $recordings as recording (recording.id)}
            <li>
                <a href="/s/{recording.id}">{recording.title}</a>
            </li>
        {/each}
    </ul>
</article>

<style>
    /*
    #content {
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
    }*/
</style>
