<template>
  <div>
    <Header />
    <div class="container">
      <div class="section">
        <h1 class="title" style>Ajuda</h1>
        <h2
          class="title is-4 is-spaced bd-anchor-title"
          style="color: purple;"
        >Como adicionar Fontes de Notícias e Palavras de busca temporárias</h2>
        <span class="fonte-grande">
          Para adicionar e/ou remover fontes de notícias e/ou palavras chave de busca, basta acessar a
          <a
            href="/"
          >página principal</a> e selecionar o ícone
          <b-icon type="is-primary" pack="fas" icon="plus-square" size="is-medium"></b-icon>
          {{" "}} para a adição ou o ícone
          <b-icon type="is-primary" pack="fas" icon="minus-square" size="is-medium"></b-icon>
          {{" "}} para a remoção.
          <br />
          <br />Neste processo é necessário atribuir um peso, este que será atribuído à nova palavra e aos seus sinônimos,
          se estes existirem. O peso é necessário pois será utilizado no ranqueamento das notícias.
        </span>
        <b-message type="is-warning" has-icon aria-close-label="Close notification">
          <strong>Atenção</strong>: Ao atualizar a página, as alterações feitas aqui serão desfeitas.
        </b-message>
      </div>
      <div class="section">
        <h2
          class="title is-4 is-spaced bd-anchor-title"
          style="color: purple;"
        >Como adicionar Fontes de Notícias e Palavras de busca que serão salvas</h2>
        <span class="fonte-grande">
          Para adicionar e/ou remover fontes de notícias e/ou palavras chave de busca, basta acessar a
          <a
            href="/config"
          >página de configuração</a> e selecionar o ícone
          <b-icon type="is-primary" pack="fas" icon="plus-square" size="is-medium"></b-icon>
          {{" "}} para a adição ou o ícone
          <b-icon type="is-primary" pack="fas" icon="minus-square" size="is-medium"></b-icon>
          {{" "}} para a remoção.
          <br />
          <br />Neste processo é necessário atribuir um peso, este que será atribuído à nova palavra e aos seus sinônimos,
          se estes existirem. O peso é necessário pois será utilizado no ranqueamento das notícias.
          <br />
          <br />Existem 3 botões na parte inferior, sendo eles:
          <div style="display: inline-block; margin-left: 25px;">
            <br />
            <b-button class="is-success">Atualizar</b-button>
            {{' '}}que atualiza as fontes de notícias e as palavras
            de busca para aquelas que foram selecionadas
            <br />
            <br />
            <b-button class="is-danger">Apagar Todos</b-button>
            {{' '}}que apaga todas as fontes de notícias e as palavras
            de busca
            <br />
            <br />
            <b-button class="is-warning">Restaurar Padrões</b-button>
            {{' '}}que apaga todas as palavras de busca, mas restaura algumas fontes de notícias
            <br />
            <br />
          </div>
          <b-message type="is-warning" has-icon aria-close-label="Close notification">
            <strong>Atenção</strong>: As alterações feitas aqui serão salvas no navegador,
            logo, elas se mantêm entre as seções.
          </b-message>
        </span>
      </div>
      <div class="section">
        <h2
          class="title is-4 is-spaced bd-anchor-title"
          style="color: purple;"
        >Entendendo o ranqueamento</h2>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";

export default {
  name: "Help",
  components: {
    Header
  }
};
</script>

<style scoped>
.fonte-grande {
  font-size: 18px;
}
</style>