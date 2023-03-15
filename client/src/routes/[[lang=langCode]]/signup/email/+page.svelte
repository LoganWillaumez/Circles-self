<style lang="scss">

</style>

<script lang="ts">
	import Button from "$lib/components/Button.svelte";
    import { theme } from "$lib/stores/theme";
    import { LL } from '$lib/i18n/i18n-svelte';



</script>

<div class="container">
    <div class="scroll_wrapper">
        <div class="flex flex-col gap-5">
            <img class="w-[70vw] max-w-[400px] mx-auto" src="/mail-{$theme}.svg" alt="">
            <h2 class="font-bold text-2xl text-center">{$LL.EMAIL_SEND()}</h2>
            <p class="text-left grow">{$LL.EMAIL_LINK()}</p>
            <Button class='mx-auto' text="{$LL.CLOSE()}" href="signin"></Button>
        </div>
    </div>
</div>