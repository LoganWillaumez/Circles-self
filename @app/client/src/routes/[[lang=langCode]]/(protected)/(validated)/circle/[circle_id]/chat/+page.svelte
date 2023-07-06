<style lang="scss">
.message-container{
  align-self: flex-end;
  align-items: center;
  display: flex;
  gap: 10px;
  &--self{
    align-self: flex-start;
  }
  &.message-join {
    align-self: center;
  }
}
</style>

<script lang="ts">
  import { io } from 'socket.io-client'
  import Input from '$lib/components/Input.svelte';
  import { afterUpdate, onDestroy, onMount } from 'svelte';
  import { enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import { fade } from 'svelte/transition';

  let writeMessage = '';
  const socket = io()
  export let data;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  const {user} = data;
  let chatContainer;

  let actualCircle = data.actualCircle;
  // $: actualCircle = data.actualCircle;
  $: allMessages = data.actualCircle.data.messages;
  let allUserConnected: any = [];
  let systemMessages: any = [];
  $: combinedMessages = [...systemMessages, ...allMessages];
  $: combinedMessages.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  

  onMount(() => {
  socket.on('eventFromServer', ({type, data}: {type: 'connection' | 'disconnection' | 'writingMessage' | ' message' | 'stopWriting', data: any}) => {
    if(type === 'connection') {
        allUserConnected =  allUserConnected.concat(data);
        systemMessages = systemMessages.concat({customer_id: user?.customer_id, content: `${data.name} has join the chat !`, created_at: new Date().toISOString(), join: true})
    } else if (type === 'disconnection') {
      systemMessages = systemMessages.concat({customer_id: user?.customer_id, content: `${data.name} has left the chat !`, created_at: new Date().toISOString(), join: true})
      allUserConnected = allUserConnected.filter(user => user.customer_id !== data.customer_id)
    } else if(type === 'writingMessage') {
      if(!allMessages.some(message => message?.customer_id === data?.customer_id && message?.content === 'is writing...') || allMessages.length === 0){
        allMessages = allMessages.concat(data);
      }

    } else if(type === 'stopWriting') {
      allMessages = allMessages.filter(message => message.customer_id !== data.customer_id || message.content !== 'is writing...');
    } else {
        invalidateAll();
  }
  combinedMessages = [...systemMessages, ...allMessages];
  combinedMessages.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  })

  socket.emit('socketClient', {type: 'connection', data: {customer_id: user?.customer_id, name: user?.firstname, join: true, img: user?.img}})
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
});

onDestroy(() => {
  socket.emit('socketClient', {type: 'disconnection', data: {customer_id:user?.customer_id, firstname: user?.firstname}})
})

afterUpdate(() => {
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
});
const sendMessage = (event: CustomEvent) => {
  if(writeMessage){
    clearTimeout(timeoutId);
    socket.emit('socketClient', {type: 'stopWriting', data: {customer_id:user?.customer_id, name: user?.firstname}})
    setTimeout(() => {
        socket.emit('socketClient', {type: 'message', data: {customer_id:user?.customer_id, name: user?.firstname, content: event.detail}})
    }, 300);
    }
  }


  const writeMessageOnEnter = (event: CustomEvent) => {
    writeMessage = event.detail
  if (writeMessage) {
      socket.emit('socketClient', {type: 'writingMessage', data: {customer_id:user?.customer_id, name: user?.firstname, img: user?.img, content: 'is writing...', writing: true}})
  }
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
    timeoutId = setTimeout(() => {
      socket.emit('socketClient', {type: 'stopWriting', data: {customer_id:user?.customer_id, name: user?.firstname, img: user?.img}})
    }, 1000);
  }
  
</script>

<div class="container nav">
    <div class="scroll_wrapper">
        <div class="flex flex-col gap-3 h-full">
            <h3 class="capitalize font-bold text-2xl">{actualCircle.data.name}</h3>
            <div class="bg-[var(--color-chat)] w-full h-full rounded-md flex flex-col items-center px-5 py-5 overflow-hidden relative">
              <div class="absolute top-5 right-5 w-[250px] h-[50px]">
                {#each allUserConnected as user, index}
                  <div class="h-[30px] w-[30px] absolute top-1/2  right-0 transform -translate-y-1/2 translate-x-{index * 10}px">
                    <img class="h-[30px] w-[30px] rounded-full" alt='profile' src={user.img}>
                    <div class="h-[10px] w-[10px] rounded-full absolute bg-green-500 top-5 left-5"></div>
                </div>
                {/each}
              </div>
              <div class="flex flex-col gap-5 w-full overflow-scroll" bind:this={chatContainer}>
                {#each combinedMessages as message}
                <div transition:fade={{ duration: 300 }}>
                  <div class="message-container"  class:message-container--self={user.customer_id === message.customer_id}
                  class:message-join={!message.customer_id && !message.writing}>
                    {#if message.customer_id && allUserConnected.length > 0}
                      <img class="h-[30px] w-[30px] rounded-full" alt='profile' src={allUserConnected.find(user => user.customer_id === message.customer_id).img}>
                    {/if}
                    <div class="flex flex-col items-start justify-center">
                      <p>{`${message?.name ? message.name + ': ' : ''} ${message.content}`}</p>
                      {#if message.created_at}
                      <p class="text-sm text-gray-500">
                        {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      {/if}
                    </div>
                  </div>
                </div>
                {/each}
              </div>
              <div class="flex-grow"></div>
              <div class="w-[80%] pt-[20px]">
                <form method="POST" use:enhance>
                  <Input
                  name="chat"
                  placeholder="Write your message..."
                  on:input={writeMessageOnEnter}
                  on:sendInput={sendMessage}
                  value={writeMessage}
                  send
                />
                </form>
              </div>
            </div>  
        </div>
    </div>
</div>