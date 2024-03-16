<style lang="scss">
.shadow-right {
  box-shadow: 8px 0 15px -3px var(--shadow-color), 4px 0 6px -2px var(--shadow-color);
}
</style>

<script lang="ts">
  import { clickOutside } from "$lib/utils/clickOutside";
  import { fade, slide } from 'svelte/transition'
  import Divider from "./Divider.svelte";
  export let className: string;
  export { className as class };
  export let onClickOutside: () => void;
  import Fa from 'svelte-fa';
  import { faGear, faRightFromBracket, faTableColumns } from '@fortawesome/free-solid-svg-icons';
  import { enhance } from "$app/forms";
  import { page } from '$app/stores';

  export let isDesktop: boolean;
</script>

<div transition:fade={{ duration: 100 }} class="fixed top-0 left-0 h-full z-50 flex items-center justify-center {isDesktop ? '' : 'bg-gray-900 bg-opacity-50'}">
  <div transition:slide={{ duration: 300, axis: 'x' }} class="h-screen w-[70px] fixed top-0 left-0 bg-[var(--primary-color)] z-10 {className} {isDesktop ? 'shadow-right' : ''}" use:clickOutside on:clickOutside={() => onClickOutside()}>
    <div class="flex flex-col gap-5 items-center h-full py-5">
      <img class="w-[50px] h-[50px] rounded-full" src={$page.data.user.img} alt="Profile"/>
      <div class="w-[80%]">
        <Divider />
      </div>
      <a class="cursor-pointer" href="/dashboard" on:click={() => onClickOutside()}>
        <Fa class="text-[var(--fill-reverse)]" icon={faTableColumns} size="lg" />
      </a>
      <div class="w-[80%] {!$page.data.user.circles.length && 'flex-grow'}">
        <Divider/>
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
          <a class="cursor-pointer" href="/settings">
            <Fa class="text-[var(--fill-reverse)]" icon={faGear} size="lg" />
          </a>
        </button>
        <form method="POST" use:enhance action="/signout">
          <button class="cursor-pointer">
            <Fa class="text-[var(--fill-reverse)]" icon={faRightFromBracket} size="lg" />
          </button>
        </form>
      </div>
    </div>
  </div>
</div>