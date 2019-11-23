<template>
  <section class="section">
    <div class="container">
      <h1 class="title">busca & ranqueamento</h1>
      <p
        data-step="2"
        data-intro="Aqui uma breve descrição de plataforma, vamos entender tudinho!"
      >
        A
        plataforma
        <b>Athena</b> irá buscar pelas palavras-chave selecionadas em diversas fontes
        selecionadas. Após ter a busca efetuada, a plataforma irá realizar o ranqueamento das notícias, afim
        de de tentar estimar a relevância desta notícia.
        <br />Tendo as notícias selecionadas, é possível
        enviá-las para o banco de dados, assim será possível utilizar outros artefatos, como por exemplo o
        <i>clipping.</i>
      </p>
      <br />
      <b-message title="aviso importante" type="is-info" aria-close-label="Fechar mensagem">
        O sistema de ranqueamento apenas tenta obter os score através de uma caixa de palavras. O seu
        processo leva em conta a quantidade de vezes que uma palavra e seus sinônimos aparecem. Não há um
        processamento de linguagem natural ou algo do gênero, é
        <b>
          <i>altamente recomendável</i>
        </b> a
        leitura da notícia para um bom resultado de
        <i>clipping</i> e uma boa base de dados.
      </b-message>
    </div>
  </section>
</template>

<script>
export default {
  name: "SubHeader"
};
</script>

<style>
</style>