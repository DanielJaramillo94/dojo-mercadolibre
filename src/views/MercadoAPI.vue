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
        <template v-if="thereIsSearchResults">
          <card-results
          :resultsData="searchResults"/>
        </template>
        <template v-else>
          <p>{{searchResults}}</p>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CardResults from '@/components/CardResults'

export default {
  name: 'MercadoAPI',
  components: {
    CardResults,
  },
  data() {
    return {
      searchResults: 'There is no results yet!',
      offset: 30,
      limit: 40,
      thereIsSearchResults: false,
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
          this.searchResults = data.data.results;
          // eslint-disable-next-line no-console
          console.log(this.searchResults);
          this.thereIsSearchResults = true;
        });
    }
  },
}
</script>

<style scoped>
.api-container {
  display: flex;
  padding: 20px;
}
md-button {
  align-items: center;
}
.search-container {
  background-color: #dedede;
  width: 100%;
  min-height: 80px;
  padding: 1em;
}
</style>