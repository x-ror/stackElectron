<script>
  export let isFullScreen;
</script>

<style>
  .sidebar {
    grid-area: sidebar;
    background-color: #fffeee;
    position: absolute;
    left: -300px;
  }
  .sidebar.isFullScreen {
    position: relative;
    left: 0;
  }
</style>

<div class:isFullScreen class="sidebar">header</div>
