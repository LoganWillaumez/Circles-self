<style lang="scss">

</style>

<script lang="ts">
  import Fa from 'svelte-fa';
  import {faEllipsis, faUserPlus} from '@fortawesome/free-solid-svg-icons';
  import Popup from '$lib/components/Popup.svelte';
  import Input from '$lib/components/Input.svelte';
  import Button from '$lib/components/Button.svelte';
  import {LL} from '$lib/i18n/i18n-svelte';
  import { applyAction, enhance } from '$app/forms';
  import type { ActionData, SubmitFunction } from './$types.js';
  import Divider from '$lib/components/Divider.svelte';
  import { invalidateAll } from '$app/navigation';
  import { setLoader } from '$lib/stores/loader.js';
  import type { ActionResult } from '@sveltejs/kit';
  import type { TranslationFunctions } from 'typesafe-i18n/types/runtime/src/core.mjs';

  type ActionExtend = ActionResult & {
    data?: Partial<{
      status: number;
      message: string;
    }>;
  };

    export let data;
    export let form: ActionData;

    $: actualCircle = data.actualCircle;
    let popupCircleUpdate = false;
    let popupCircleInvite = false;
    let updateName = '';
    let updateDescription = '';
    const handleClick = () => {
        popupCircleUpdate = true;
    }
    const handleInvite = () => {
        popupCircleInvite = true;
    }

    const invitePeople: SubmitFunction = ({form, data, action, cancel}) => {
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
                  data?.message as keyof TranslationFunctions['serverError']
                ]() || $LL.serverError.notKnow(),
              type: 'error',
            });
        };
        
        form.reset();
        popupCircleInvite = false;
        data?.data?.message && setLoader(true, {message: status === 200 ? $LL.desc.successInviteCircle() : $LL.desc.errorInviteCircle(), type: status === 200 ? 'success' : 'error'});
    }
  }

  const updateCircle: SubmitFunction = ({form, data, action, cancel}) => {
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
                  data?.message as keyof TranslationFunctions['serverError']
                ]() || $LL.serverError.notKnow(),
              type: 'error',
            });
        };
        
        form.reset();
        popupCircleUpdate = false;
        data?.data?.message && setLoader(true, {message: $LL.desc.successUpdateCircle(), type:'success'});
        invalidateAll();
    }
  }
</script>

<div class="container">
    <div class="scroll_wrapper">
        <div class="flex flex-col gap-3">
            <h3 class="capitalize font-bold text-2xl">{actualCircle.data.name}</h3>
            <div class="w-full h-[150px] relative">
                <img class="cover w-full h-[150px]  rounded-2xl" src="https://picsum.photos/200/300" alt="">
                <img class="cover absolute bottom-[-40px] left-[20px] rounded-full z-10 w-[80px] h-[80px]" src="https://picsum.photos/200/300?random=1" alt="">
                <button class="cursor-pointer" on:click={handleClick}>
                    <Fa class='absolute top-[-5px] right-0 bg-[var(--primary-color)] w-[40px] rounded-l-2xl' icon={faEllipsis} size="lg" />
                </button>
                <button class="cursor-pointer" on:click={handleInvite}>
                    <Fa class='absolute bottom-[-5px] right-0 bg-[var(--primary-color)] w-[40px] rounded-l-2xl' icon={faUserPlus} size="lg" />
                </button>
            </div>

        {#if popupCircleUpdate}
        <Popup onClickOutside={() => {popupCircleUpdate = false; form.errors = null;}}>
          <p class="text-lg font-semibold mb-5">{$LL.desc.modifyCircle()}</p>
          <form method="POST" use:enhance={updateCircle} class=" flex flex-col gap-5">
            <div class="mb-5">
              <Input 
                name='name' 
                value={updateName ? updateName : actualCircle.data.name}
                placeholder={$LL.form.name()} 
                errors={form?.errors?.name ?? ''} 
              />
            </div>
            <div class="mb-5">
              <Input 
                name='description' 
                value={updateDescription ? updateDescription : actualCircle.data.description} 
                placeholder={$LL.form.description()} 
                errors={form?.errors?.description ?? ''} 
                type='text' 
              />
            </div>
              <div class="flex gap-5 mt-5">
                <Button visual='outline' text={$LL.global.close()} onClick={() => { popupCircleUpdate = false; form.errors=null}} />
                <Button formaction="?/updateCircle" type='submit' text={$LL.global.modify()}/>
              </div>
          </form>
        </Popup>
      {/if}

      {#if popupCircleInvite}
      <Popup onClickOutside={() => {popupCircleInvite = false; form.errors=null;}}>
        <p class="text-lg font-semibold mb-5">{$LL.desc.invitePeople()}</p>
        <form method="POST" use:enhance={invitePeople} class=" flex flex-col gap-5" >
          <div class="mb-5">
          <p class="mb-5">{$LL.desc.inviteEmail()}</p>
            <Input 
              name='invite' 
              value={''}
              placeholder={$LL.form.email()} 
              errors={form?.errors?.invite ?? ''} 
              type='text'
            />
          </div>
            <div class="flex gap-5 mt-5">
              <Button visual='outline' text={$LL.global.close()} onClick={() => { popupCircleInvite = false; form.errors=null;}} />
              <Button type='submit' text={$LL.form.inviteBase()} formaction="?/invitePeople"/>
            </div>
        </form>
      </Popup>
    {/if}
      
        </div>
    </div>
</div>