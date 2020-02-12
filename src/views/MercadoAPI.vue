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
// import axios from 'axios'
import mercadoLibreAPI from '../services/mercadolibre.service'
import CardResults from '@/components/CardResults'
/* eslint-disable */

export default {
  name: 'MercadoAPI',
  components: {
    CardResults,
  },
  data() {
    return {
      searchResults: 'There is no results yet!',
      offset: 0,
      limit: 15,
      thereIsSearchResults: false,
    }
  },
  methods: {
    async onClickSearch() {
      this.searchResults = "buscando...";
      try {
        this.searchResults = await mercadoLibreAPI.getElements('gafas', this.offset, this.limit)
        this.searchResults = this.searchResults.data.results
        this.thereIsSearchResults = true
      } catch (error) {
        this.searchResults = 'ERROR!'
      }
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