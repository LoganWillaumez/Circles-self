<script lang="ts">
  import { toBase64 } from "$lib/utils/images";
  import { createEventDispatcher } from "svelte";

  export let text = 'Button';
  export let visual: 'fill' | 'outline' = 'fill';
  export let type: 'submit' | 'button' | 'reset'  = 'button';
  export let variant: 'principal' | 'secondary' = 'principal';
  export let href = '';
  export let error = false;
  export let valid = false;
  export let small = false;
  export let formaction: string = '';
  export let className: string = '';
  export let isInputFile = false;
  export let onClick: () => void = () => {};

  let inputElement: HTMLInputElement;
  export {className as class};


  const dispatch = createEventDispatcher()
  
  const handleFileInput = async (event: Event) => {
    let target = event.target as HTMLInputElement;
    if(target.files) {
      const file = target.files[0];
      const base64 = await toBase64(file);
      dispatch('input', base64);
    }
  };
</script>

{#if href}
  <a
    class="btn {visual} {className} {small ? 'small' : ''} {error ? 'error' : ''} {valid ? 'valid': ''}"
    class:secondary={variant === 'secondary'}
    href="/{href}">{text}</a
  >
{/if}
{#if !isInputFile && !href}
  <button
    {formaction}
    {type}
    class="btn {visual} {className} {small ? 'small' : ''} {error ? 'error' : ''} {valid ? 'valid': ''}"
    class:secondary={variant === 'secondary'}
    on:click={onClick}
  >
    {text}
  </button>
{/if}

{#if isInputFile && !href}
<div class="btn {visual} {className} {small ? 'small' : ''} {error ? 'error' : ''}"
     class:secondary={variant === 'secondary'}
     on:click|stopPropagation={() => isInputFile && inputElement.click()}
     on:keydown|stopPropagation={(event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (isInputFile) {
          inputElement.click();
        }
      }
    }}>
  {text}
    <input bind:this={inputElement}
           class="hidden"
           id="fileInput"
           type="file"
           accept=".jpeg,.jpg,.png"
           on:change={handleFileInput} />
          </div>
  {/if}

<style lang="scss">
  .btn {
    display: block;
    border-radius: 50px;
    padding: 13px 30px;
    text-align: center;
    max-height: 50px;
    width: 100%;
    max-width: 250px;
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
    &.error {
    background: var(--gradient-error);
      }
    &.valid {
    background: var(--gradient-validate);
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
    &.small {
      padding: 5px 20px;
      font-size: 12px;
    }
  }
</style>
