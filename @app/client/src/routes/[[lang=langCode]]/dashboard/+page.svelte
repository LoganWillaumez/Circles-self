<style lang="scss">

</style>

<script lang="ts">
  import { onMount } from "svelte";
  import Button from "$lib/components/Button.svelte";
  import Input from "$lib/components/Input.svelte";
  import Popup from "$lib/components/Popup.svelte";
  import CirclesCard from "$lib/components/CirclesCard.svelte";
  import Divider from "$lib/components/Divider.svelte";
  import { LL } from '$lib/i18n/i18n-svelte';
  import { setLoader } from "$lib/stores/loader.js";
  import type { ActionResult, SubmitFunction } from "@sveltejs/kit";
  import type { ActionData } from "./$types.js";
  import type { CustomerDatas } from "@circles-self/circles/interfaces/customer.interfaces.js";
  import type { CirclesDatas } from "@circles-self/circles/interfaces/circle.interfaces.js";

  type ActionExtend = ActionResult & {
    data?: Partial<{
      status: number;
      message: string;
    }>;
  };
  
    export let data;
    export let form: ActionData;
 
    let popUpCreateCircle = false;
    let favouritesCircles: CirclesDatas[] = [];
    let notFavouritesCircles: CirclesDatas[] = [];

    const {user}: {user: CustomerDatas}= data;

    const checkFavourites = () =>{
      const storedFavorites = localStorage.getItem('circlesFavorites');
      if (storedFavorites) {
        const circlesFavorites = JSON.parse(storedFavorites);
        favouritesCircles = user.circles.filter((circle: CirclesDatas) => circlesFavorites.find((favorite: CirclesDatas) => favorite.circle_id === circle.circle_id));
        notFavouritesCircles = user.circles.filter((circle: CirclesDatas) => !favouritesCircles.includes(circle));
      }
    }
    onMount(() => {
      checkFavourites();
    })
    
    const createCircle: SubmitFunction = ({form, data, action, cancel}) => {
  return async ({result}: {result: ActionExtend}) => {
    await applyAction(result);
    const status = result.data?.status || result.status;
    const {data} = result;
    if (status === 400) return;

    form.reset();
    popUpCreateCircle = false;
    data?.message && setLoader(true, {message: data.message, type: status === 201 ? 'success' : 'error'});
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
            <div class="flex flex-col  gap-5">
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
                {#if user.circles[0] !== null}
                  <div class="flex flex-col gap-5">
                    <p class="font-bold">{$LL.desc.favCircle()}</p>
                    {#each favouritesCircles as circle}
                      <CirclesCard circle={circle} on:updateFavorites={checkFavourites}/>
                    {/each}
                  </div> 
                  <Divider/>
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
            </div>
            <div class="flex flex-col gap-5">
              {#each notFavouritesCircles as circle, index}
                <CirclesCard circle={circle} on:updateFavorites={checkFavourites}/>
                {#if index === user.circles.length - 1}
                  <div class="h-[3px]"></div>
                {/if}
              {/each}
              
            </div>
            <Button class='m-auto max-w-[200px]' text={$LL.global.create()} onClick={() => popUpCreateCircle = !popUpCreateCircle}/>
        </div>
    </div>
</div>