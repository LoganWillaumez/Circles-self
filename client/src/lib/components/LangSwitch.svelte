<style lang="scss">
    .switch {
      border-radius: 83px;
      width: 50px;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: var(--fill-reverse);
      color: var(--text-reverse);
      position: absolute;
      top: 20px;
      left: 20px;
      .switch-state{
        position: absolute;
        transition: all 300ms ease-in-out;
        right: 5px;
      }
      .switch-moon{
        position: absolute;
        transition: all 300ms ease-in-out;
        left: 5px;
      }
      &--dark{
        .switch-state{
          transform: translateX(0px);
        }
        .switch-moon{
          transform: translateX(0px);
        }
      }
      &--light{
        .switch-state{
          transform: translateX(-25px);
        }
        .switch-moon{
          transform: translateX(25px);
        }
      }
    }
  </style>
  
  <script>
    import { invalidateAll } from '$app/navigation';
  import { LL } from '$lib/i18n/i18n-svelte';
  </script>
  
  <a class="switch" on:click={invalidateAll} href="/?lang={$LL.SWITCH_LANGUAGE()}"> {$LL.SWITCH_LANGUAGE()}</a>