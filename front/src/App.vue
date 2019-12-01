<template>
  <div id="app">
    <Header />
    <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="false"></b-loading>
    <SubHeader />
    <Configs
      :palavras_chave="palavras_chave"
      :fontes="fontes"
      @adicionar-palavra-chave="handleAddPalavra"
      @remover-palavra-chave="handleRmvPalavra"
      @selecionar-palavra-chave="handleSlctPalavra"
      @adicionar-fonte="handleAddFonte"
      @remover-fonte="handleRmvFonte"
      @selecionar-fonte="handleSlctFonte"
    />
    <NewsList
      @selecionar-noticia="handleSlctNoticia"
      @limpar-noticias-selecionadas="handleClearNoticias"
      :fontes_selecionadas="fontes_selecionadas"
      :palavras_selecionadas="palavras_chave_selecionadas.reduce((obj,x) => ({...obj, [x]: {...palavras_chave[x]}}),{})"
    />
    <br />
    <div style="text-align: center;">
      <b-button
        v-if="noticias_selecionadas.length > 0"
        type="is-warning"
      >Enviar notícias selecionadas ao banco de dados</b-button>
    </div>
    <br />
    <br />
    <br />
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
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
    NewsList,
    Footer
  },
  data() {
    return {
      isLoading: false,
      isFullPage: true,
      fontes: [],
      palavras_chave: {},

      palavras_chave_selecionadas: [],
      fontes_selecionadas: [],
      noticias_selecionadas: []
    };
  },
  provide() {
    return {
      getAddPalavrasChaveSelecionadas: this.palavras_chave_selecionadas,
      getFontesSelecionadas: this.fontes_selecionadas,
      getFontes: this.fontes,
      getAddPalavrasChave: this.palavras_chave
    };
  },
  methods: {
    handleAddPalavra(palavra_chave) {
      this.palavras_chave = {...this.palavras_chave, ...palavra_chave };
    },
    handleRmvPalavra(palavras_chave_selecionadas) {
      this.palavras_chave = Object.keys(this.palavras_chave).filter(
        word => !palavras_chave_selecionadas.includes(word)
      ).reduce((acc,key) => ({...acc, [key]: {...this.palavras_chave[key]}}),{});
    },
    handleSlctPalavra(palavras_selecionadas) {
      this.palavras_chave_selecionadas = palavras_selecionadas;
    },
    handleAddFonte(fonte) {
      this.fontes.push(fonte);
    },
    handleRmvFonte(fontes_selecionadas) {
      this.fontes = this.fontes.filter(
        fonte => !fontes_selecionadas.includes(fonte)
      );
    },
    handleSlctFonte(fontes_selecionadas) {
      this.fontes_selecionadas = fontes_selecionadas;
    },
    handleSlctNoticia(noticias_selecionadas) {
      this.noticias_selecionadas = noticias_selecionadas;
    },
    handleClearNoticias() {
      this.noticias_selecionadas = [];
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
