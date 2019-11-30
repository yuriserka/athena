<template>
  <div>
    <p class="content">
      <b>Palavras Chaves:</b>
    </p>
    <b-icon pack="fas" icon="info-circle" size="is-small"></b-icon>Você também pode adicionar uma palavra chave temporária.
    <a @click="modalAddPalavra = true">
      <b-icon
        pack="fas"
        icon="plus-square"
        size="is-small"
        title="Clique para adicionar palavra chave temporária."
      ></b-icon>
    </a>
    <a @click="modalRmvPalavra = true">
      <b-icon
        pack="fas"
        icon="minus-square"
        size="is-small"
        title="Clique para remover palavra chave temporária."
        style="color:red;"
      ></b-icon>
    </a>
    <section>
      <b-modal :active.sync="modalAddPalavra" :width="640">
        <section>
          <header class="modal-card-head">
            <p class="modal-card-title">Adicione uma palavra chave</p>
          </header>
          <section class="modal-card-body">
            <b-field label="Palavra Chave">
              <b-input type="text" v-model="nova_palavra" placeholder="palavra chave" required />
            </b-field>
            <b-field label="Sinônimos">
              <b-input
                type="text"
                v-model="nova_palavra_sinonimos"
                placeholder="entre com sinônimos separados por ','"
              />
            </b-field>
            <b-field label="Peso">
              <b-input type="number" v-model="peso_nova_palavra" placeholder="peso para ranqueamento" min="1" max="5" required />
            </b-field>
          </section>
          <footer class="modal-card-foot">
            <button
              class="button is-primary"
              @click="add"
              type="submit"
              :disabled="nova_palavra.length === 0 || peso_nova_palavra < 1 || peso_nova_palavra > 5"
            >Adicionar</button>
            <!-- TODO, acho q seria interessante uma forma de salvar ou editar as palavras_chave padrão -->
            <!-- <button class="button is-primary" @click="edit" type="submit">Salvar</button> -->
          </footer>
        </section>
      </b-modal>
    </section>
    <section>
      <b-modal :active.sync="modalRmvPalavra" :width="640">
        <section>
          <header class="modal-card-head">
            <p class="modal-card-title">Remova palavras chave</p>
          </header>
          <section class="modal-card-body">
            <template>
              <b-table
                :data="Object.keys(palavras_chave)"
                :checked-rows.sync="selecionadas_para_remover"
                checkable
                paginated
                :per-page="5"
                aria-next-label="Próxima página"
                aria-previous-label="Página anterior"
                aria-page-label="Página"
                aria-current-label="Página atual"
              >
                <template slot-scope="props">
                  <b-table-column field="keyword" label="Palavra Chave">{{ props.row }}</b-table-column>
                  <b-table-column field="weight" label="Pesos">{{ palavras_chave[props.row].weight }}</b-table-column>
                  <b-table-column field="synonyms" label="Sinônimos">{{ palavras_chave[props.row].synonyms.join(', ') }}</b-table-column>
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
        v-for="(_,index) in palavras_chave"
        @change.native="select"
        v-model="selecionadas"
        :native-value="index"
        :key="index"
      >{{ index }}</b-checkbox>

      <p class="content">
        <b>palavras-chave selecionadas:</b>
        {{ selecionadas }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PalavrasChave",
  props: ["palavras_chave"],
  data() {
    return {
      nova_palavra: "",
      peso_nova_palavra: null,
      nova_palavra_sinonimos: "",
      modalAddPalavra: false,
      modalRmvPalavra: false,
      selecionadas: [],
      selecionadas_para_remover: []
    };
  },
  methods: {
    add() {
      this.$emit("add-p", {
        [this.nova_palavra]:{
          weight: this.peso_nova_palavra,
          synonyms: this.nova_palavra_sinonimos.split(",").map(s => s.trim()),
        }
      });
      this.nova_palavra = "";
      this.nova_palavra_sinonimos = "";
      this.peso_nova_palavra = null,
      this.modalAddPalavra = false;
    },
    select() {
      this.$emit("slct-p", this.selecionadas);
    },
    remove() {
      this.selecionadas_para_remover = this.selecionadas_para_remover.map(
        el => {
          return el.palavra;
        }
      );
      this.selecionadas = this.selecionadas.filter(
        keyword => !this.selecionadas_para_remover.includes(keyword)
      );
      this.$emit("rmv-p", this.selecionadas_para_remover);
      this.select();
      this.selecionadas_para_remover = [];
      this.modalRmvPalavra = false;
    }
  }
};
</script>

<style>
</style>
