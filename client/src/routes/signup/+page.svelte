<style lang="scss">
    .signup{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        justify-content: center;
        align-items: center;
        height: 100%;
        background-color: var(--primary-color);
    }
    form{
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 30px;
    }
</style>


<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Divider from '$lib/components/Divider.svelte';
    import Input from '$lib/components/Input.svelte';
    import Card from '$lib/components/Card.svelte';
    import { enhance } from '$app/forms';
    import type {ActionData} from './$types';
    export let form: ActionData;

</script>

<div class="signup">
    <div class="scroll_wrapper">
        <h1 class="mb-5">Register</h1>
        <form method="POST" use:enhance>
            <div>
                <Input 
                errors={form?.errors?.email ?? ''} 
                name="email" 
                placeholder="Email" 
                value={form?.data?.email ?? ''}
                />
            </div>
            <div class="flex gap-3">
                <div>
                    <Input 
                    errors={form?.errors?.firstname ?? ''} 
                    name="firstname" 
                    placeholder="Firstname" 
                    value={form?.data?.firstname ?? ''}
                    />
                </div>
                <div>
                    <Input  
                    errors={form?.errors?.lastname ?? ''} 
                    name="lastname" 
                    placeholder="Lastname" 
                    value={form?.data?.lastname ?? ''}
                    />
                </div>
            </div>
            <div>
                <Input 
                errors={form?.errors?.gender ?? ''} 
                name="gender" 
                placeholder="Gender"  
                value={form?.data?.gender ?? ''}
                />
            </div>
            <div>
                <Input 
                errors={form?.errors?.password ?? ''} 
                name="password" 
                placeholder="Password" 
                type='password'
                />
            </div>
            <div>
                <Input 
                errors={form?.errors?.confirmPassword ?? ''} 
                name="confirmPassword" 
                placeholder="Confirm Password" 
                type='password'
                />
            </div>
            <div class="mb-5">
                <Input 
                type='date' 
                name="birthdate" 
                placeholder="birthdate"  
                errors={form?.errors?.birthdate ?? ''} 
                value={form?.data?.birthdate ?? ''}
                />
            </div>
            <Button type="submit" class='mb-5' variant="secondary" text="Sign up"/>
        </form>
        <div class="error">

        </div>
        <p class="mb-2">Forgot password</p>
        <Divider text='or' class="mb-2"/>
        <div class="flex gap-10 justify-center mb-10">
            <Card icon="google"/>
            <Card icon="facebook"/>
            <Card icon="twitter"/>
        </div>
        <Button class='mb-5' text="Sign in" href="signin"/>
    </div>
</div>