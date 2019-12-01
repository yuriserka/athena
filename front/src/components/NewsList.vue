<template>
  <div>
    <div class="container">
      <br />
      <b-button
        :class="okToSearch ? 'is-success' : 'is-danger'"
        :disabled="!okToSearch"
        @click="buscarNoticias"
      >Realizar Busca</b-button>
    </div>
    <b-loading :active.sync="isLoading" :can-cancel="false"></b-loading>
    <div v-if="ok">
      <section class="section">
        <div class="container">
          <h1 class="title">Resultados</h1>
        </div>
      </section>
      <div v-for="(item, index) of noticias" class="container" :key="index">
        <h2
          class="title is-4 is-spaced bd-anchor-title"
        >Termo {{item.word}} retornou {{item.noticias.length}} resultados:</h2>

        <template>
          <b-table
            :data="item.noticias"
            :loading="isLoading"
            :checked-rows.sync="noticias_selecionadas"
            checkable
            paginated
            :total="total"
            :per-page="5"
            aria-next-label="Próxima página"
            aria-previous-label="Página anterior"
            aria-page-label="Página"
            aria-current-label="Página atual"
            :default-sort-direction="defaultSortOrder"
            :default-sort="[sortField, sortOrder]"
          >
            <template slot-scope="props">
              <b-table-column field="image">
                <img :src="props.row.urlToImage" alt />
              </b-table-column>

              <b-table-column field="original_title" label="Title" sortable>{{ props.row.title }}</b-table-column>

              <b-table-column field="descricao" label="Descrição">{{ props.row.description }}</b-table-column>

              <b-table-column field="score" label="Score" numeric sortable>
                <span class="tag" :class="type(props.row.score)">{{ props.row.score }}</span>
              </b-table-column>

              <b-table-column field="conteudo" label="Conteúdo">
                {{ props.row.content | truncate(260)}}
                <br />
                <a :href="props.row.url" target="_blank">Notícia na íntegra</a>
              </b-table-column>

              <b-table-column
                field="data_postagem"
                label="Publicado em"
                centered
              >{{ props.row.publishedAt ? new Date(props.row.publishedAt).toLocaleDateString() : '' }}</b-table-column>
            </template>
          </b-table>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "NewsList",
  components: {},
  props: ["fontes_selecionadas", "palavras_selecionadas"],
  data() {
    return {
      noticias: {},
      ok: false,
      sortField: "score",
      sortOrder: "desc",
      defaultSortOrder: "desc",
      page: 1,
      isLoading: false,
      noticias_selecionadas: []
    };
  },
  computed: {
    okToSearch() {
      return (
        Object.keys(this.$props.palavras_selecionadas).length > 0 &&
        this.$props.fontes_selecionadas.length > 0
      );
    },
    total() {
      return this.noticias ? this.noticias.length : 0;
    }
  },
  watch: {
    noticias_selecionadas() {
      this.$emit("selecionar-noticia", this.noticias_selecionadas);
    }
  },
  methods: {
    buscarNoticias() {
      this.isLoading = true;
      axios
        .get("http://localhost:8083/api/news", {
          params: {
            fontes: this.$props.fontes_selecionadas.join(","),
            palavras: JSON.stringify(this.$props.palavras_selecionadas)
          }
        })
        .then(result => {
          this.noticias = result.data;
          this.isLoading = false;
          this.ok = true;
        });
    },
    select() {
      this.$emit("selecionar-noticia", this.noticias_selecionadas);
    },
    type(value) {
      const number = parseFloat(value);
      if (number < 6) {
        return "is-danger";
      } else if (number >= 6 && number < 8) {
        return "is-warning";
      } else if (number >= 8) {
        return "is-success";
      }
    }
  },
  filters: {
    truncate(value, length) {
      return value.length > length ? value.substr(0, length) + "..." : value;
    }
  }
};
</script>

<style scoped>
</style>