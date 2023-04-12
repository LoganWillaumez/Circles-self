<script lang="ts">
  export let className: string;
  export let icon: 'facebook' | 'google' | 'twitter';
  import google from '$lib/images/social/google.svg';
  import facebook from '$lib/images/social/facebook.svg';
  import twitter from '$lib/images/social/twitter.svg';
  export {className as class};
</script>

<div class="card {className}">
  <img
    src={icon === 'google' ? google : icon === 'facebook' ? facebook : twitter}
    alt="icon of {icon}"
  />
</div>

<style lang="scss">
  .card {
    width: 50px;
    padding: 10px;
    border-radius: 15px;
    background-color: var(--fill);
  }
</style>
