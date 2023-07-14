<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Input from '$lib/components/Input.svelte';
  import {applyAction, enhance} from '$app/forms';
  import type {ActionData} from './$types';
  import {resetLoader, setLoader} from '$lib/stores/loader';
  import type {ActionResult, SubmitFunction} from '@sveltejs/kit';
  import {goto} from '$app/navigation';
  import {LL} from '$lib/i18n/i18n-svelte';
  import type {TranslationFunctions} from '$lib/i18n/i18n-types';
  import {theme} from '$lib/stores/theme';

  type ActionExtend = ActionResult & {
    data?: Partial<{
      status: number;
      message: string;
    }>;
  };

  export let data;
  export let form: ActionData;

  const messageError =
  $LL.serverError[
    data?.data?.message as keyof TranslationFunctions['serverError']
  ]() || $LL.serverError.notKnow();
  const passwordReset: SubmitFunction = ({form, data, action, cancel}) => {
    return async ({result}: {result: ActionExtend}) => {
      await applyAction(result);
      const status = result.data?.status || result.status;
      const {data} = result;
      if(status === 400 ) return;
        if (status !== 204) {
          form.reset();
          data?.message &&
            setLoader(true, {
              message:
                $LL.serverError[
                  data?.message as keyof TranslationFunctions['serverError']
                ]() || $LL.serverError.notKnow(),
              type: 'error',
              middleButton: $LL.desc.resendEmail(),
              verticalMiddle: true,
              onMiddle: async () =>
                await API.post('auth/sendmail', {email: dataForm.get('email')})
            });
          return;
        } else {
            setLoader(true, {
              message:
              $LL.desc.passwordResetSuccess(),
              type: 'success',
              onClose: () => goto('/signin')
            });
        }
    };
  };

  const errorMessage = $LL.serverError[
                  data?.message as keyof TranslationFunctions['serverError']
                ]() || $LL.serverError.notKnow()
</script>

<div class="container">
  <div class="scroll_wrapper">
    <div class="w-full flex flex-col justify-center items-center h-full">
      <h1 class="mb-5">Reset Password</h1>
      <div class="flex-grow md:flex-grow-0 w-full {!data?.error && 'flex flex-col items-center justify-center'}">
      {#if data?.error}
      <img
        class="grow max-w-[200px] md:max-w-[250px] m-auto"
        alt="Error"
        src="/error-{$theme}.svg"
      />
      {/if}
      {#if data?.error}
        <p class="error-message mt-10">{errorMessage}</p>
        {:else}
      <form method="POST" use:enhance={passwordReset} class="w-full">
        <div class="w-full">
          <Input
            errors={form?.errors?.newPassword ?? ''}
            name="newPassword"
            placeholder={$LL.form.newPassword()}
            type="password"
            value={form?.data?.newPassword ?? ''}
          />
        </div>
        <input type="hidden" name="randomCode" value={data?.randomCode} />
        <div>
          <Input
            errors={form?.errors?.confirmNewPassword ?? ''}
            name="confirmNewPassword"
            placeholder={$LL.form.confirmPassword()}
            type="password"
            value={form?.data?.confirmNewPassword ?? ''}
          />
        </div>
        <Button
          type="submit"
          class="mb-2 mx-auto"
          variant="secondary"
          text={$LL.button.resetPassword()}
        />
      </form>
      {/if}
      <div class="error" />
    </div>
    {#if data?.error}
    <Button
      class="mx-auto"
      text={$LL.button.retry()}
      href="forgot"
    />
    {/if}
  </div>
</div>
</div>

<style lang="scss">
  .error-message {
    margin-bottom: 1em;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 22px;
  }
</style>
