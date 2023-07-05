<style lang="scss">
.message-container{
  align-items: flex-end;
  display: flex;
  gap: 10px;
  &--self{
    align-items: flex-start;
  }
}
</style>

<script lang="ts">
  import { io } from 'socket.io-client'
  import Input from '$lib/components/Input.svelte';
  import { onDestroy, onMount } from 'svelte';
  import { enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';

  let writeMessage = '';
  const socket = io()
  export let data;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  const {user} = data;
  let chatContainer;

  $: actualCircle = data.actualCircle;
  $: allUserConnected = [];
  $: allMessages = actualCircle.data.messages;
  $: systemMessages = [];
  $: combinedMessages = [...systemMessages, ...allMessages];
  $: combinedMessages.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  

  onMount(() => {
  socket.on('eventFromServer', ({type, data}: {type: 'connection' | 'disconnection' | 'writingMessage' | ' message' | 'stopWriting', data: any}) => {
    if(type === 'connection') {
        allUserConnected.concat(data);
        systemMessages = systemMessages.concat({content: `${data.name} has join the chat !`, created_at: new Date().toISOString()})
    } else if (type === 'disconnection') {
      allUserConnected = allUserConnected.filter(user => user.id !== data.id)
    } else if(type === 'writingMessage') {
      if(!allMessages.some(message => message?.id === data?.id && message?.content === 'is writing...') || allMessages.length === 0){
        allMessages = allMessages.concat(data);
      }

    } else if(type === 'stopWriting') {
      allMessages = allMessages.filter(message => message.id !== data.id || message.content !== 'is writing...');
    } else {
        invalidateAll();
  }
  combinedMessages = [...systemMessages, ...allMessages];
  combinedMessages.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  })

  socket.emit('socketClient', {type: 'connection', data: {name: user?.firstname, img: user?.img}})
});

onDestroy(() => {
  socket.emit('socketClient', {type: 'disconnection', data: {id:user?.customer_id, firstname: user?.firstname, img: user?.img}})
})

  const sendMessage = (event: CustomEvent) => {
    if(writeMessage){
      socket.emit('socketClient', {type: 'message', data: {id:user?.customer_id, firstname: user?.firstname, img: user?.img, message: event.detail}})
      chatContainer.scrollTo(0, chatContainer.scrollHeight);
    }
  }


  const writeMessageOnEnter = (event: CustomEvent) => {
    writeMessage = event.detail
  if (writeMessage) {
      socket.emit('socketClient', {type: 'writingMessage', data: {id:user?.customer_id, name: user?.firstname, img: user?.img, content: 'is writing...'}})
  }
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
    timeoutId = setTimeout(() => {
      socket.emit('socketClient', {type: 'stopWriting', data: {id:user?.customer_id, name: user?.firstname, img: user?.img}})
    }, 500);
  }

</script>

<div class="container nav">
    <div class="scroll_wrapper">
        <div class="flex flex-col gap-3 h-full">
            <h3 class="capitalize font-bold text-2xl">{actualCircle.data.name}</h3>
            <div class="bg-[var(--color-chat)] w-full h-full rounded-md flex flex-col items-center px-5 py-5 overflow-hidden">
              <div class="flex flex-col gap-5 w-full overflow-scroll" bind:this={chatContainer}>
                {#each combinedMessages as message}
                <div class="message-container {user.customer_id === message.id ?? 'message-container--self'}">
                  {#if message.id}
                    <img class="h-[30px] w-[30px] rounded-full" alt='profile' src={message.img}>
                  {/if}
                  <p>{`${message.content}`}</p>
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
    <!-- <Navbar url={data.url}  currentRoute='chat'/> -->
</div>