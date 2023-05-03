<style lang="scss">

</style>

<script lang="ts">
  import { applyAction, enhance } from '$app/forms';
  import { goto, invalidateAll } from '$app/navigation';
  import Button from '$lib/components/Button.svelte';
    import Divider from '$lib/components/Divider.svelte';
  import Input from '$lib/components/Input.svelte';
  import { resetLoader, setLoader } from '$lib/stores/loader';
  import type { ActionResult } from '@sveltejs/kit';
import type {ActionData, SubmitFunction} from './$types';
import {LL} from '$lib/i18n/i18n-svelte';
  import type { Options } from '../../../../../models/input';
  import { setTheme, theme } from '$lib/stores/theme';

const langOptions: Options[] = [
  {
    label: $LL.global.fr(),
    value: 'fr'
  },
  {
    label: $LL.global.en(),
    value: 'en'
  },
];

const themeOption: Options[] = [
  {
    label: $LL.global.fr(),
    value: 'fr'
  },
  {
    label: $LL.global.en(),
    value: 'en'
  },
];

type ActionExtend = ActionResult & {
    data?: Partial<{
      status: number;
      message: string;
    }>;
  };

    export let data;
    export let form: ActionData;
const {user, lang} = data;
const updateProfile: SubmitFunction = async ({form}) =>{
    return async ({result}: {result: ActionExtend}) => {
      await applyAction(result);
      const status = result.data?.status || result.status;
      if (status !== 400) {
        if(status === 200){
          setLoader(true, {message: $LL.desc.updateUserSuccess(), type: 'success'});
          form.currentpassword = '';
          form.newpassword = '';
          form.confirmpassword = '';
          invalidateAll();
      } else if (status === 422) {
        setLoader(true, {message: $LL.desc.passwordSameError(), type: 'error'});
      }
      } else if (result.data.message === 'noChange'){
        setLoader(true, {message: $LL.desc.noChange(), type: 'error'});
    } else if (result.data.message === 'user.invalidCurrent') {
      setLoader(true, {message: $LL.desc.invalidCurrentPassword(), type: 'error'});
    }
  }
}
const selectLang= (e: CustomEvent) => {
  const lang = e.detail.value;
  window.location.href =`?lang=${lang}`;
  invalidateAll();
}

const changeTheme = () => {
    setTheme($theme === 'light' ? 'dark' : 'light');
  };
</script>

<div class="container">
    <div class="scroll_wrapper">
      <form method="POST" use:enhance={updateProfile}>
        <h1 class="mb-5">{$LL.desc.settings()}</h1>
        <Divider text={$LL.desc.global()}/>
          <div class="mt-8 mb-8">
              <Input
              on:selected={selectLang}
              name="lang"
              placeholder={$LL.global.language()}
              type="select"
              options={langOptions}
              value={lang}
            />
        </div>

        <Divider text={$LL.desc.profile()} class="mb-5"/>
        <div class="flex flex-col">

          <div class="mt-8">
            <Input  placeholder={$LL.form.firstName()} name="firstname" value={user.firstname}  errors={form?.errors?.firstname ?? ''}/>
          </div>
          <div class="mt-5">

            <Input  placeholder={$LL.form.lastName()} name="lastname"  value={user.lastname}  errors={form?.errors?.lastname ?? ''}/>
          </div>
          <div class="mt-6">
            <Input  placeholder="Email" name="email" value={user.email}  errors={form?.errors?.email ?? ''}/>
          </div>
          <div class="mt-6">
            <Input  placeholder="Birthdate" name="birthdate" value={user.birthdate}  errors={form?.errors?.birthdate ?? ''}/>
          </div>
          <div class="mt-5">
            <Input  type="password" placeholder={$LL.form.currentPassword()} name="currentpassword"  errors={form?.errors?.currentpassword ?? ''}/>
          </div>
          <div class="mt-5">
            <Input  type="password"placeholder={$LL.form.newPassword()} name="newpassword"  errors={form?.errors?.newpassword?? ''}/>
          </div>
          <div class="mt-5">

            <Input type="password"  placeholder={$LL.form.confirmPassword()} name="confirmpassword"  errors={form?.errors?.confirmpassword ?? ''}/>
          </div>
        </div>
        <div class="flex gap-5 mt-5">
            <Button visual="outline" href="dashboard" text={$LL.global.cancel()} />
            <Button type="submit" text={$LL.global.confirm()}/>
        </div>
    </form>  
    </div>
  </div>