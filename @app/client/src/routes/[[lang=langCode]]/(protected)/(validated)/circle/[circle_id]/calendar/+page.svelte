<style lang="scss">
</style>



<script lang="ts">
  // @ts-nocheck
  import Button from '$lib/components/Button.svelte';
  import Calendar from '@event-calendar/core';
  import TimeGrid from '@event-calendar/time-grid';
  import Popup from "$lib/components/Popup.svelte";
  import Divider from '$lib/components/Divider.svelte';
  import {invalidateAll} from '$app/navigation';
  import { applyAction, enhance } from "$app/forms";
  import { LL } from '$lib/i18n/i18n-svelte';
  import Input from '$lib/components/Input.svelte';
  import { page } from '$app/stores';
  import { setLoader } from '$lib/stores/loader';
  import { slide } from 'svelte/transition';
  import EventCard from '$lib/components/EventCard.svelte';
  import { convertDateToCorrectFormat } from '$lib/utils/date';

  export let data;


  const convertEvents = (events) => {
  return events.map(event => {

    let endDate = !event?.allday ?  new Date(event?.end) : new Date(event?.start);

    if (endDate) {
      endDate.setHours(23);
      endDate.setMinutes(59);
      endDate.setSeconds(59);
    }
    return {
      id: event.id,
      resourceIds: event.id_customer,
      allDay: event.allday,
      start: event.start ? new Date(event.start) : null,
      end: endDate, // make sure to handle null end dates appropriately
      title: event.title,
      titleHTML: event.title, // this value is not provided by the server
      editable: false, // this value is not provided by the server, set default as needed
      startEditable: false, // this value is not provided by the server, set default as needed
      display: 'auto', // this value is not provided by the server, set default as needed
      backgroundColor: '', // this value is not provided by the server, set default as needed
      textColor: '', // this value is not provided by the server, set default as needed
      color: '', // this value is not provided by the server, set default as needed
      extendedProps: {description: event.description}, // you can include any additional fields here
    };
  });
}

  $: actualCircle = data.actualCircle;
  $: calendarEvents = convertEvents(data.actualCircle.data.events);
  
  export let form: ActionData;

  let calendar: Calendar;
  let allDay = false;
  let plugins = [TimeGrid];
  let poPupCreateEvent = false;
  let poPupModifyEvent = false;
  let selectedEvent = null;

  let options = {
    view: 'timeGridWeek',
    events: [],
    eventClick: function (info) {
      poPupModifyEvent = true;
      selectedEvent = actualCircle.data.events.find(event => +event.id === +info.event.id);
    },
    init: function (info) {
    }
};

$: {
  console.log('🚀 ~ calendarEvents:', calendarEvents);
    options.events = calendarEvents && calendarEvents;
}


  const openModifyEventPopup = (event) => {
    selectedEvent = event;
    poPupModifyEvent = true;
  };
  const createEvent: SubmitFunction = ({ form, data, action, cancel }) => {
    return async ({ result }: { result: ActionExtend }) => {
      await applyAction(result);
      await invalidateAll()
      allDay=false;
      const status = result.data?.status || result.status;
      const { data } = result;
      if (status === 400) return;

      form.reset();
      poPupCreateEvent = false;
      data?.data?.message && setLoader(true, { message: status === 201 ? $LL.desc.createEvent() : messageError, type: status === 201 ? 'success' : 'error' });
    }
  };

  const deleteEvent = async (eventId: number) => {
    const { circle_id } = $page.params;

    setLoader(true, {
      message: $LL.desc.deleteEvent(),
      type: 'warning',
      middleButton: $LL.global.confirm(),
      onMiddle: async () => {
        try {
          const res = await fetch(`/api/circle/${circle_id}/event/${eventId}`, {
            method: 'DELETE',
          });
          const response = await res.json();
          
          if (response.status === 200) {
            invalidateAll()
            setLoader(true, { 
              message: $LL.desc.deleteEventSuccess(), 
              type: 'success',
            });
            invalidateAll();
          } else {
            console.error('Failed to delete event:', response.statusText);
          }
        } catch (error) {
          console.error('An error occurred while deleting the event:', error);
        }
      }
    });
  };


  const modifyEvent: SubmitFunction = async ({ form, data, action, cancel }) => {
  return async ({ result }: { result: ActionExtend }) => {
    await applyAction(result);
    await invalidateAll();
    const status = result.data?.status || result.status;
    const { data } = result;
    if (status === 400) return;

    form.reset();
    poPupModifyEvent = false;
    data?.data?.message && setLoader(true, { message: status === 200 ? $LL.desc.modifyEventSuccess() : messageError, type: status === 200 ? 'success' : 'error' });
  }
};
</script>

