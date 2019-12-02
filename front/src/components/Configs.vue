<template>
  <div class="container">
    <PalavrasChave
      :palavras_chave="palavras_chave"
      :showList=true
      @add-p="handleAddPalavra"
      @rmv-p="handleRmvPalavra"
      @slct-p="handleSlctPalavra"
    />
    <div class="espaco" />
    <Fontes
      :fontes="fontes"
      :showList=true
      @add-f="handleAddFonte"
      @rmv-f="handleRmvFonte"
      @slct-f="handleSlctFonte"
    />
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
    handleRmvFonte(fontes_selecionadas) {
      this.$emit("remover-fonte", fontes_selecionadas);
    },
    handleSlctFonte(fontes_selecionadas) {
      this.$emit("selecionar-fonte", fontes_selecionadas);
    },
    handleAddPalavra(palavra) {
      this.$emit("adicionar-palavra-chave", palavra);
    },
    handleRmvPalavra(palavras_selecionadas) {
      this.$emit("remover-palavra-chave", palavras_selecionadas);
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
.container {
  padding-left: 10%;
  padding-right: 10%;
}
</style>