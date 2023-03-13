<style lang="scss">

</style>

<script lang="ts">
	import Button from "$lib/components/Button.svelte";
import { theme } from "$lib/stores/theme";



</script>

<div class="container">
    <div class="scroll_wrapper">
        <div class="flex flex-col gap-5">
            <img class="w-[70vw] max-w-[400px] mx-auto" src="/mail-{$theme}.svg" alt="">
            <h2 class="font-bold text-2xl text-center">Email send</h2>
            <p class="text-left grow">Click on the link into the email you receive to begin your journey !</p>
            <Button class='mx-auto' text="Close" href="signin"></Button>
        </div>
    </div>
</div>