<div class="container">
  <div class="scroll_wrapper">
    <div class="flex flex-col gap-3">
      <h3 class="capitalize font-bold text-2xl">Calendar of {actualCircle.data.name}</h3>
      {#if poPupCreateEvent || poPupModifyEvent}
        <Popup onClickOutside={() => {poPupCreateEvent = false; poPupModifyEvent = false; selectedEvent=null; allDay = false;}}>
          <p class="text-lg font-semibold mb-5">Create Event</p>
          <form method="POST" use:enhance={poPupModifyEvent  ? modifyEvent :  createEvent} >
            <div class="mb-5">
              <Input 
                name='title' 
                value={selectedEvent ? selectedEvent.title : ''}
                placeholder={$LL.form.eventTitle()} 
                errors={form?.errors?.title ?? ''} 
              />
            </div>
            <div class="mb-5">
              <Input 
                name='description' 
                value={selectedEvent ? selectedEvent.description : ''} 
                placeholder={$LL.form.description()} 
                errors={form?.errors?.description ?? ''} 
                type='textarea' 
              />
            </div>
            <div class="mb-5">
              <Input 
                name='allday' 
                value={selectedEvent ? selectedEvent?.allday : false} 
                placeholder={$LL.form.allDay()} 
                errors={form?.errors?.allday ?? ''} 
                type="checkbox" 
                on:check={(e) => {allDay = e.detail.value; if (selectedEvent && typeof selectedEvent === 'object') selectedEvent.allday = e.detail.value;}}

              />
            </div>
            <div transition:slide={{duration: 300, axis: 'y'}}>
              <div class="mb-5">
                <Input 
                  name='start' 
                  value={selectedEvent ? convertDateToCorrectFormat(selectedEvent?.start) : ''}
                  placeholder={$LL.form.startEvent()} 
                  errors={form?.errors?.start ?? ''} 
                  type="date" 
                />
              </div>
              {#if selectedEvent}
                <input type="hidden" name="id" value={selectedEvent.id} />
              {/if}
              {#if !allDay && !selectedEvent?.allday}
                <div transition:slide={{duration: 300, axis: 'y'}}>
                  <div class="opacity-0">_</div>
                  <div>
                    <Input 
                      name='end' 
                      value={!selectedEvent?.allday && selectedEvent?.end ? convertDateToCorrectFormat(selectedEvent?.end) : ''}
                      placeholder={$LL.form.endEvent()} 
                      errors={form?.errors?.end ?? ''} 
                      type="date" 
                    />
                  </div>
                </div>
              {/if}
              <div class="flex gap-5 mt-5">
                <Button visual='outline' text={$LL.global.close()} onClick={() => { poPupCreateEvent = false; allDay = false; poPupModifyEvent = false; selectedEvent=false; }} />
                <Button type='submit' text={poPupModifyEvent ? $LL.global.modify() :  $LL.global.create()} formaction="{poPupModifyEvent ? '?/modifyEvent' : '?/createEvent'}" />
              </div>
          </form>
        </Popup>
      {/if}
      {#if actualCircle.data.events.length > 0}
        <h3>Your events</h3>
        {#each actualCircle.data.events as event}
          <EventCard event={event} on:delete={() => deleteEvent(event.id)} on:modify={() => openModifyEventPopup(event)}/>
        {/each}
      {:else}
        <p>You don't have any event yet</p>
      {/if}

      <Button class="m-auto" text={$LL.button.newEvent()} onClick={() => poPupCreateEvent = true }/>
      <Divider />
      <div class="w-full h-[600px] overflow-x-scroll pb-[50px]">
        <div class="min-w-[1000px]">
          <Calendar bind:this={calendar} {plugins} {options} />
        </div>
      </div>
    </div>
  </div>
</div>
