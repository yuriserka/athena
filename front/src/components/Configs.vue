<template>
  <div class="container">
    <PalavrasChave
      :palavras_chave="palavras_chave"
      @add-p="handleAddPalavra"
      @slct-p="handleSlctPalavra"
    />
    <div class="espaco" />
    <Fontes :fontes="fontes" @add-f="handleAddFonte" @slct-f="handleSlctFonte" />
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
    handleSlctFonte(fontes_selecionadas) {
      this.$emit("selecionar-fonte", fontes_selecionadas);
    },
    handleAddPalavra(palavra) {
      this.$emit("adicionar-palavra-chave", palavra);
    },
    handleSlctPalavra(palavras_selecionadas) {
      this.$emit("selecionar-palavra-chave", palavras_selecionadas);
    }
  }
};
</script>

<style scoped>
.espaco {
  margin-bottom: 50px;
}
</style>