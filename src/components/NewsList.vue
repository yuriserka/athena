<template>
  <div>
    <div v-for="(news, index) in returned_news" :key="index">
      <News v-bind:news="news" />
    </div>
  </div>
</template>

<script>
import News from "./News";

export default {
  name: "NewsList",
  components: {
    News
  },
  data() {
    return {
      // isso daqui vai ter q usar o news_api
      returned_news: [
        {
          id: 0,
          title: "uma bela noticia"
        }
      ]
    };
  },
  methods: {
    getNews() {
      
    }
  }
};
</script>

<style scoped>
</style>