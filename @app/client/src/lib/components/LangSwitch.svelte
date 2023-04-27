<script>
  import {invalidateAll} from '$app/navigation';
  import {LL} from '$lib/i18n/i18n-svelte';
</script>

<a
  class="switch"
  on:click={invalidateAll}
  href="?lang={$LL.global.switchLanguage()}"
>
  {$LL.global.switchLanguage()}</a
>

<style lang="scss">
  .switch {
    border-radius: 83px;
    width: 50px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--text);
    position: absolute;
    top: 20px;
    left: 20px;
    cursor: pointer;
    font-weight: 700;
    text-transform: uppercase;
  }
</style>
