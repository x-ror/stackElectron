<style>
  :global(body) {
    background-color: #fff;
  }
  main {
    position: relative;
    display: grid;
    grid-gap: 0;
    width: 100vw;
    grid-template-areas: 'container container';
    grid-template-columns: 1fr;
  }

  main.isFullScreen {
    grid-template-areas: 'sidebar container';
    grid-template-columns: 230px 1fr;
  }
</style>

<script type="text/javascript">
  const { ipcRenderer } = window.electron;
  import { onMount } from 'svelte';
  import { token, expires } from './store';
  import Sidebar from './components/Sidebar.svelte';
  import Container from './components/Container.svelte';
  import Header from './components/Header.svelte';

  const headerHeight = '50px';

  ipcRenderer.on('stackoverflow:login', (event, params) => {
    ipcRenderer.send('stackoverflow:save-session', params);
    token.update(() => params.token);
    expires.update(() => params.expires);
  });

  window.addEventListener('resize', function() {
    isFullScreen = window.innerWidth > 800;
  });
  $: isFullScreen = window.innerWidth > 800;
</script>

<Header height="{headerHeight}" />
<main class:isFullScreen style="height: calc(100vh - {headerHeight});">
  <Sidebar {isFullScreen} />
  <Container />
</main>
