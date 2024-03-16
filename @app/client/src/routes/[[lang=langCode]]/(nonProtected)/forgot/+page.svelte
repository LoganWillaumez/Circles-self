<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Input from '$lib/components/Input.svelte';
  import {LL} from '$lib/i18n/i18n-svelte';
  import { applyAction, enhance } from "$app/forms";
  import type {ActionResult} from '@sveltejs/kit';
  import type { ActionData, SubmitFunction } from './$types';
  import { setLoader } from '$lib/stores/loader';
  import type { Translation } from '$lib/i18n/i18n-types';


  type ActionExtend = ActionResult & {
    data?: Partial<{
      initiallogin: boolean;
      status: number;
      message: string;
    }>;
  };

  export let form: ActionData;
  
  const forgorPassword: SubmitFunction= async ({form, data: dataForm, action, cancel}) => {
    return async ({result}: {result: ActionExtend}) => {
    await applyAction(result);
    const status = result.data?.status || result.status;
    const {data} = result;
    if (status === 400) return;
    if (status !== 200) {
      data?.message &&
        setLoader(true, {
          message:
            $LL.serverError[
              data?.message as keyof Translation['serverError']
            ]() || $LL.serverError.notKnow(),
          type: 'error',
        });
        return;
    }
    form.reset();
    setLoader(true, {message: $LL.desc.successForgotPassword(), type: 'success'});
    };
  }
  </script>
  
  <div class="container">
    <div class="scroll_wrapper">
      <div class="flex flex-col items-center justify-center h-full">
        <form class="flex flex-col gap-4" method="POST" use:enhance={forgorPassword}>
          <h2 class="text-3xl font-bold mb-10">{$LL.desc.forgotPasswordTitle()}</h2>
          <p>{$LL.desc.forgotPasswordDesc()}</p>
          <div class="flex flex-col justify-center items-center gap-3">
            <div class="w-full">
              <Input name="email" type="email" placeholder="Email" errors={form?.errors?.email ?? ''}/>
            </div>
            <Button type="submit" text="{$LL.button.send()}"></Button>
          </div>
        </form>
      </div>
    </div>
  </div>
  