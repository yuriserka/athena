<template>
  <div id="app">
    <Header />
    <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="false"></b-loading>
    <SubHeader />
    <Configs
      v-bind:palavras_chave="palavras_chave"
      v-bind:fontes="fontes"
      @adicionar_palavra_chave="handleAddPalavra"
      @adicionar_fonte="handleAddFonte"
    />
    <NewsList />
  </div>
</template>

<script>
import Header from "./components/Header";
import SubHeader from "./components/SubHeader";
import Configs from "./components/Configs";

export default {
  name: "app",
  components: {
    Header,
    SubHeader,
    Configs
  },
  data() {
    return {
      isLoading: false,
      isFullPage: true,
      fontes: [
        "globo.com",
        "gazetaweb.globo.com",
        "uol.com.br",
        "terra.com.br",
        "r7.com",
        "correiobraziliense.com.br",
        "estadao.com.br"
      ],
      palavras_chave: ["dengue", "zika"],
      
      palavras_chave_selecionadas: [],
      fontes_selecionadas: []
    };
  },
  methods: {
    handleAddPalavra(palavra_chave) {
      this.$data.palavras_chave.push(palavra_chave)
    },
    handleAddFonte(fonte) {
      this.$data.fontes.push(fonte)
    }
  }
};
</script>

<style>
</style>
