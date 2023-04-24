<style lang="scss">
.circlesCard{
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>

<script lang="ts">
  import type { CirclesDatas } from "@circles-self/circles/interfaces";
  import Fa from 'svelte-fa';
  import {faStar} from '@fortawesome/free-solid-svg-icons';
  import { onMount } from "svelte";
  export let circle: CirclesDatas;
  let isFavorite = false;

const checkIfFavorite = () => {
    const storedFavorites = localStorage.getItem('circlesFavorites');
    if (storedFavorites) {
        const circlesFavorites = JSON.parse(storedFavorites);
        isFavorite = circlesFavorites.findIndex((favorite: CirclesDatas) => favorite.circle_id === circle.circle_id) !== -1;
    }
}

const handleFavorites = () => {
    const storedFavorites = localStorage.getItem('circlesFavorites');
    const circlesFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];

    const index = circlesFavorites.findIndex((favorite: CirclesDatas) => favorite.circle_id === circle.circle_id);

    if (index !== -1) {
        circlesFavorites.splice(index, 1);
        isFavorite = false;
    } else {
        circlesFavorites.push(circle);
        isFavorite = true;
    }

    localStorage.setItem('circlesFavorites', JSON.stringify(circlesFavorites));
}

onMount(() => {
    checkIfFavorite();
});

</script>

<div class="mx-auto circlesCard w-[95%] h-[200px] flex flex-col rounded-lg overflow-hidden relative">
    <div class="h-[100px] bg-blue-300 overflow-hidden relative">
        <button class='absolute top-3 right-3 cursor-pointer text-lg' on:click={handleFavorites}>
            <Fa class='outline outline-[var(--secondary-color)] outline-[5px] bg-[var(--secondary-color)] rounded-[1px]' icon={faStar} size="sm" style={isFavorite ? 'color: yellow;' : 'color: white;'} />
        </button>
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