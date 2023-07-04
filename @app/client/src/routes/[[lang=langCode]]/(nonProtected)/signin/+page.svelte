<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Divider from '$lib/components/Divider.svelte';
  import Input from '$lib/components/Input.svelte';
  import Card from '$lib/components/Card.svelte';
  import {applyAction, enhance} from '$app/forms';
  import type {ActionData, PageData} from './$types';
  import {resetLoader, setLoader} from '$lib/stores/loader';
  import type {ActionResult, SubmitFunction} from '@sveltejs/kit';
  import {goto} from '$app/navigation';
  import {LL} from '$lib/i18n/i18n-svelte';
  import type {Translation, TranslationFunctions} from '$lib/i18n/i18n-types';
  import type { Options } from '../../../../models/input';
  import API from '$lib/utils/Api';

  type ActionExtend = ActionResult & {
    data?: Partial<{
      initiallogin: boolean;
      status: number;
      message: string;
    }>;
  };

  export let form: ActionData;
  const options: Options[] = [
    {
      label: 'Male',
      value: 'male'
    },
    {
      label: 'Female',
      value: 'female'
    },
    {
      label: 'Other',
      value: 'other'
    }
  ];

  const signin: SubmitFunction = ({form, data: dataForm, action, cancel}) => {
    return async ({result}: {result: ActionExtend}) => {
      await applyAction(result);
      const status = result.data?.status || result.status;
      const {data} = result;
      if (status !== 400) {
        if (status === 403) {
          data?.message &&
            setLoader(true, {
              message:
                $LL.serverError[
                  data?.message as keyof TranslationFunctions['serverError']
                ]() || $LL.serverError.notKnow(),
              type: 'error',
              middleButton: 'Resend an email',
              onMiddle: async () =>
                await API.post('auth/sendmail', {email: dataForm.get('email')})
            });
          form.reset();
          return;
        }
        if (status !== 200) {
          form.reset();
          data?.message &&
            setLoader(true, {
              message:
                $LL.serverError[
                  data?.message as keyof TranslationFunctions['serverError']
                ]() || $LL.serverError.notKnow(),
              type: 'error'
            });
          return;
        } else {
          resetLoader();
          if(data?.initiallogin){
            goto('/dashboard');
          } else {
            goto('/welcome/explain'); //:TODO: Redo for welcome
            // goto('/welcome/explain');
          }
        }
      }
    };
  };

</script>

<div class="container">
  <div class="scroll_wrapper">
    <div class="flex flex-col justify-center h-full">
      <h1 class="mb-5">Signin</h1>
      <form method="POST" use:enhance={signin}>
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
            placeholder={$LL.form.password()}
            type="password"
          />
        </div>
        <Button
          type="submit"
          class="mb-5 mx-auto"
          variant="secondary"
          text={$LL.button.signIn()}
        />
      </form>
      <div class="error  flex-grow" />
      <p class="mb-2">{$LL.form.forgotPassword()}</p>
      <Divider text={$LL.global.or()} class="mb-2" />
      <div class="flex gap-10 justify-center mb-10">
        <Card icon="google" />
        <Card icon="facebook" />
        <Card icon="twitter" />
      </div>
      <Button class="mb-5 mx-auto" text={$LL.button.signUp()} href="signup" />
    </div>
  </div>
</div>

<style lang="scss">
  form {
    display: flex;
    flex-direction: column;
    gap: 22px;
  }
</style>
