<script lang="ts">
  export let text = 'Button';
  export let visual: 'fill' | 'outline' = 'fill';
  export let type: 'submit' | 'button' | 'reset' = 'button';
  export let variant: 'principal' | 'secondary' = 'principal';
  export let href = '';
  export let formaction: string = '';
  export let className: string = '';
  export let onClick: () => void = () => {};
  export {className as class};
</script>

{#if href}
  <a
    class="btn {visual} {className}"
    class:secondary={variant === 'secondary'}
    href="/{href}">{text}</a
  >
{:else}
  <button
    {formaction}
    {type}
    class="btn {visual} {className}"
    class:secondary={variant === 'secondary'}
    on:click={onClick}
  >
    {text}
  </button>
{/if}

<style lang="scss">
  .btn {
    display: block;
    border-radius: 50px;
    padding: 13px 30px;
    text-align: center;
    width: 100%;
    color: white;
    font-weight: 700;
    transition: background 200ms ease-in;
    position: relative;
    cursor: pointer;
    &.fill {
      background: var(--gradient);
      &:hover {
        background: var(--gradient-hover);
      }
    }
    &.outline {
      background: transparent;
      outline-style: none;
      border: 1px solid #4b5ee4;
      color: var(--text);
    }
    &.secondary {
      background: var(--fill);
      color: var(--text);
      &:hover {
        background: var(--fill-hover);
      }
    }
  }
</style>
