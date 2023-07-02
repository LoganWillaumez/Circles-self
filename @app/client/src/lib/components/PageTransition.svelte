<style lang="scss">
</style>

<script lang="ts">
  import { fly } from "svelte/transition";
  import { cubicIn, cubicOut } from 'svelte/easing'

  export let key: any;
</script>

{#key key}
<div class="w-full h-full flex justify-center" in:fly={{x: -200, duration: 300, delay: 300, easing: cubicOut}} out:fly={{x:200, duration: 300, easing: cubicOut}}>
    <slot />
</div>
{/key}