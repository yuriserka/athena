<template>
  <div>
    <p class="content">
      <b>Fontes de Notícias:</b>
    </p>
    <b-icon pack="fas" icon="info-circle" size="is-small"></b-icon>Você também pode adicionar uma fonte de notícias temporária.
    <a @click="add">
      <b-icon
        pack="fas"
        icon="plus-square"
        size="is-small"
        title="Clique para adicionar uma fonte temporária."
      ></b-icon>
    </a>
    <a @click="modalRmvFonte = true">
      <b-icon
        pack="fas"
        icon="minus-square"
        size="is-small"
        title="Clique para remover uma fonte temporária."
        style="color:red;"
      ></b-icon>
    </a>
    <br />
    <br />
    <section>
      <b-modal :active.sync="modalRmvFonte" :width="640">
        <section>
          <header class="modal-card-head">
            <p class="modal-card-title">Remova palavras chave</p>
          </header>
          <section class="modal-card-body">
            <template>
              <b-table
                :data="fontes"
                :checked-rows.sync="selecionadas_para_remover"
                checkable
                paginated
                :per-page="7"
                aria-next-label="Próxima página"
                aria-previous-label="Página anterior"
                aria-page-label="Página"
                aria-current-label="Página atual"
              >
                <template slot-scope="props">
                  <b-table-column field="source" label="Fonte de Notícia">{{ props.row }}</b-table-column>
                </template>
              </b-table>
            </template>
          </section>
          <footer class="modal-card-foot">
            <button
              class="button is-primary"
              @click="remove"
              type="submit"
              :disabled="selecionadas_para_remover.length == 0"
            >Remover</button>
            <!-- TODO, acho q seria interessante uma forma de salvar ou editar as palavras_chave padrão -->
            <!-- <button class="button is-primary" @click="edit" type="submit">Salvar</button> -->
          </footer>
        </section>
      </b-modal>
    </section>
    <div class="block">
      <b-checkbox
        v-for="(fonte, index) in fontes"
        @change.native="select"
        v-model="selecionadas"
        :native-value="fonte"
        :key="index"
      >{{fonte}}</b-checkbox>

      <p class="content">
        <b>fontes selecionadas:</b>
        {{ selecionadas.join(' | ') }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Fontes",
  props: ["fontes"],
  data() {
    return {
      selecionadas: [],
      modalRmvFonte: false,
      selecionadas_para_remover: []
    };
  },
  methods: {
    add() {
      this.$buefy.dialog.prompt({
        message: `Digite a nova fonte de notícias à ser incluída`,
        inputAttrs: {
          placeholder: "e.g. g1.globo.com/",
          maxlength: 40
        },
        onConfirm: value => this.$emit("add-f", value)
      });
    },
    rmv() {
      // TODO: mostrar tela para remover noticias selecionadas
      return;
    },
    select() {
      this.$emit("slct-f", this.selecionadas);
    },
    remove() {
      this.selecionadas = this.selecionadas.filter(
        fonte => !this.selecionadas_para_remover.includes(fonte)
      );
      this.$emit("rmv-f", this.selecionadas_para_remover);
      this.select();
      this.selecionadas_para_remover = [];
      this.modalRmvFonte = false;
    }
  }
};
</script>

<style>
</style>