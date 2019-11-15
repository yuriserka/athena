<template>
  <div>
    <md-table>
      <md-table-row>
        <md-table-head md-numeric>ID</md-table-head>
        <md-table-head>Title</md-table-head>
      </md-table-row>

      <md-table-row>
        <md-table-cell md-numeric>{{news.id}}</md-table-cell>
        <md-table-cell>{{news.title}}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "News",
  props: ["news"]
};
</script>

<style>
</style>