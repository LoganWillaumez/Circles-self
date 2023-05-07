<style lang="scss">

</style>

<script lang="ts">
  import {faCalendar, faHouse, faMessage, faStar} from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa';
  import Divider from './Divider.svelte';
  export let url: string;



  function extractCircleUrl(url: string): string | null {
  const regex = /(\/circle\/\d+)/;
  const match = url.match(regex);

  if (match) {
    return match[0];
  } else {
    return null;
  }
}


  const basicCircleUrl = extractCircleUrl(url);
</script>

<div class="w-full h-[50px] ]max-h-[50px] bg-[var(--background)] rounded-2xl flex items-center gap-5 px-5 py-2 fixed bottom-5 z-30">   
    <a href="/dashboard">
        <Fa class='bg-[var(--primary-color)]' icon={faHouse} size="lg" />
    </a>
    <Divider vertical={true}/>
    <div class="flex justify-between w-full px-6">
        <a href="{basicCircleUrl}">
            <Fa class='{!url.includes('/calendar')&& !url.includes('/chat') ? 'text-[#EB8423]' : ''}' icon={faHouse} size="lg" />
        </a>
        <a href="{basicCircleUrl}/calendar">
            <Fa class='{url.includes('/calendar') ? 'text-[#EB8423]' : ''}' icon={faCalendar} size="lg" />
        </a>
        <a href="{basicCircleUrl}/chat">
            <Fa class='{url.includes('/chat') ? 'text-[#EB8423]' : ''}' icon={faMessage} size="lg" />
        </a>
    </div>
</div>