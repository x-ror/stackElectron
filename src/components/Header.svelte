<style>
  header {
    background-color: lightcoral;
    display: grid;
  }
</style>

<script>
  import { token, expires, currentLocation } from '../store';
  export let height;
  function moveToProfile() {
    currentLocation.update(n => '/profile');
  }
</script>

<header style="height: {height};">
  {#if $token !== '' && expires > 0}
    <h1>login</h1>
  {:else}
    <button on:click="{moveToProfile}">Profile</button>
  {/if}
</header>
