<script lang="ts">
	import type { PageData } from './$types';
    import { IconUserFilled, IconScript } from "@tabler/icons-svelte";
	
	export let data: PageData;
</script>

<div id="content">
    <audio src={data.file} controls></audio>
    <h1>{data.title}</h1>
    <div class="flex items-center">
        <IconUserFilled size={18}/>
        <a class="decoration-sky-600 hover:decoration-blue-400" href={`/@${data.user.id}`}>{data.user.name}</a>
    </div>
    <div class="">
        <IconScript size={18} />
        <p>{data.script}</p>
    </div>
</div>

<style>
    #content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>