<script lang="ts">
    import Button from '$lib/components/Button.svelte';
    import {LL} from '$lib/i18n/i18n-svelte';
    
    import { io } from 'socket.io-client'

  const socket = io()

    socket.on('eventFromServer', (message) => {
      console.log(message)
    })
  </script>
  
  <div class="container">
    <div class="scroll_wrapper">
      <div class="flex flex-col items-center justify-center h-full">
        <div class="w-full grow max-w-[500px] max-h-[500px] sm:flex-grow-0 flex justify-center items-center">
          <img
            class="contain"
            alt="Logo of Circle"
            src="/Circle_logo.svg"
          />
        </div>
        <div class="flex flex-col w-full gap-[15px] items-center">
          <Button text={$LL.button.signUp()} href="signup" />
          <Button text={$LL.button.signIn()} href="signin" />
        </div>
      </div>
    </div>
  </div>
  