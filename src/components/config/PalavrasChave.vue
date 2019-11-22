<template>
  <div>
    <p class="content">
      <b>Palavras Chaves:</b>
    </p>
    <b-icon pack="fas" icon="info-circle" size="is-small"></b-icon>Você também pode adicionar uma palavra chave temporária.
    <a @click="isCardModalActive = true">
      <b-icon pack="fas" icon="plus-square" size="is-small"></b-icon>
    </a>
    <section>
      <b-modal :active.sync="isCardModalActive" :width="640">
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
          </section>
          <footer class="modal-card-foot">
            <button class="button is-primary" @click="add" type="submit">Adicionar</button>
            <!-- TODO, acho q seria interessante uma forma de salvar ou editar as palavras_chave padrão -->
            <!-- <button class="button is-primary" @click="edit" type="submit">Salvar</button> -->
          </footer>
        </section>
      </b-modal>
    </section>
    <div class="block">
      <b-checkbox
        v-for="(palavra, index) in palavras_chave"
        @change.native="select"
        v-model="selecionadas"
        :native-value="palavra.palavra"
        :key="index"
      >{{palavra.palavra}}</b-checkbox>

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
      nova_palavra_sinonimos: "",
      isCardModalActive: false,
      selecionadas: []
    };
  },
  methods: {
    add() {
      this.$emit("add-p", {
        palavra: this.nova_palavra,
        sinonimos: this.nova_palavra_sinonimos.split(",").map(s => s.trim())
      });
      this.nova_palavra = "";
      this.nova_palavra_sinonimos = "";
      this.isCardModalActive = false;
    },
    select() {
      this.$emit("slct-p", this.selecionadas);
    }
  }
};
</script>

<style>
</style>