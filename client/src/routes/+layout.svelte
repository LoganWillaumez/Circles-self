<script>
	import Switch from '../components/Switch.svelte';
    import { theme } from '$lib/stores/theme';
    import '$lib/styles/main.scss';
</script>

<style global lang="scss">
    .main-container{
        width: 100vw;
        height: 100vh;
        position: relative;
        padding: 40px 20px 40px 20px;
    }
</style>

<svelte:head>
    <meta name="color-scheme" content={$theme}/>
    <link rel="stylesheet" href={`/themes/${$theme}.scss`} />
</svelte:head>

<main class="main-container">
    <Switch />
    <slot/>
</main>