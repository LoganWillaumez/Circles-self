<!-- Popup.svelte -->
<style lang="scss">
    /* Votre CSS ici */
  </style>
  
  <script lang="ts">
  import { clickOutside } from "$lib/utils/clickOutside";

  
    export let className: string;
    export { className as class };
    export let onClickOutside: () => void;
  </script>
  
  <div
    class="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center"
  >
    <div
    use:clickOutside
    on:clickOutside={() => onClickOutside()}
      class="bg-white p-5 pt-20 pb-5 max-w-[300px] w-[90%] max-h-400 flex flex-col gap-5 justify-center items-center rounded bg-[var(--primary-color)] shadow-md {className}"
    >
    <slot />
</div>

</div>

  