<template>
  <div class="container">
    <PalavrasChave
      v-bind:palavras_chave="palavras_chave"
      @add-p="handleAddPalavra"
      @slct-p="handleSlctPalavra"
    />
    <div class="espaco" />
    <Fontes v-bind:fontes="fontes" @add-f="handleAddFonte" @slct-f="handleSlctFonte" />
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
      this.$emit("adicionar-fonte", fonte);
    },
    handleSlctFonte(fonte) {
      this.$emit("selecionar-fonte", fonte);
    },
    handleAddPalavra(palavra) {
      this.$emit("adicionar-palavra-chave", palavra);
    },
    handleSlctPalavra(palavra) {
      this.$emit("selecionar-palavra-chave", palavra);
    }
  }
};
</script>

<style scoped>
.espaco {
  margin-bottom: 50px;
}
</style>