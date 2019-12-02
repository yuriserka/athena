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
    <br />
    <br />

    <section>
      <b-modal :active.sync="modalAddPalavra" :width="640">
        <section>
          <header class="modal-card-head">
            <p class="modal-card-title">Adicione uma palavra chave</p>
          </header>
          <section class="modal-card-body">
            <b-field label="Palavra Chave">
              <b-input
                type="text"
                v-model="nova_palavra.nome"
                placeholder="palavra chave"
                required
              />
            </b-field>
            <b-field label="Sinônimos">
              <b-input
                type="text"
                v-model="nova_palavra.sinonimos"
                placeholder="entre com sinônimos separados por ','"
              />
            </b-field>
            <b-field label="Peso">
              <b-input
                type="number"
                v-model="nova_palavra.peso"
                placeholder="peso para ranqueamento"
                min="1"
                max="5"
                required
              />
            </b-field>
            <!-- se algum dia for necessario editar o peso dos sinonimos é isto aqui -->
          </section>
          <footer class="modal-card-foot">
            <button
              class="button is-primary"
              @click="add"
              type="submit"
              :disabled="nova_palavra.nome.length == 0 || nova_palavra.peso < 1 || nova_palavra.peso > 5"
            >Adicionar</button>
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
      {{' '}}
      <a @click="selectAll">
        <b-icon
          pack="fas"
          icon="check-square"
          size="is-medium"
          title="Selecionar todas as fontes."
          style="color:green;"
        ></b-icon>
      </a>

      <a @click="unSelectAll">
        <b-icon
          pack="fas"
          icon="trash"
          size="is-medium"
          title="Deselecionar todas as fontes."
          style="color:red;"
        ></b-icon>
      </a>
      <br />
      <br />

      <p class="content" v-if="showList">
        <b>palavras-chave selecionadas:</b>
        {{ selecionadas.join(', ') }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PalavrasChave",
  props: ["palavras_chave","showList"],
  data() {
    return {
      nova_palavra: {
        nome: "",
        sinonimos: "",
        peso: 1
      },
      default_nova_palavra: {
        nome: "",
        sinonimos: "",
        peso: 1
      },
      modalAddPalavra: false,
      modalRmvPalavra: false,
      selecionadas: [],
      selecionadas_para_remover: []
    };
  },
  computed: {
    splitted_nova_palavra_sinonimos() {
      if (!this.nova_palavra.sinonimos.length) {
        return [];
      }
      return this.nova_palavra.sinonimos
        .split(",")
        .map(s => s.trim())
        .map(s => {
          return {
            nome: s,
            peso: this.nova_palavra.peso
          };
        });
    },
    mostrar_nome_selecionadas() {
      return this.selecionadas.map(p => p.palavra);
    }
  },
  methods: {
    add() {
      this.nova_palavra_sinonimos = this.splitted_nova_palavra_sinonimos;
      this.$emit("add-p", {
        [this.nova_palavra.nome]:{
          weight: this.nova_palavra.peso,
          synonyms: this.nova_palavra.sinonimos.split(",").map(s => s.trim()),
        }
      });
      this.nova_palavra = this.default_nova_palavra;
      this.modalAddPalavra = false;
    },
    select() {
      this.$emit("slct-p", this.selecionadas);
    },
    remove() {
      this.selecionadas = this.selecionadas.filter(
        ({ palavra }) => !this.selecionadas_para_remover.includes(palavra)
      );
      this.$emit("rmv-p", this.selecionadas_para_remover);
      this.select();
      this.selecionadas_para_remover = [];
      this.modalRmvPalavra = false;
    },
    selectAll() {
      this.selecionadas = Object.keys(this.palavras_chave);
      this.select();
    },
    unSelectAll() {
      this.selecionadas = [];
      this.select();
    }
  }
};
</script>

<style scoped>
</style>
