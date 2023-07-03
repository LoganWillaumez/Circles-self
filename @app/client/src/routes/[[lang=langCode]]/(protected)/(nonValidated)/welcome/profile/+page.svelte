<script lang="ts">
    import Button from '$lib/components/Button.svelte';
    import {theme} from '$lib/stores/theme';
    import {LL} from '$lib/i18n/i18n-svelte';
  import Divider from '$lib/components/Divider.svelte';
  import { goto, invalidateAll } from '$app/navigation';
  import { onDestroy } from 'svelte';
  import { setLoader } from '$lib/stores/loader';

  let profilePicture = '';

  let videoSource: HTMLVideoElement | null = null;
  let capture: boolean = false;
  let stream: MediaStream | null = null;



  const takePicture = async (): Promise<void> => {
  capture = true;
  videoSource = document.querySelector('video');  
  try {
    stream = await navigator.mediaDevices.getUserMedia({
        video: true,
    });
    if (videoSource) {
        console.log('videoSource is available');
        videoSource.srcObject = stream;
        videoSource.onloadedmetadata = () => {
            console.log('Playing video...');
            videoSource.play();
        }
    } else {
        console.log('videoSource is null');
    }
  } catch (error) {
    console.log('Error taking picture: ', error);
  }
};
const cancelCamera = (): void => {
  profilePicture = '';
  capture = false;
  if (stream) {
    let tracks = stream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
  }
};

onDestroy(cancelCamera);



    const captureImage = (): void => {
        const canvas = document.createElement('canvas');
        if (videoSource) {
            canvas.width = videoSource.videoWidth;
            canvas.height = videoSource.videoHeight;
            let ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(videoSource, 0, 0);
            }
            profilePicture = canvas.toDataURL('image/png');
            console.log('🚀 ~ profilePicture:', profilePicture);
            capture = false;
            if (videoSource.srcObject) {
                let trackList: MediaStreamTrack[] = (videoSource.srcObject as MediaStream).getTracks();
                trackList.forEach((track: MediaStreamTrack) => track.stop());
            }
        }
    };

    const setImage = async () => {

    setLoader(true, {
      message: $LL.desc.askImage(),
      type: 'warning',
      middleButton: $LL.global.confirm(),
      onMiddle: async () => {
        try {
          const res = await fetch(`/api/customer`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
              },      
              body: JSON.stringify({
                img: profilePicture
              })
          });
          const response = await res;
          console.log('🚀 ~ response:', response);
          
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
          console.log('🚀 ~ error:', error);
          console.error('An error occurred while deleting the event:', error);
        }
      }
    });
  };
  </script>
  
  <div class="container">
    <div class="scroll_wrapper">
      <div class="flex flex-col gap-5 h-full">
        {#if !profilePicture && !capture}
        <img
          class="w-[70vw] max-w-[400px] mx-auto"
          src="/profile-{$theme}.svg"
          alt=""
        />
        <h2 class="font-bold text-2xl text-center">{$LL.desc.welcomeProfileTitle()}</h2>
        <p class="text-left grow">{$LL.desc.welcomeProfileExplain()}</p>
        <div class="flex flex-col gap-3 profile-choice">
            <Button class="mx-auto" text={$LL.desc.takePicture()} onClick={takePicture} />
            <Divider text={$LL.global.or()} />
            <Button isInputFile class="mx-auto" text={$LL.desc.uploadPicture()} on:input={event=> profilePicture = event.detail}/>
        </div>
        {/if}
        {#if capture}
        <div class="mx-auto w-72 h-72 relative rounded-full overflow-hidden">
          <video class="absolute top-0 left-0 w-full h-full object-cover" bind:this={videoSource} autoplay playsinline></video>
        </div>
        <div class="flex gap-5 grow">
          <Button error class="mx-auto mt-4" text={$LL.global.cancel()} onClick={cancelCamera} /> 
          <Button class="mx-auto mt-4" text={$LL.button.captureImage()} onClick={captureImage} />
        </div>
        
        
        {/if}
        {#if profilePicture}
        <div class="mx-auto w-[300px] h-[300px] flex items-center justify-center overflow-hidden rounded-full">
          <img class="w-[300px] h-[300px] max-w-full max-h-full object-cover" src={profilePicture} alt="" />
        </div>
        <div class="flex gap-5 grow">
          <Button error class="mx-auto" text={$LL.button.refuse()} onClick={()=> profilePicture = ''}/>
          <Button valid class="mx-auto grow" text={$LL.button.validate()} onClick={setImage}/>
        </div>
        {/if}
            <p class="text-right profile-skip" on:click={() => goto('done')}>{$LL.global.skip()}</p>
      </div>
    </div>
  </div>
  
  <style lang="scss">
    .profile-skip{
        cursor: pointer;
    }
  </style>
  