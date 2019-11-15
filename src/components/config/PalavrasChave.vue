<template>
  <div>
    <p class="content">
      <b>Palavras Chaves:</b>
    </p>
    <b-icon pack="fas" icon="info-circle" size="is-small"></b-icon>Você também pode adicionar uma palavra chave temporária.
    <a @click="addPalavraChave">
      <b-icon pack="fas" icon="plus-square" size="is-small"></b-icon>
    </a>
    <div class="block">
      <b-checkbox
        v-for="(palavra, index) in palavras_chave"
        v-model="palavras_chave_selecionadas"
        :native-value="palavra.palavra"
        :key="index"
      >{{palavra.palavra}}</b-checkbox>

      <p class="content">
        <b>palavras-chave selecionadas:</b>
        {{ palavras_chave_selecionadas }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PalavrasChave",
  props: ["palavras_chave"],
  data() {
    return {
      palavras_chave_selecionadas: []
    };
  },
  methods: {
    addPalavraChave() {
      this.$buefy.dialog.prompt({
        message: `Digite a palavra-chave à ser incluída`,
        inputAttrs: {
          placeholder: "e.g. rubéola",
          maxlength: 40
        },
        onConfirm: value => {
          this.$emit("add-p", { palavra: value, sinonimos: [] });
        }
      });
    }
  }
};
</script>

<style>
</style>