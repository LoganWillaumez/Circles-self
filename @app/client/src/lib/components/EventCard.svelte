<style lang="scss">
    .eventCard {
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        display: flex;
        align-items: center;
        padding: 12px 15px 12px 15px;
        border-radius: 5px;
    }
    </style>
    
    <script lang="ts">
      import type { EventData } from "@your-path-to-event-data/interface"; // Replace with your path to the event data interface
      import Fa from 'svelte-fa';
      import {faCalendar} from '@fortawesome/free-solid-svg-icons';
      import { createEventDispatcher, onMount } from "svelte";
  import Button from "./Button.svelte";
      export let event: EventData;
      
      const dispatch = createEventDispatcher();
    
      let eventStartDate = new Date(event.start);
      let eventMonth = eventStartDate.toLocaleDateString('fr-FR', { month: 'short' }).toUpperCase();
      let eventDay = eventStartDate.getDate();
    
    
    </script>
    
    <div class="h-[80px] eventCard bg-[var(--fill)] relative">
        <div class="flex flex-col gap-1 p-3 w-[50px] h-[50px] bg-[var(--blue)] rounded justify-center align-center">
            <span class="text-xs">{eventMonth}</span>
            <span class="text-sm font-bold">{eventDay}</span>
        </div>
        <div class="pl-3 pt-0">
            <h4 class="text-[12px] bold self-start font-bold">{event.title}</h4>
            <p class="text-[10px]">{event.description}</p>
        </div>
        <div class="flex flex-col gap-2 ml-auto">
            <Button small={true} text="Modify" onClick={() => dispatch('modify')}/>
            <Button small={true} text="Delete" error={true} onClick={() => dispatch('delete')}/>
        </div>
    </div>
    