<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Lottie from '$lib/components/Loader/Lottie.svelte';
  import {LL} from '$lib/i18n/i18n-svelte';
</script>

<div class="container">
  <div class="scroll_wrapper">
    <div>
      <Lottie lottieAnim="confetis" />
      <h2 class="font-bold text-2xl mb-5">{$LL.desc.accountValidate()}</h2>
      <p class="mb-10">{$LL.desc.accountAskSignin()}</p>
      <Button class="mx-auto" text="Signin" href="signin" />
    </div>
  </div>
</div>

<style lang="scss">
</style>
