<template>
  <div class="about">
    <h1>Here we test the Mercado Libre API!</h1>
    <div class="api-container">
      <md-button
        class="md-raised md-primary"
        @click="onClickSearch">
        Search!
      </md-button>
      <div class="search-container">
        <p id="api-search-results">
          {{ searchResults }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MercadoAPI',
  data() {
    return {
      searchResults: 'No search results yet!',
    }
  },
  methods: {
    onClickSearch() {
      // eslint-disable-next-line no-console
      console.log(axios)
    }
  },
}
</script>

<style scoped>
.api-container {
  display: flex;
  width: 100%;
  padding: 20px;
}
md-button {
  align-items: center;
}
.search-container {
  background-color: #f2f2f2;
  width: 100%;
  height: 80px;
  /* width: 200px;
  height: 500px; */
}
</style>