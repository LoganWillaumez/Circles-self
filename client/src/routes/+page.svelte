<script>
	import Button from '$lib/components/Button.svelte';
</script>

<div class="container">
    <div class="scroll_wrapper">
        <div>
            <img class="w-full grow max-w-[400px] sm:flex-grow-0" alt="Logo of Circle" src="/Circle_logo.svg" />
            <div class="flex flex-col w-full gap-[15px] items-center">
                <Button text="Sign up" href="signup"/>
                <Button text="Sign in" href="signin"/>
            </div>
        </div>
    </div>
</div>