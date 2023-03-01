<script lang="ts">
	import {loader, resetLoader } from '$lib/stores/loader';
	import Lottie from './Lottie.svelte';
	import Fa from 'svelte-fa';
  import { faWarning, faInfoCircle, faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
	import Button from '../Button.svelte';
    
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

    loader.subscribe((value) => {
      console.log('value', value);
    });

  </script>
  
  <style lang="scss">
    .loader, .popup {
      position: fixed;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
    }
      #overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        z-index: 1; 
    }
    .popup {
      background-color: var(--loader);
      width: 70vw;
      max-width: 400px;
      aspect-ratio: 1/1.3;
      border-radius: 10px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      .popup_header{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40%;
        color: white;
      }
      &--error {
        .popup_header{
          background-color: #8B0000;
        }
      }
      &--info {
        .popup_header{
          background-color: #87CEFA;
        }
      }
      &--warning {
        .popup_header{
          background-color: #FFA500;
        }
      }
      &_content{
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
        .button{
          &__container{
             display: flex;;
             justify-content: space-between;
             gap: 20px;
           }
        }
      }
    }
    
    
  </style>
  
  {#if $loader.showLoader}
  {#if $loader.popUp.message}
  <div id="overlay"></div>
  <div class="popup popup--{$loader.popUp.type}">
      <header class="popup_header">
        <Fa icon={$loader.popUp.type === 'error' ? faCircleExclamation : $loader.popUp.type === 'warning' ?  faWarning : faInfoCircle} size="3x" />
      </header>
      <div class="popup_content">
        <span class="popup-message">{$loader.popUp.message}</span>
        <div class="button__container">
          <Button visual="outline" onClick={handleClose} text="Close"></Button>
          {#if $loader.popUp.button}
            <Button on:click={handleConfirm}>{$loader.popUp.button}</Button>
          {/if}
        </div>
      </div>
      </div>
      {:else}
      <Lottie></Lottie>
    {/if}
  {/if}
  