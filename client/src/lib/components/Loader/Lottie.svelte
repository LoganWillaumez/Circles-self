<script lang="ts">
    import { onMount } from 'svelte';
    import lottie from 'lottie-web';
    
    onMount(() => {
    const container = document.querySelector('.loader');
    if (container !== null) {
      lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/lottie/loader.json',
      });
    }
  });
</script>
  
<style lang="scss">
  .loader {
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

<div class="loader" />