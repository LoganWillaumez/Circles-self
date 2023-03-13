<style lang="scss">

</style>

<script lang="ts">
	import Button from "$lib/components/Button.svelte";
    import { theme } from "$lib/stores/theme";
</script>


<div class="container">
    <div class="scroll_wrapper">
        <div class="flex flex-col gap-5">
            <img class="grow w-[250px] m-auto" alt="Error" src="/error-{$theme}.svg" />
            <h2 class="font-bold text-2xl text-center">This link is no longer valid.</h2>
            <p class="text-center">Please reconnect you to your account and re-send an activation email.</p>
            <Button class='mx-auto' text="Signin" href="signin"></Button>
        </div>
    </div>
</div>