<script lang="ts">
 import { onMount, createEventDispatcher } from 'svelte';
import lottie from 'lottie-web';
import type { AnimationItem, AnimationEvents, AnimationEventCallback } from 'lottie-web';

export let lottieAnim: 'loader' | 'confetis' | 'validation' | 'forgotSuccess' = 'loader';
export let loop = true;

const dispatch = createEventDispatcher();

let anim: AnimationItem | null = null;

onMount(() => {
    const container = document.querySelector('.lottie-container');

    if (container !== null) {
      anim = lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: loop,
        autoplay: true,
        path: `/lottie/${lottieAnim}.json`
      });

      // Listen to the 'complete' event.
      const listener: AnimationEventCallback<AnimationEvents['complete']> = (event) => {
        dispatch('complete', event);
      };
      anim.addEventListener('complete', listener);
    }

    return () => {
      if (anim) {
        anim.destroy();
        anim = null;
      }
    };
  });
</script>

<div class="lottie-container" />
