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
            <h3 class="capitalize font-bold text-2xl">{actualCircle.data.name}</h3>
            <div class="w-full h-[150px] relative">
                <img class="cover w-full h-[150px]  rounded-2xl" src="https://picsum.photos/200/300" alt="">
                <img class="cover absolute bottom-[-40px] left-[20px] rounded-full z-10 w-[80px] h-[80px]" src="https://picsum.photos/200/300?random=1" alt="">
                <Fa class='absolute top-[-5px] right-0 bg-[var(--primary-color)] w-[40px] rounded-l-2xl' icon={faEllipsis} size="lg" />
            </div>
        </div>
    </div>
    <!-- <Navbar url={data.url}  currentRoute='chat'/> -->
</div>