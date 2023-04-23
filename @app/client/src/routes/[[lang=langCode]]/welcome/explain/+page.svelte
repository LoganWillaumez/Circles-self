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
          src="/welcome-{$theme}.svg"
          alt=""
        />
        <h2 class="font-bold text-2xl text-center">{$LL.desc.welcomeExplainTitle()}</h2>
        <p class="text-left grow">{$LL.desc.welcomeExplain1()}</p>
        <p class="text-left grow">{$LL.desc.welcomeExplain2()}</p>
        <Button class="mx-auto" text={$LL.global.next()} href="welcome/profile" />
      </div>
    </div>
  </div>
  
  <style lang="scss">
  </style>
  