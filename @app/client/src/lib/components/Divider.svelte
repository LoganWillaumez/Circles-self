<script lang="ts">
  export let text = '';
  export let className: string;
  export let vertical: boolean = false;
  export {className as class};
</script>

{#if text}
  {#if vertical}
    <div class="flex flex-col gap-3 items-center {className}">
      <div class="divider vertical" />
      <p>{text}</p>
      <div class="divider vertical" />
    </div>
  {:else}
    <div class="flex gap-3 items-center {className}">
      <div class="divider" />
      <p>{text}</p>
      <div class="divider" />
    </div>
  {/if}
{:else}
  {#if vertical}
    <div class="divider vertical {className}" />
  {:else}
    <div class="divider {className}" />
  {/if}
{/if}

<style lang="scss">
  .divider {
    border: 1px solid var(--fill-reverse);
  }

  .divider:not(.vertical) {
    width: 100%;
    height: 1px;
  }

  .divider.vertical {
    width: 1px;
    height: 100%;
  }
</style>
