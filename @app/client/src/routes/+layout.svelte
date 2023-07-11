<script>
  // @ts-nocheck

  import {theme} from '$lib/stores/theme';
  import '$lib/styles/main.scss';
  import Loader from '$lib/components/Loader/Loader.svelte';
  import {browser} from '$app/environment';
  import LangSwitch from '$lib/components/LangSwitch.svelte';
  import PageTransition from '$lib/components/PageTransition.svelte';
  import Switch from '$lib/components/Switch.svelte';
  import Menu from '$lib/components/Menu.svelte';
  import { page } from '$app/stores';
  import Fa from 'svelte-fa';
  import {faBars} from '@fortawesome/free-solid-svg-icons';
  import Navbar from '$lib/components/Navbar.svelte';
  import { onMount, onDestroy } from 'svelte';
  export let data;
  let menuOutside = false;
  let isDesktop;
  let resizeHandler;

  if (browser) {
    onMount(() => {
      resizeHandler = () => {
        isDesktop = window.innerWidth > 650;
      };
      window.addEventListener('resize', resizeHandler);
      resizeHandler(); // Initial check
    });

    onDestroy(() => {
      window.removeEventListener('resize', resizeHandler);
    });
  }
</script>

<svelte:head>
  <meta name="color-scheme" content={$theme} />
  <link rel="stylesheet" href={`/themes/${$theme}.scss`} />
</svelte:head>

<main class="main-container relative">
  {#if browser}
  {#if !data.route.includes('(validated)')}
    <LangSwitch />
  {/if}
  {#if data.route.includes('(validated)')}
  <button on:click={() => menuOutside = true}>
    <Fa class='fixed top-[20px] left-[20px] cursor-pointer' icon={faBars} size="lg"/>
  </button>
  {#if menuOutside || isDesktop}
    <Menu onClickOutside={() => menuOutside = false} user={$page.data.user} isDesktop={isDesktop}/>
  {/if}
  {/if}
  <Loader />
  <Switch />
  {#if data.route.includes('circle')}
    <Navbar url={data.url}/>
  {/if}
  <PageTransition key={data.url}>
    <slot />
  </PageTransition>
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
