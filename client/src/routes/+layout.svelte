<script>
// @ts-nocheck

	import Switch from '../lib/components/Switch.svelte';
    import { theme } from '$lib/stores/theme';
    import '$lib/styles/main.scss';
	import Loader from '$lib/components/Loader/Loader.svelte';
	import { browser } from '$app/environment';
	import { loader } from '$lib/stores/loader';
</script>

<style global lang="scss">
       .main-container{
            width: 100%;
            height: 100%;
            position: relative;
            padding: 80px 20px 40px 20px;
            display: flex;
            justify-content: center;
            max-width: 1500px;
            flex-wrap: wrap;
        }
</style>

<svelte:head>
    <meta name="color-scheme" content={$theme}/>
    <link rel="stylesheet" href={`/themes/${$theme}.scss`} />
</svelte:head>

<main class="main-container">
    {#if browser}
        <Loader/>
        <Switch />
        <slot/>
    {/if}
</main>