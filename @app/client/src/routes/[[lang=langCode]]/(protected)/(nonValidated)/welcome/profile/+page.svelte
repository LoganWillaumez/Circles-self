<script lang="ts">
    import Button from '$lib/components/Button.svelte';
    import {theme} from '$lib/stores/theme';
    import {LL} from '$lib/i18n/i18n-svelte';
  import Divider from '$lib/components/Divider.svelte';
  import { goto } from '$app/navigation';
  </script>
  
  <div class="container">
    <div class="scroll_wrapper">
      <div class="flex flex-col gap-5">
        <img
          class="w-[70vw] max-w-[400px] mx-auto"
          src="/profile-{$theme}.svg"
          alt=""
        />
        <h2 class="font-bold text-2xl text-center">{$LL.desc.welcomeProfileTitle()}</h2>
        <p class="text-left grow">{$LL.desc.welcomeProfileExplain()}</p>
        <div class="flex flex-col gap-3 profile-choice">
            <Button class="mx-auto" text={$LL.desc.takePicture()} href="welcome/profile" />
            <Divider text={$LL.global.or()} />
            <Button class="mx-auto" text={$LL.desc.uploadPicture()} href="welcome/profile" />
        </div>
            <p class="text-right profile-skip" on:click={() => goto('done')}>{$LL.global.skip()}</p>
      </div>
    </div>
  </div>
  
  <style lang="scss">
    .profile-skip{
        cursor: pointer;
    }
  </style>
  