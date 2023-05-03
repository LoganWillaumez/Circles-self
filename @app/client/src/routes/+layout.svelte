<script>
  // @ts-nocheck

  import Switch from '$lib/components/Switch.svelte';
  import LangSwitch from '$lib/components/LangSwitch.svelte';
  import {theme} from '$lib/stores/theme';
  import '$lib/styles/main.scss';
  import Loader from '$lib/components/Loader/Loader.svelte';
  import {browser} from '$app/environment';
  
</script>

<svelte:head>
  <meta name="color-scheme" content={$theme} />
  <link rel="stylesheet" href={`/themes/${$theme}.scss`} />
</svelte:head>

<main class="main-container">
  {#if browser}
    <Loader />
    <Switch />
    <!-- <LangSwitch /> -->
    <slot />
  {/if}
</main>

<style global lang="scss">
  .main-container {
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
