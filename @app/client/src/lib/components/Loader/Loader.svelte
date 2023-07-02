<script lang="ts">
  import {loader, resetLoader} from '$lib/stores/loader';
  import Lottie from './Lottie.svelte';
  import Fa from 'svelte-fa';
  import {
    faCircleCheck,
    faWarning,
    faInfoCircle,
    faCircleExclamation
  } from '@fortawesome/free-solid-svg-icons';
  import Button from '../Button.svelte';
  import { LoaderType } from '../../../models/loader';
    import {LL} from '$lib/i18n/i18n-svelte';

  const handleClose = () => {
    const fn = $loader.popUp.onClose;
    if (fn && typeof fn === 'function') {
      fn();
    }
    resetLoader();
  };

  const handleConfirm = () => {
    const fn = $loader.popUp.onConfirm;
    if (fn && typeof fn === 'function') {
      fn();
    }
    resetLoader();
  };

  const handleMiddle = () => {
    const fn = $loader.popUp.onMiddle;
    if (fn && typeof fn === 'function') {
      fn();
    }
    resetLoader();
  };

</script>

{#if $loader.showLoader}
  {#if $loader.popUp.message}
    <div id="overlay" />
    <div class="popup popup--{$loader.popUp.type}">
      <header class="popup_header">
        <Fa
          icon={$loader.popUp.type === LoaderType.ERROR
            ? faCircleExclamation
            : $loader.popUp.type === LoaderType.WARNING
            ? faWarning
            : $loader.popUp.type === LoaderType.SUCCESS
            ? faCircleCheck
            : faInfoCircle}
          size="3x"
        />
      </header>
      <div class="popup_content">
        <span class="popup-message">{$loader.popUp.message}</span>
        <div class="flex gap-2 px-3">
          <div class="button__container">
            <Button visual="outline" onClick={handleClose} text={$LL.global.close()} />
            {#if $loader.popUp.button}
              <Button onClick={handleConfirm} text={$loader.popUp.button} />
            {/if}
          </div>
          {#if $loader.popUp.middleButton}
            <div class="max-w-[90%]">
              <Button onClick={handleMiddle} text={$loader.popUp.middleButton} />
            </div>
          {/if}
        </div>
      </div>
    </div>
  {:else}
    <Lottie />
  {/if}
{/if}

<style lang="scss">
  .loader,
  .popup {
    position: fixed;
    position: absolute;
    top: 50%;
    left: 50%;
    max-height: 350px;
    max-width: 350px;
    transform: translate(-50%, -50%);
    z-index: 99999;
  }
  #overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
  .popup {
    background-color: var(--loader);
    width: 70vw;
    aspect-ratio: 1/1.3;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    .popup_header {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40%;
      color: white;
    }
    &--error {
      .popup_header {
        background-color: #8b0000;
      }
    }
    &--info {
      .popup_header {
        background-color: #87cefa;
      }
    }
    &--warning {
      .popup_header {
        background-color: #ffa500;
      }
    }
    &--success {
      .popup_header {
        background-color: #00ff1e;
      }
    }
    &_content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      flex-grow: 1;
      gap: 20px;
      text-align: center;
      .popup-message {
        display: flex;
        align-items: center;
        flex-grow: 1;
      }
      .button {
        &__container {
          display: flex;
          justify-content: space-between;
          gap: 20px;
        }
      }
    }
  }
</style>
