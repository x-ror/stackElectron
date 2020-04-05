<style>
  .container {
    grid-area: container;
    background-color: #eeefff;
  }
</style>

<script>
  import Home from '../routes/Home.svelte';
  import Profile from '../routes/Profile.svelte';
  import { currentLocation } from '../store';
</script>

<div class="container">
  {#if $currentLocation === '/profile'}
    <Profile />
  {:else}
    <Home />
  {/if}
</div>
