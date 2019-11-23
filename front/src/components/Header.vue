<template>
  <div>
    <nav class="navbar is-black">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">ATHENA</a>
      </div>
      <div id="navMenuColorblack-example" class="navbar-menu">
        <div class="navbar-start">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link" href="/">busca</a>
            <div class="navbar-dropdown">
              <a
                class="navbar-item"
                href="javascript:void(0);"
                onclick="javascript:introJs().start();"
              >tutorial</a>
              <a class="navbar-item" href="/configuracoes">configurações</a>
            </div>
          </div>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control">
                <a href="https://github.com/yuriserka/athena">
                  <i class="fab fa-github"></i>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
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
</style>
