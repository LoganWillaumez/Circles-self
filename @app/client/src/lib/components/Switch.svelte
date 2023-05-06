<script>
  import Fa from 'svelte-fa';
  import {faSun, faCircle, faMoon} from '@fortawesome/free-solid-svg-icons';
  import {setTheme, theme} from '$lib/stores/theme';
  const changeTheme = () => {
    setTheme($theme === 'light' ? 'dark' : 'light');
  };
</script>

<button class="switch switch--{$theme}" on:click={changeTheme}>
  <div class="switch-state">
    <Fa icon={$theme === 'light' ? faSun : faMoon} size="sm" />
  </div>
  <div class="switch-moon">
    <Fa icon={faCircle} size="sm" />
  </div>
</button>

<style lang="scss">
  .switch {
    cursor: pointer;
    border-radius: 83px;
    width: 50px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--fill-reverse);
    color: var(--text-reverse);
    position: fixed;
    top: 20px;
    right: 20px;
    .switch-state {
      position: absolute;
      transition: all 300ms ease-in-out;
      right: 5px;
    }
    .switch-moon {
      position: absolute;
      transition: all 300ms ease-in-out;
      left: 5px;
    }
    &--dark {
      .switch-state {
        transform: translateX(0px);
      }
      .switch-moon {
        transform: translateX(0px);
      }
    }
    &--light {
      .switch-state {
        transform: translateX(-25px);
      }
      .switch-moon {
        transform: translateX(25px);
      }
    }
  }
</style>
