<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import {theme} from '$lib/stores/theme';
  import {LL} from '$lib/i18n/i18n-svelte';
</script>

<div class="container">
  <div class="scroll_wrapper">
    <div class="flex flex-col gap-5">
      <img
        class="w-[70vw] max-w-[400px] mx-auto"
        src="/mail-{$theme}.svg"
        alt=""
      />
      <h2 class="font-bold text-2xl text-center">{$LL.desc.emailSend()}</h2>
      <p class="text-left grow">{$LL.desc.emailLink()}</p>
      <Button class="mx-auto" text={$LL.global.close()} href="signin" />
    </div>
  </div>
</div>

<style lang="scss">
</style>
