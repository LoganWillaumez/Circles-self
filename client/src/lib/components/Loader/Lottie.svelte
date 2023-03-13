<script lang="ts">
    import { onMount } from 'svelte';
    import lottie from 'lottie-web';

    export let lottieAnim: 'loader' | 'confetis' = 'loader';
    onMount(() => {
    const container = document.querySelector('.lottie-container');
    if (container !== null) {
      lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: `/lottie/${lottieAnim}.json`,
      });
    }
  });
</script>
  
<style lang="scss">
  .lottie-container {
    pointer-events: none; 
      position: fixed;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
      width: 400px;
    height: 400px;
    }
</style>

<div class="lottie-container" />