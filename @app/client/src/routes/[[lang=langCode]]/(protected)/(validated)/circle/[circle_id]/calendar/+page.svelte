<style lang="scss">

</style>

<script lang="ts">
  import Fa from 'svelte-fa';
  import {faEllipsis} from '@fortawesome/free-solid-svg-icons';
  import Navbar from '$lib/components/Navbar.svelte';

    export let data;
    const {actualCircle} = data;
</script>

<div class="container">
    <div class="scroll_wrapper">
        <div class="flex flex-col gap-3">
            <h3 class="capitalize font-bold text-2xl">Calendar of {actualCircle.data.name}</h3>
            <div class="w-full h-[150px] relative">
                <img class="w-full h-full object-cover rounded-2xl" src={actualCircle.data.cover} alt="circle cover" />
                <div class="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-[#000000] to-transparent rounded-2xl"></div>
            </div>
        </div>
    </div>
</div>