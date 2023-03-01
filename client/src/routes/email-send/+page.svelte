<style lang="scss">

</style>

<script lang="ts">
	import Button from "$lib/components/Button.svelte";
import { theme } from "$lib/stores/theme";



</script>

<div class="flex flex-col justify-center h-full">
    <img class="w-[70vw] max-w-[400px] mx-auto mb-5" src="/mail-{$theme}.svg" alt="">
    <h2 class="font-bold text-2xl text-left mb-5">Email send</h2>
    <p class="text-left grow">Click on the link into the email you receive to begin your journey !</p>
    <Button text="Close" href="signin"></Button>
</div>