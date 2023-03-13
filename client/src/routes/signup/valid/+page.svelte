<style lang="scss">

</style>

<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import Lottie from "$lib/components/Loader/Lottie.svelte";


</script>

<div class="container">
    <div class="scroll_wrapper">
        <div>
            <Lottie lottieAnim='confetis'> </Lottie>
           <h2 class="font-bold text-2xl mb-5">You account has been successfully activated !!</h2>
           <p class="mb-10"> Now you can signin to your account and start your journey !</p>
           <Button class='mx-auto' text="Signin" href="signin"></Button>
        </div>
    </div>
</div>
