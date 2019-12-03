<template>
  <div>
    <nav class="navbar is-black">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">ATHENA</a>
      </div>
      <ul class="linha">
        <a class="navbar-item" href="/">busca</a>
        <a class="navbar-item" href="/help">ajuda</a>
        <a class="navbar-item" href="/config">configurações</a>
        <!-- <div id="navMenuColorblack-example" class="navbar-menu">
        <div class="navbar-start">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link" href="/">busca</a>
            <div class="navbar-dropdown">
              <a
                class="navbar-item"
                href="/help"
                onclick="javascript:introJs().start();"
              >ajuda</a>
              <a class="navbar-item" href="/config">configurações</a>
            </div>
          </div>
        </div>-->
      </ul>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field is-grouped">
            <p class="control">
              <a href="https://github.com/yuriserka/athena" target="_blank">
                <i class="fab fa-github"></i>
              </a>
            </p>
          </div>
        </div>
      </div>
      <!-- </div> -->
    </nav>
    <Title />
  </div>
</template>

<script>
import Title from "./Title";

export default {
  name: "Header",
  components: {
    Title
  },
  props: {}
};
</script>

<style scoped>
.linha {
  display: flex;
  flex-direction: row;
}
</style>
