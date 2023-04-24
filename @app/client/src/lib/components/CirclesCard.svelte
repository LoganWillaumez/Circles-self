<style lang="scss">
.circlesCard{
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>

<script lang="ts">
  import type { CirclesDatas } from "@circles-self/circles/interfaces";

    export let circle: CirclesDatas;
</script>

<div class="mx-auto circlesCard w-[95%] h-[200px] flex flex-col rounded-lg overflow-hidden relative">
    <div class="h-[100px] bg-blue-300 overflow-hidden">
        <img class="object-cover w-full h-[100px]" src="https://picsum.photos/200/300" alt="">
    </div>
    <div class='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full h-[80px] w-[80px] overflow-hidden outline outline-[var(--secondary-color)] outline-8'>
        <img class="object-cover" src="https://picsum.photos/200/300" alt="">
    </div>
    <div class="flex-1 bg-[var(--secondary-color)] flex justify-between pt-5 pb-2 px-2 text-left">
        <div>
            <h3 class="font-bold text-sm">{circle.name}</h3>
            <p class="text-[10px] max-w-[150px]">{circle.description}</p>
        </div>
    </div>
</div>