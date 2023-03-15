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
            <img class="grow w-[250px] m-auto" alt="Error" src="/error-{$theme}.svg" />
            <h2 class="font-bold text-2xl text-center">{$LL.EMAIL_LINK_NO_VALID()}.</h2>
            <p class="text-center">{$LL.EMAIL_ASK_RESEND()}</p>
            <Button class='mx-auto' text="{$LL.SIGNIN()}" href="signin"></Button>
        </div>
    </div>
</div>