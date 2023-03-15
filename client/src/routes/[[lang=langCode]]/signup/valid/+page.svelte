<style lang="scss">

</style>

<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import Lottie from "$lib/components/Loader/Lottie.svelte";
    import { LL } from '$lib/i18n/i18n-svelte';


</script>

<div class="container">
    <div class="scroll_wrapper">
        <div>
            <Lottie lottieAnim='confetis'> </Lottie>
           <h2 class="font-bold text-2xl mb-5">{$LL.ACCOUNT_VALIDATE()}</h2>
           <p class="mb-10"> {$LL.ACCOUNT_ASK_SIGNIN()}</p>
           <Button class='mx-auto' text="Signin" href="signin"></Button>
        </div>
    </div>
</div>
