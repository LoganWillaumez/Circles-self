<style lang="scss">

    form{
        display: flex;
        flex-direction: column;
        gap: 22px;
    }
</style>


<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Divider from '$lib/components/Divider.svelte';
    import Input from '$lib/components/Input.svelte';
    import Card from '$lib/components/Card.svelte';
    import { applyAction, enhance } from '$app/forms';
    import type {ActionData} from './$types';
	import type { Options } from '../../models/input';
	import {resetLoader, setLoader} from '$lib/stores/loader';
	import type { ActionResult, SubmitFunction } from '@sveltejs/kit';
	import { goto } from '$app/navigation';

    
    type ActionExtend = ActionResult & {
        data?: Partial<{
            status: number,
            message: string
        }>
    }

    export let form: ActionData;
    const options: Options[] = [
        {
            label: "Male",
            value: "male",
        },
        {
            label: "Female",
            value: "female",
        },
        {
            label: "Other",
            value: "other",
        }
    ];

    const signup: SubmitFunction = ({ form, data, action, cancel }) => {
    return async ({result} : {result: ActionExtend}) => {

        await applyAction(result);
        const status = result.data?.status  || result.status;
        const { data } = result; 
        if(status !== 400){
            if(status !== (201) ){
                form.reset();
               data?.message &&  setLoader(true, { message: data.message, type: 'error' })
                return;
            } else {
                resetLoader();
                goto('/email-send')
            }
        }
    }
  }
</script>

<div class="container">
    <div class="scroll_wrapper">
        <div>
            <h1 class="mb-5">Register</h1>
            <form method="POST" use:enhance={signup}>
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
                    type='select'
                    options={options}
                    value={form?.data?.gender ?? ''}
                    />
                </div>
                <div>
                    <Input 
                    value={form?.data?.password ?? ''}
                    errors={form?.errors?.password ?? ''} 
                    name="password" 
                    placeholder="Password" 
                    type='password'
                    />
                </div>
                <div>
                    <Input 
                    errors={form?.errors?.confirmPassword ?? ''} 
                    value={form?.data?.confirmPassword ?? ''}
                    name="confirmPassword" 
                    placeholder="Confirm Password" 
                    type='password'
                    />
                </div>
                <div>
                    <Input 
                    type='date' 
                    name="birthdate" 
                    placeholder="birthdate"  
                    errors={form?.errors?.birthdate ?? ''} 
                    value={form?.data?.birthdate ?? ''}
                    />
                </div>
                <Button type="submit" class='mb-5 mx-auto' variant="secondary" text="Sign up"/>
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
            <Button class='mb-5 mx-auto' text="Sign in" href='/signin'/>
        </div>
       
    </div>
</div>