<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type {Options} from '../../models/input';
  import Fa from 'svelte-fa';
  import {LL} from '$lib/i18n/i18n-svelte';
  import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';
  import type { Translation} from '$lib/i18n/i18n-types';
  export let placeholder: string;
  export let name: string;
  export let required = false;
  export let type = 'text';
  export let width = '100%';
  export let className: string;
  export let value: any = '';
  export let selectDefault = '';
  export let options: Options[] = [];
  export let errors: Translation[] = [];
  export let send = false; 
  export {className as class};

  const dispatch = createEventDispatcher()

  const typeAction = (node: any) => {
    node.type = type;
  };

  const handleInput = (event: Event) => {
    let target = event.target as HTMLInputElement;
    dispatch('input', target.value);
  };

  const handleSendInput = () => {
    dispatch('sendInput', value);
  };

  let translatedErrors: string[] = [];

  $: {
    $LL.global.switchLanguage();
    if (errors && typeof errors === 'object' && errors.length > 0) {
      translatedErrors = errors.map(error => getMessageError(error));
    } else {
      translatedErrors = [];
    }
    console.log('🚀 ~ translatedErrors:', translatedErrors);
  }
  
  const getMessageError = (string: Translation) => {
  if (typeof string === 'string' && string in $LL.errorInput) {
    return $LL.errorInput[string as keyof Translation['errorInput']]() || $LL.errorInput.notKnow();
  }
  return $LL.errorInput.notKnow();
}

const handleCheckboxClick = (event: MouseEvent): void => {
  const isChecked = (event.target as HTMLInputElement).checked;
  dispatch('check', isChecked);
};

const handleSelectChange = (event: Event): void => {
  const selectedValue = (event.target as HTMLSelectElement).value;
  dispatch('selected', selectedValue);
};

</script>

<div class="relative">
  {#if send}
    <div class="send-icon-container">
      <button class="send-icon" on:click={handleSendInput}>
        <Fa class="text-[var(--fill-reverse)]" icon={faPaperPlane} size="lg" />
      </button>
    </div>
  {/if}
  {#if type === 'checkbox'}
    <div class="{className} flex gap-3 items-center pl-[10px]" class:error={errors}>
      <input class="w-4 h-4" bind:checked={value} id={'input-' + name} {name} use:typeAction type="checkbox" on:click={handleCheckboxClick} {required} on:input={handleInput} />
      <p class="text-lg">{placeholder}</p>
    </div>
  {:else if type === 'date'}
    <div class="input-container {className}" class:error={errors} style="width: {width};">
      <input bind:value={value} id={'input-' + name} {name} use:typeAction {required} placeholder={placeholder} on:input={handleInput} />
      <label for={'input-' + name}>{placeholder}</label>
    </div>
  {:else if type === 'textarea'}
    <div class="{className} input-container input-area rounded-[5px]" class:error={errors} style="width: {width};">
      <textarea class="!h-[150px]" bind:value={value} id={'input-' + name} {name} rows="10" {required} placeholder=" "></textarea>
      <label class="label-textarea" for={'input-' + name}>{placeholder}</label>
    </div>
  {:else if type !== 'select'}
    <div class="input-container {className}" class:error={errors} style="width: {width};">
      <input bind:value={value} id={'input-' + name} {name} use:typeAction {required} placeholder=" " on:input={handleInput} />
      <label for={'input-' + name}>{placeholder}</label>
    </div>
  {:else}
    <div class="input-container {className}" class:error={errors} style="width: {width};">
      <select bind:value={value} {name} id={'input-' + name} on:change={handleSelectChange}>
        <option value="" disabled selected hidden>{selectDefault}</option>
        {#each options as option}
          {#if typeof option === 'object' && 'value' in option && option.value}
            <option value={option.value}>{option.label}</option>
          {/if}
        {/each}
      </select>
      <label for={'input-' + name}>{placeholder}</label>
    </div>
  {/if}
  {#if errors}
    <div class="flex flex-col gap-0">
      {#each translatedErrors as error}
        <span class="text-red-400 block">{error}</span>
      {/each}
    </div>
  {/if}
</div>


<style lang="scss">
  .input {
    &-container {
      position: relative;
      margin: 0px;
      width: 100%;
      border-radius: 40px; 
      &.error {
        border: 1px solid red;
      }
      input,
      textarea,
      select {
        background: var(--fill);
        width: 100%;
        height: auto;
        height: 50px;
        border-radius: 40px;
        padding-left: 10px;
        padding-right: 10px;
        &:focus ~ label {
          font-size: 0.8rem;
          font-weight: 700;
          top: -20%;
        }
        &:not(:placeholder-shown) ~ label {
          top: -20%;
          font-size: 0.8rem;
          // text-transform: capitalize;
          font-weight: 700;
        }
        &:hover {
          background-color: var(--fill-hover);
        }
      }
      textarea{
        border-radius: 5px !important; 
        padding: 10px;
        &:not(:placeholder-shown) ~ label {
          top: -10px;
        }
      }
      select {
        cursor: pointer;
      }
      label {
        position: absolute;
        top: 50%;
        left: 10px;
        padding: 4px;
        transform: translate(0, -50%);
        transition: top 200ms ease-in, left 200ms ease-in,
          font-size 200ms ease-in;
        font-size: 1rem;
        cursor: text;
      }
      textarea{
        &:focus ~ label {
          top: -10px;
        }
      }
      .label-textarea{
        top: 30px;
      }
    }
  }
  .input-area{
    border-radius: 5px;
    height: 150px;
  }
  .send-icon-container{
    position: absolute;
    right: 20px;
    z-index: 999;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
