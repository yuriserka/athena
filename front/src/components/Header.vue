<template>
  <div>
    <nav class="navbar is-black">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">ATHENA</a>
      </div>
      <ul class="linha">
        <a class="navbar-item have-hover" href="/" style="color: white;">Busca</a>
        <a class="navbar-item have-hover" href="/help" style="color: white;">Ajuda</a>
        <a class="navbar-item have-hover" href="/config" style="color: white;">Configurações</a>
      </ul>
      <div class="navbar-end">
        <div class="navbar-item">
          <a href="https://github.com/yuriserka/athena" target="_blank">
            <i class="fab fa-github"></i>
          </a>
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
.have-hover:hover {
  background-color: slateblue;
}
</style>
