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
      offset: 30,
      limit: 40,
    }
  },
  methods: {
    onClickSearch() {
      this.searchResults = "buscando...";
      axios.get("https://api.mercadolibre.com/sites/MCO/search", {
          params: {
            q: 'gafas',
            offset: this.offset,
            limit: this.limit
          }
        })
        .then(data => {
          // eslint-disable-next-line no-console
          console.log(data.data);
          this.searchResults = data.data.results[0];
        });
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
  background-color: #dedede;
  width: 100%;
  height: fit-content;
  min-height: 80px;
}
</style>