<template>
  <div id="app">
    <Header />
    <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="false"></b-loading>
    <SubHeader />
    <Configs
      v-bind:palavras_chave="palavras_chave"
      v-bind:fontes="fontes"
      @adicionar-palavra-chave="handleAddPalavra"
      @selecionar-palavra-chave="handleSelecionarPalavraChave"
      @adicionar-fonte="handleAddFonte"
      @selecionar-fonte="handleSelecionarFonte"
    />
    <div class="container">
      <br />
      <b-button type="okToSearch ? is-success : is-danger" disabled>realizar busca</b-button>
      <br />
      <b-button
        v-if="noticias_selecionadas.length > 0"
        class="bdbutton"
        @click="armazenarNoticia"
        type="is-warning"
        outlined
      >enviar notícias selecionados ao banco de dados</b-button>
      <br />
      <br />
    </div>
    <NewsList />
  </div>
</template>

<script>
import Header from "./components/Header";
import SubHeader from "./components/SubHeader";
import Configs from "./components/Configs";
import NewsList from "./components/NewsList";
import config from "../common/config.json";

export default {
  name: "app",
  components: {
    Header,
    SubHeader,
    Configs,
    NewsList
  },
  data() {
    return {
      isLoading: false,
      isFullPage: true,
      fontes: [],
      palavras_chave: [],

      palavras_chave_selecionadas: ["aa"],
      fontes_selecionadas: ["a", "b"],
      noticias_selecionadas: []
    };
  },
  methods: {
    handleAddPalavra(palavra_chave) {
      this.palavras_chave.push(palavra_chave);
    },
    handleSelecionarPalavraChave(palavra_chave) {
      this.palavras_chave_selecionadas.push(palavra_chave);
    },
    handleAddFonte(fonte) {
      this.fontes.push(fonte);
    },
    handleSelecionarFonte(fonte) {
      this.fontes_selecionadas.push(fonte);
    },
    getConfigInfo() {
      this.fontes = config.fontes_de_noticia;
      this.palavras_chave = config.palavras_chave;
    },
    okToSearch() {
      return (
        this.palavras_chave_selecionadas.length >= 0 &&
        this.fontes_selecionadas.length >= 0
      );
    }
  },
  beforeMount() {
    this.getConfigInfo();
  }
};
</script>

<style>
</style>
