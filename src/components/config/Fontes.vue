<template>
  <section>
    <p class="content">
      <b>Fontes de Notícias:</b>
    </p>
    <b-icon pack="fas" icon="info-circle" size="is-small"></b-icon>Você também pode adicionar uma fonte de notícias temporária.
    <a @click="addFonteNoticia">
      <b-icon pack="fas" icon="plus-square" size="is-small"></b-icon>
    </a>
    <div class="block">
      <b-checkbox
        v-for="(fonte,index) in fontes"
        v-model="fontes_selecionadas"
        :native-value="fonte"
        :key="index"
      >{{fonte}}</b-checkbox>

      <p class="content">
        <b>fontes selecionadas:</b>
        {{ fontes_selecionadas }}
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: "Fontes",
  props: ["fontes"],
  data() {
    return {
      fontes_selecionadas: []
    };
  },
  methods: {
    addFonteNoticia() {
      this.$buefy.dialog.prompt({
        message: `Digite a nova fonte de notícias à ser incluída`,
        inputAttrs: {
          placeholder: "e.g. g1.globo.com/",
          maxlength: 40
        },
        onConfirm: value => this.$emit("add_f", value)
      });
    }
  }
};
</script>

<style>
</style>