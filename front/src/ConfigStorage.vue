<template>
  <div>
    <Header />
    <div class="section">
      <div class="container">
        <h1 class="title">Configurações</h1>
        <h2 class="title is-4 is-spaced bd-anchor-title" style="color: purple;">
          <p>Insira e modifique as configurações da busca</p>
        </h2>
        <b-notification type="is-warning" has-icon aria-close-label="Close notification">
          <span class="fonte-grande">
            <strong>Atenção</strong>: Por usar o navegador como local de armazenamento,
            limpar os dados do navegador limpa a lista de configurações
          </span>
        </b-notification>
        <br />
        <PalavrasChave
          :palavras_chave="palavras_chave"
          @add-p="handleAddPalavra"
          @rmv-p="handleRmvPalavra"
          @slct-p="handleSlctPalavra"
        />
        <br />
        <Fontes
          :fontes="fontes"
          @add-f="handleAddFonte"
          @rmv-f="handleRmvFonte"
          @slct-f="handleSlctFonte"
        />
        <br />
        <h2 class="title">Arquivo Final</h2>
        <b-table
          :data="(this.palavras_chave_selecionadas.length > 0) ? (this.palavras_chave_selecionadas) : Object.keys(this.palavras_chave)"
        >
          <template slot-scope="props">
            <b-table-column field="keyword" label="Palavra Chave">{{ props.row }}</b-table-column>
            <b-table-column field="weight" label="Pesos">{{ palavras_chave[props.row].weight }}</b-table-column>
            <b-table-column
              field="synonyms"
              label="Sinônimos"
            >{{ palavras_chave[props.row].synonyms.join(', ') }}</b-table-column>
          </template>
        </b-table>
        <p class="content">
          <strong>Fontes Selecionadas:</strong>
          {{(fontes_selecionadas.length > 0
          ? fontes_selecionadas
          : fontes).map(x => "\"" + x + "\"").join(', ') }}
        </p>
        <b-button :class="'is-success'" @click="setConfigInfo">Atualizar</b-button>
        <b-button
          style="margin-left: 5em;"
          :class="'is-danger'"
          @click="clearConfigInfo"
        >Apagar Todos</b-button>
        <b-button
          style="margin-left: 5em;"
          :class="'is-warning'"
          @click="resetConfigInfo"
        >Restaurar Padrões</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import PalavrasChave from "./components/config/PalavrasChave";
import Fontes from "./components/config/Fontes";

export default {
  name: "ConfigStorage",
  components: {
    Header,
    PalavrasChave,
    Fontes
  },
  data() {
    return {
      fontes: [],
      palavras_chave: {},
      palavras_chave_selecionadas: [],
      fontes_selecionadas: []
    };
  },
  methods: {
    clearConfigInfo() {
      this.$buefy.dialog.confirm({
        message: "Deseja mesmo excluir todas as palavras e fontes?",
        onConfirm: () => {
          window.localStorage.setItem("default_config", "");
          this.getConfigInfo();
          this.palavras_chave_selecionadas = [];
          this.fontes_selecionadas = [];
        }
      });
    },
    setConfigInfo() {
      let fonte = this.fontes;
      if (this.fontes_selecionadas.length > 0) fonte = this.fontes_selecionadas;
      let nova_palavras = {};
      if (this.palavras_chave_selecionadas.length > 0) {
        this.palavras_chave_selecionadas.forEach(elem => {
          nova_palavras[elem] = this.palavras_chave[elem];
        });
      } else {
        nova_palavras = { ...this.palavras_chave };
      }
      let config = {
        fontes_de_noticia: fonte,
        palavras_chave: { ...nova_palavras }
      };
      this.$buefy.dialog.confirm({
        message:
          "Deseja mesmo atualizar as palavras de busca e as fontes de notícias?",
        onConfirm: () => {
          window.localStorage.setItem("default_config", JSON.stringify(config));
          this.getConfigInfo();
          this.palavras_chave_selecionadas = [];
          this.fontes_selecionadas = [];
        }
      });
    },
    resetConfigInfo() {
      let config = {
        fontes_de_noticia: [
          "globo.com",
          "gazetaweb.globo.com",
          "uol.com.br",
          "terra.com.br",
          "r7.com",
          "correiobraziliense.com.br",
          "estadao.com.br"
        ],
        palavras_chave: { ...{} }
      };
      this.$buefy.dialog.confirm({
        message: "Deseja mesmo recuperar os valores padrão?",
        onConfirm: () => {
          window.localStorage.setItem("default_config", JSON.stringify(config));
          this.getConfigInfo();
          (this.palavras_chave_selecionadas = []),
            (this.fontes_selecionadas = []);
        }
      });
    },
    getConfigInfo() {
      let arquivo = JSON.parse(
        window.localStorage.getItem("default_config") || "{}"
      );
      this.fontes = arquivo.fontes_de_noticia || [];
      this.palavras_chave = arquivo.palavras_chave || [];
    },
    handleAddPalavra(palavra_chave) {
      this.palavras_chave = { ...this.palavras_chave, ...palavra_chave };
    },
    handleRmvPalavra(palavras_chave_selecionadas) {
      this.palavras_chave = Object.keys(this.palavras_chave)
        .filter(word => !palavras_chave_selecionadas.includes(word))
        .reduce(
          (acc, key) => ({ ...acc, [key]: { ...this.palavras_chave[key] } }),
          {}
        );
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
    }
  },
  beforeMount() {
    this.getConfigInfo();
  }
};
</script>

<style scoped>
.fonte-grande {
  font-size: 18px;
}
</style>