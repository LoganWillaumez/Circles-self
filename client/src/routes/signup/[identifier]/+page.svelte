<style lang="scss">

</style>

<script lang="ts">
	import Button from "$lib/components/Button.svelte";
    import { theme } from "$lib/stores/theme";
</script>


<div class="flex flex-col justify-center h-full gap-3">
    <img class="grow w-[250px] m-auto" alt="Error" src="/error-{$theme}.svg" />
    <h2 class="font-bold text-2xl mb-5 text-center">This link is no longer valid.</h2>
    <p class="text-center mb-4">Please reconnect you to your account and re-send an activation email.</p>
    <Button text="Signin" href="signin"></Button>
</div>