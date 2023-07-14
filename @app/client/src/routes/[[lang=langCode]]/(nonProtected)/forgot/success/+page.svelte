<script lang="ts">
    import { fade } from 'svelte/transition';
    import Button from '$lib/components/Button.svelte';
    import Lottie from '$lib/components/Loader/Lottie.svelte';
    import { LL } from '$lib/i18n/i18n-svelte';
  
    let isLoading = true;
    
    const handleComplete = () => {
      isLoading = false;
    };
  </script>
  
  <div class="container">
    <div class="scroll_wrapper">
      <div class="h-full flex flex-col justify-center items-center">
        {#if isLoading}
          <Lottie lottieAnim="forgotSuccess" on:complete={handleComplete} />
        {:else}
          <div transition:fade={{ duration: 1000 }}>
            <h2 class="font-bold text-2xl mb-5">{$LL.desc.passwordResetSuccess()}</h2>
            <p class="mb-10">{$LL.desc.accountAskSignin()}</p>
            <Button class="mx-auto" text={$LL.button.signIn()} href="signin" />
          </div>
        {/if}
      </div>
    </div>
  </div>
  
  <style lang="scss">
  </style>
  