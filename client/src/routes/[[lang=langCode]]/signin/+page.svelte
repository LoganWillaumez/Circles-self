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
	import API from '../../api/Api';

    
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

    const signup: SubmitFunction = ({ form, data: dataForm, action, cancel }) => {
    return async ({result} : {result: ActionExtend}) => {

        await applyAction(result);
        const status = result.data?.status  || result.status;
        const { data } = result; 
        if(status !== 400){
            if(status === 403){
                data?.message && setLoader(true, { message: data.message, type: 'error', middleButton: 'Resend an email', onMiddle: async () =>  await API.post("auth/sendmail", {email: dataForm.get('email')})})
                form.reset();
                return;
            }
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
            <h1 class="mb-5">Signin</h1>
            <form method="POST" use:enhance={signup}>
                <div>
                    <Input 
                    errors={form?.errors?.email ?? ''} 
                    name="email" 
                    placeholder="Email" 
                    value={form?.data?.email ?? ''}
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
                <Button type="submit" class='mb-5 mx-auto' variant="secondary" text="Sign in"/>
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
            <Button class='mb-5 mx-auto' text="Sign up" href='signup'/>
        </div>
       
    </div>
</div>