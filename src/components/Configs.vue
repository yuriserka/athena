<template>
  <div>
    <PalavrasChave v-bind:palavras_chave="palavras_chave" @add_p="handleAddPalavra" />
    <Fontes v-bind:fontes="fontes" @add_f="handleAddFonte" />
  </div>
</template>

<script>
import PalavrasChave from "./config/PalavrasChave";
import Fontes from "./config/Fontes";

export default {
  name: "Configs",
  props: ["palavras_chave", "fontes"],
  components: {
    PalavrasChave,
    Fontes
  },
  methods: {
    handleAddFonte(fonte) {
      this.$emit("adicionar_fonte", fonte);
    },
    handleAddPalavra(palavra) {
      this.$emit("adicionar_palavra_chave", palavra);
    }
  }
};
</script>

<style>
</style>