<template>
  <div id="app">
    <Header />
    <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="false"></b-loading>
    <SubHeader />
    <Configs
      :palavras_chave="palavras_chave"
      :fontes="fontes"
      @adicionar-palavra-chave="handleAddPalavra"
      @selecionar-palavra-chave="handleSlctPalavra"
      @adicionar-fonte="handleAddFonte"
      @selecionar-fonte="handleSlctFonte"
    />
    <div class="container">
      <br />
      <b-button
        :class="okToSearch ? 'is-success' : 'is-danger'"
        :disabled="!okToSearch"
      >Realizar Busca</b-button>
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

      palavras_chave_selecionadas: [],
      fontes_selecionadas: [],
      noticias_selecionadas: []
    };
  },
  computed: {
    okToSearch() {
      return (
        this.palavras_chave_selecionadas.length > 0 &&
        this.fontes_selecionadas.length > 0
      );
    }
  },
  provide() {
    return {
      getPalavrasChaveSelecionadas: this.palavras_chave_selecionadas,
      getFontesSelecionadas: this.fontes_selecionadas,
      getFontes: this.fontes,
      getPalavrasChave: this.palavras_chave
    };
  },
  methods: {
    handleAddPalavra(palavra_chave) {
      this.palavras_chave.push(palavra_chave);
    },
    handleSlctPalavra(palavras_selecionadas) {
      this.palavras_chave_selecionadas = palavras_selecionadas;
    },
    handleAddFonte(fonte) {
      this.fontes.push(fonte);
    },
    handleSlctFonte(fontes_selecionadas) {
      this.fontes_selecionadas = fontes_selecionadas;
    },
    getConfigInfo() {
      this.fontes = config.fontes_de_noticia;
      this.palavras_chave = config.palavras_chave;
    }
  },
  beforeMount() {
    this.getConfigInfo();
  }
};
</script>

<style>
</style>
