<style lang="scss">

</style>

<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import Button from "$lib/components/Button.svelte";
    import Input from "$lib/components/Input.svelte";
  import Popup from "$lib/components/Popup.svelte";
  import {LL} from '$lib/i18n/i18n-svelte';
  import { setLoader, resetLoader } from "$lib/stores/loader.js";
  import type { ActionResult, SubmitFunction } from "@sveltejs/kit";
  import type { ActionData } from "./$types.js";

  type ActionExtend = ActionResult & {
    data?: Partial<{
      status: number;
      message: string;
    }>;
  };
  
    export let data;
    export let form: ActionData;
 
    let popUpCreateCircle = false;

    const {user} = data;

    const createCircle: SubmitFunction = ({form, data, action, cancel}) => {
    return async ({result}: {result: ActionExtend}) => {
      await applyAction(result);
      const status = result.data?.status || result.status;
      const {data} = result;
      console.log('🚀 ~ data:', data);
      if (status !== 400) {
        if (status !== 201) {
          popUpCreateCircle = false;
          form.reset();
          data?.message &&
            setLoader(true, {message: data.message, type: 'error'});
          return;
        } else {
        form.reset();
        if(data?.data?.message){
          popUpCreateCircle = false;
          setLoader(true, {message: data.data.message, type: 'success'});
        }
        }
      }
    };
    };

</script>

<div class="container">
    <div class="scroll_wrapper">
        <div class="flex flex-col gap-5">
            <h3 class="font-bold text-xl">Dashboard</h3>
            <div class='w-full'>
                <Input class='w-full' placeholder={$LL.form.search()} name='searchCircle' required={false} value='' />
            </div>
            <div class="flex flex-col items-center gap-5">
                {#if user.circles[0] === null}
                <div class="flex flex-col gap-5 mt-10">
                    <h4 class="font-bold text-lg">
                        {$LL.desc.noCircle()}
                    </h4>
                    <p>
                        {$LL.desc.noCircleDesc()}
                    </p>
                </div>
                {/if}
                {#if popUpCreateCircle}
                <Popup onClickOutside={() => popUpCreateCircle = false}>
                    <p class="text-lg font-semibold mb-5">Create Circle<p/>
                    <form method="POST" use:enhance={createCircle}><form/>
                    <div>
                        <div class="mb-5">
                        <Input name='img' value = '' placeholder={$LL.button.uploadPicture()}  errors={form?.errors?.img ?? ''}/>
                        </div>
                        <div class="mb-5">
                            <Input name='name' value = '' placeholder={$LL.form.name()}  errors={form?.errors?.name ?? ''}/>
                        </div>
                        <Input name='description' value = '' placeholder={$LL.form.description()}  errors={form?.errors?.description ?? ''}/>
                    </div>
                    <div class="flex gap-5 mt-5">
                        <Button visual='outline' text={$LL.global.close()} onClick={() => popUpCreateCircle = false}/>
                        <Button type='submit' text={$LL.global.create()}/>
                    </div>
                </Popup>
                {/if}
                 <Button class='max-w-[200px]' text={$LL.global.create()} onClick={() => popUpCreateCircle = !popUpCreateCircle}/>
            </div>
            <div class="flex flex-col gap-5">
              {#each user.circles as circle}
                <p>{circle.name}</p>
              {/each}
            </div>
        </div>
    </div>
</div>