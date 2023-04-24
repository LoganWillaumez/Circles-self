<script lang="ts">
  export let text= '';
  export let className: string;
  export {className as class};
</script>

{#if text}
  <div class="flex gap-3 items-center {className}">
    <div class="divider" />
    <p>{text}</p>
    <div class="divider" />
  </div>
{:else}
  <div class="divider {className}" />
{/if}

<style lang="scss">
  .divider {
    width: 100%;
    border: 1px solid var(--fill-reverse);
    height: 1px;
  }
</style>
