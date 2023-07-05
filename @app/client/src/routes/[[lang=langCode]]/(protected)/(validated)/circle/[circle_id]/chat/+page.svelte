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

  let writeMessage = '';
  const socket = io()
  export let data;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  const {actualCircle, user} = data;
  console.log('🚀 ~ user:', user);
  

  const emitMessage = () => {
    socket.emit('eventFromClient', 'Hello from client')
  }

  $: allUserConnected = [];
  $: console.log('alluser', allUserConnected)
  $: allMessages = [{
    id: 1,
    name: 'test',
    img: 'https://picsum.photos/200',
    content: 'test'
  }];
  $: console.log('allMessage', allMessages)

  onMount(() => {
  socket.on('eventFromServer', ({type, data}: {type: 'connection' | 'disconnection' | 'writingMessage' | ' message' | 'stopWriting', data: any}) => {
    if(type === 'connection') {
      if (allUserConnected.some(user => user?.id !== data?.id)) {
        allUserConnected.concat(data)
      }
    } else if (type === 'disconnection') {
      allUserConnected = allUserConnected.filter(user => user.id !== data.id)
    } else if(type === 'writingMessage') {
      if(!allMessages.some(message => message?.id === data?.id && message?.content === 'is writing...') || allMessages.length === 0){
        allMessages.push(data);
        allMessages = allMessages;
      }

    } else if(type === 'stopWriting') {
      allMessages = allMessages.filter(message => message.id !== data.id || message.content !== 'is writing...');
    } else {
      allMessages = allMessages.concat(data)
    }
  })

  socket.emit('socketClient', {type: 'connection', data: {id:user?.customer_id, firstname: user?.firstname, img: user?.img}})
});

onDestroy(() => {
  socket.emit('socketClient', {type: 'disconnection', data: {id:user?.customer_id, firstname: user?.firstname, img: user?.img}})
})

  const sendMessage = (event: CustomEvent) => {
    socket.emit('socketClient', {type: 'message', data: {id:user?.customer_id, firstname: user?.firstname, img: user?.img, message: event.detail}})
    writeMessage = ''
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
    }, 2000);
  }

</script>

<div class="container nav">
    <div class="scroll_wrapper">
        <div class="flex flex-col gap-3 h-full">
            <h3 class="capitalize font-bold text-2xl">{actualCircle.data.name}</h3>
            <div class="bg-[var(--color-chat)] w-full h-full rounded-md flex flex-col items-center px-5 py-5">
              <div class="flex flex-col gap-5 w-full">
                {#each allMessages as message}
                <div class="message-container {user.customer_id === message.id ?? 'message-container--self'}">
                  <img class="h-[30px] w-[30px] rounded-full" alt='profile' src={message.img}>
                  <p class="">{`${message.name} ${message.content}`}</p>
                </div>
                {/each}
              </div>
              <div class="flex-grow"></div>
              <div class="w-[80%]">
                <Input
                name="chat"
                placeholder="Write your message..."
                on:input={writeMessageOnEnter}
                on:sendInput={sendMessage}
                value={writeMessage}
                send
              />
              </div>
            </div>  
        </div>
    </div>
    <!-- <Navbar url={data.url}  currentRoute='chat'/> -->
</div>