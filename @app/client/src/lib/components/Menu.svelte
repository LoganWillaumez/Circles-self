<style lang="scss">

</style>

<script lang="ts">
    import { clickOutside } from "$lib/utils/clickOutside";
    import {fade, fly, scale, slide} from 'svelte/transition'
  import Divider from "./Divider.svelte";
  import type { CustomerDatas } from "@circles-self/circles/interfaces";
    export let className: string;
    export let user: CustomerDatas;
    export { className as class };
    export let onClickOutside: () => void;
    import Fa from 'svelte-fa';
    import {faHouse, faGear, faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
  import { enhance } from "$app/forms";
  import { page } from '$app/stores';
</script>

<div transition:fade={{
        duration: 100
      }} class="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
    <div transition:slide={{
        duration: 300,
        axis: 'x'
      }} 
      class="h-screen w-[70px] fixed top-0 left-0 bg-[var(--primary-color)] z-10 {className}"  use:clickOutside
    on:clickOutside={() => onClickOutside()}>
    <div class="flex flex-col gap-5 items-center h-full py-5">
        <img class="w-[50px] h-[50px] rounded-full m-auto" src={$page.data.user.img} alt="Profile"/>
        <div class="w-[80%]">
            <Divider />
        </div>
        <a href="/dashboard" on:click={() => onClickOutside()}>
          <Fa class="text-[var(--fill-reverse)]" icon={faHouse} size="lg" />
        </a>
        <div class="w-[80%]">
          <Divider />
        </div>
        {#if $page.data.user.circles.length > 0}
        <div class="flex flex-col gap-3 overflow-scroll grow">
          {#each $page.data.user.circles as circle, index}
            <a class="w-[50px] h-[50px] rounded-full overflow-hidden cursor-pointer" href="/circle/{circle.circle_id}" on:click={() => onClickOutside()}>
              <img class="object-cover w-[50px] h-[50px]" src='https://picsum.photos/200/300' alt="Circles {circle.name}">
            </a>
          {/each}
        </div>
        {/if}
        <Divider />
        <div class="flex flex-col gap-5">
          <button on:click={() => onClickOutside()}>
            <a href="/settings">
              <Fa class="text-[var(--fill-reverse)]" icon={faGear} size="lg" />
            </a>
          </button>
          <form method="POST" use:enhance action="/signout">
            <button>
              <Fa class="text-[var(--fill-reverse)]" icon={faRightFromBracket} size="lg" />
            </button>
          </form>
        </div>
    </div>
    </div>
</div>













