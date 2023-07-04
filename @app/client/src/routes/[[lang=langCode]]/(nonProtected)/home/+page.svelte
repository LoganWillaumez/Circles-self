<script>
    import Button from '$lib/components/Button.svelte';
    import {LL} from '$lib/i18n/i18n-svelte';
    
  </script>
  
  <div class="container">
    <div class="scroll_wrapper">
      <div class="h-full flex flex-col items-center justify-center">
        <img
          class="w-full grow max-w-[500px] max-h-[500px] sm:flex-grow-0 inline"
          alt="Logo of Circle"
          src="/Circle_logo.svg"
        />
        <div class="flex flex-col w-full gap-[15px] items-center">
          <Button text={$LL.button.signUp()} href="signup" />
          <Button text={$LL.button.signIn()} href="signin" />
        </div>
      </div>
    </div>
  </div>
  