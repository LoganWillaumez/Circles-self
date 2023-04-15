<script lang="ts">
    import Button from '$lib/components/Button.svelte';
    import {theme} from '$lib/stores/theme';
    import {LL} from '$lib/i18n/i18n-svelte';
    import Lottie from '$lib/components/Loader/Lottie.svelte';
  import { goto } from '$app/navigation';
  

  const finaliseAccount= () => {
    goto('/dashboard');
  }
</script>
  
  <div class="container">
      <div class="scroll_wrapper">
        <div class="relative min-w-[400px] min-h-[400px] m-0">
            <Lottie lottieAnim="validation" loop={false}/>
        </div>
        <div class="flex flex-col gap-5">
            <h2 class="font-bold text-2xl text-center">{$LL.global.perfect()}</h2>
            <p class="text-left grow">{$LL.desc.welcomeDoneDesc()}</p>
            <Button class="mx-auto" onClick={() => finaliseAccount()} text={$LL.global.start()} />
      </div>
    </div>
  </div>
  
  <style lang="scss">
  </style>
  