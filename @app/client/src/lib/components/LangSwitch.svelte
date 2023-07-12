<script lang='ts'>
  import {goto, invalidateAll} from '$app/navigation';
  import {LL} from '$lib/i18n/i18n-svelte';


  const selectLang= async () => {
    const lang = $LL.global.switchLanguage();
    await goto(`?lang=${lang}`);
    invalidateAll();
}
</script>

<button
  class="switch"
  on:click={selectLang}
>
  {$LL.global.switchLanguage()}</button
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
