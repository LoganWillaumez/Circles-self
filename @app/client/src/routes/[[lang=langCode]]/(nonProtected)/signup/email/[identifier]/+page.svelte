<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import {theme} from '$lib/stores/theme';
  0;
  import {LL} from '$lib/i18n/i18n-svelte';
  import type {PageData} from './$types';
  import type {TranslationFunctions} from '$lib/i18n/i18n-types';
  export let data: PageData;
  const messageError =
  $LL.serverError[
    data.message as keyof TranslationFunctions['serverError']
  ]() || $LL.serverError.notKnow();
</script>

<div class="container">
  <div class="scroll_wrapper w-full">
    <div class="flex flex-col gap-5 w-screen h-full md:h-fit">
      <img
        class="grow max-w-[200px] md:max-w-[250px] m-auto"
        alt="Error"
        src="/error-{$theme}.svg"
      />
      <h2 class="font-bold text-2xl text-center">
        {$LL.desc.emailLinkNoValid()}.
      </h2>
      <p class="text-center grow md:grow-0">{messageError}</p>
      <Button class="mx-auto" text={$LL.button.signIn()} href="signin" />
    </div>
  </div>
</div>

<style lang="scss">
</style>
