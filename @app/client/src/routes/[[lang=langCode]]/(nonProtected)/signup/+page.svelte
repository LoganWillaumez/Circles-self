<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Divider from '$lib/components/Divider.svelte';
  import Input from '$lib/components/Input.svelte';
  import Card from '$lib/components/Card.svelte';
  import {applyAction, enhance} from '$app/forms';
  import type {ActionData} from './$types';
  import {resetLoader, setLoader} from '$lib/stores/loader';
  import type {ActionResult, SubmitFunction} from '@sveltejs/kit';
  import {goto} from '$app/navigation';
  import {LL} from '$lib/i18n/i18n-svelte';
  import type { Options } from '../../../../models/input';

  type ActionExtend = ActionResult & {
    data?: Partial<{
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

  const signup: SubmitFunction = ({form, data, action, cancel}) => {
    return async ({result}: {result: ActionExtend}) => {
      await applyAction(result);
      const status = result.data?.status || result.status;
      const {data} = result;
      if (status !== 400) {
        if (status !== 201) {
          const messageError =
                  $LL.serverError[
                    data?.message as keyof TranslationFunctions['serverError']
                  ]() || $LL.serverError.notKnow();
          form.reset();
          data?.message &&
            setLoader(true, {message: messageError, type: 'error'});
          return;
        } else {
          resetLoader();
          goto('signup/email');
        }
      }
    };
  };
</script>

<div class="container">
  <div class="scroll_wrapper">
    <div>
      <h1 class="mb-5">Register</h1>
      <form method="POST" action="?/signUp" use:enhance={signup} class="flex flex-col gap-[22px]">
        <div>
          <Input
            errors={form?.errors?.email ?? ''}
            name="email"
            placeholder="Email"
            value={form?.data?.email ?? ''}
          />
        </div>
        <div class="flex gap-3">
          <Input
            errors={form?.errors?.firstname ?? ''}
            name="firstname"
            placeholder={$LL.form.firstName()}
            value={form?.data?.firstname ?? ''}
          />
          <Input
            errors={form?.errors?.lastname ?? ''}
            name="lastname"
            placeholder={$LL.form.lastName()}
            value={form?.data?.lastname ?? ''}
          />
        </div>
        <div>
          <Input
            errors={form?.errors?.gender ?? ''}
            name="gender"
            placeholder={$LL.form.gender()}
            type="select"
            {options}
            value={form?.data?.gender ?? ''}
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
        <div>
          <Input
            errors={form?.errors?.confirmPassword ?? ''}
            value={form?.data?.confirmPassword ?? ''}
            name="confirmPassword"
            placeholder={$LL.form.confirmPassword()}
            type="password"
          />
        </div>
        <div>
          <Input
            type="date"
            name="birthdate"
            placeholder={$LL.form.birthdate()}
            errors={form?.errors?.birthdate ?? ''}
            value={form?.data?.birthdate ?? ''}
          />
        </div>
        <Button
          type="submit"
          class="mb-5 mx-auto"
          variant="secondary"
          text={$LL.button.signUp()}
        />
      </form>
      <div class="error" />
      <p class="mb-2">{$LL.form.forgotPassword()}</p>
      <Divider text={$LL.global.or()} class="mb-2" />
      <form class="flex gap-10 justify-center mb-10 flex-row" action="?/OAuth2">
        <button>
          <Card icon="google" />
        </button>
        <Card icon="facebook" />
        <Card icon="twitter" />
      </form>
      <Button class="mb-5 mx-auto" text={$LL.button.signIn()} href="signin" />
    </div>
  </div>
</div>

