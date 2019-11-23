<template>
  <section class="hero is-primary is-bold">
    <div class="hero-body">
      <div class="container hero-body">
        <p data-step="1" data-intro="Esta é a Plataforma Athena" class="title">Athena</p>
        <p class="subtitle">Plataforma de busca e ranqueamento de notícias.</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Title"
};
</script>

<style scoped>
.hero.is-primary.is-bold {
  background-image: linear-gradient(141deg, #000000, #7957d5 71%, #9b67df);
}

.bdbutton {
  background-color: #ffdd57 !important;
  border-color: #ffdd57 !important;
  color: rgba(0, 0, 0, 0.7) !important;
}

.hero.is-primary.is-bold::after {
  content: "";
  background: url(/assets/news.png);
  opacity: 0.5;

  position: absolute;
  z-index: 10;
}
</style>