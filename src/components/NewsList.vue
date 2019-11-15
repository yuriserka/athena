<template>
  <div>
    <div v-for="(news, index) in returned_news" :key="index">
      <News news="news" />
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
  props: ["news_array"],
  data() {
    return {
      returned_news: [
        {
          id: 0,
          title: "1"
        }
      ]
    };
  }
};
</script>

<style scoped>
</style>