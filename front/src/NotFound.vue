<template>
  <div>
    <Header />
    <div class="section">
      <b-message type="is-danger" has-icon>Error 404: Rota não encontrada</b-message>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";

export default {
  name: "NotFound",
  components: {
    Header
  }
};
</script>

<style scoped>
.fonte-gigante {
  font-size: 70px;
}
</style>