<style lang="scss">
.circlesCard{
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>

<script lang="ts">
  import type { CirclesDatas } from "@circles-self/circles/interfaces";
  import Fa from 'svelte-fa';
  import {faStar} from '@fortawesome/free-solid-svg-icons';
  import { createEventDispatcher, onMount } from "svelte";
  export let circle: CirclesDatas;
  let isFavorite = false;
  const dispatch = createEventDispatcher();

const toggleFavorite = () => {
  const storedFavorites = localStorage.getItem('circlesFavorites');
  const circlesFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];

  const favoriteIndex = circlesFavorites.findIndex((favorite: CirclesDatas) => favorite.circle_id === circle.circle_id);
  isFavorite = favoriteIndex !== -1;

  const newFavorites = isFavorite
    ? circlesFavorites.filter((favorite: CirclesDatas) => favorite.circle_id !== circle.circle_id)
    : [...circlesFavorites, circle];

  localStorage.setItem('circlesFavorites', JSON.stringify(newFavorites));
  dispatch('updateFavorites');
}


onMount(() => {
    const storedFavorites = localStorage.getItem('circlesFavorites');
    if (storedFavorites) {
        const circlesFavorites = JSON.parse(storedFavorites);
        isFavorite = circlesFavorites.findIndex((favorite: CirclesDatas) => favorite.circle_id === circle.circle_id) !== -1;
    }
});

</script>

<div class="mx-auto circlesCard w-[95%] h-[200px] flex flex-col rounded-lg overflow-hidden relative">
    <a class="h-[100%] bg-[var(--secondary-color)]  overflow-hidden relative" href="/circle/{circle.circle_id}">
        <div>
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
    </a>
    <button class='absolute top-3 right-3 cursor-pointer text-lg' on:click={toggleFavorite}>
        <Fa class='outline outline-[var(--secondary-color)] outline-[5px] bg-[var(--secondary-color)] rounded-[1px]' icon={faStar} size="sm" style={isFavorite ? 'color: yellow;' : 'color: white;'} />
    </button>
</div>