<template>
  <div>
    <p class="content">
      <b>Fontes de Notícias:</b>
    </p>
    <b-icon pack="fas" icon="info-circle" size="is-small"></b-icon>Você também pode adicionar uma fonte de notícias temporária.
    <a @click="add">
      <b-icon pack="fas" icon="plus-square" size="is-small" title="Clique para adicionar fonte temporária."></b-icon>      
    </a>
    <a @click="rmv">
      <b-icon pack="fas" icon="minus-square" size="is-small" title="Clique para remover fonte." style="color:red;"></b-icon>      
    </a>

    <div class="block">
      <b-checkbox
        v-for="(fonte, index) in fontes"
        @change.native="select"
        v-model="selecionadas"
        :native-value="fonte"
        :key="index"
      >{{fonte}}</b-checkbox>

      <p class="content">
        <b>fontes selecionadas:</b>
        {{ selecionadas }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Fontes",
  props: ["fontes"],
  data() {
    return {
      selecionadas: []
    };
  },
  methods: {
    add() {
      this.$buefy.dialog.prompt({
        message: `Digite a nova fonte de notícias à ser incluída`,
        inputAttrs: {
          placeholder: "e.g. g1.globo.com/",
          maxlength: 40
        },
        onConfirm: value => this.$emit("add-f", value)
      });
    },
    rmv() {
      // TODO: mostrar tela para remover noticias selecionadas
      return;
    },
    select() {
      this.$emit("slct-f", this.selecionadas);
    }
  }
};
</script>

<style>
</style>