<style lang="scss">

</style>

<script lang="ts">
  import Menu from "$lib/components/Menu.svelte";
  import Fa from 'svelte-fa';
  import {faBars} from '@fortawesome/free-solid-svg-icons';

  let menuOutside = false
  export let data;
  const {user} = data;

</script>

  <button on:click={() => menuOutside = true}>
    <Fa class='fixed top-[20px] left-[20px] cursor-pointer' icon={faBars} size="lg"/>
  </button>
  {#if menuOutside}
    <Menu onClickOutside={() => menuOutside = false} user={user}/>
  {/if}
  <slot />