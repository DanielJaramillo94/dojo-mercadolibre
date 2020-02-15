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
            :results-data="searchResults"/>
        </template>
        <template v-else>
          <p>{{ searchResults }}</p>
        </template>
      </div>
    </div>
    <b-pagination v-if="thereIsSearchResults"
      v-model="currentPage"
      :total-rows="totalResults"
      :per-page="limit"
      @input="pageChanged"/>
  </div>
</template>

<script>
// import axios from 'axios'
import mercadoLibreAPI from '../services/mercadolibre.service'
import CardResults from '@/components/CardResults'
import { BPagination } from 'bootstrap-vue'
/* eslint-disable */

export default {
  name: 'MercadoAPI',
  components: {
    CardResults,
    BPagination,
  },
  data() {
    return {
      searchResults: 'There is no results yet!',
      offset: 0,
      limit: 50,
      thereIsSearchResults: false,
      item: 'gafas',
      
      APIlimitOffset: 1000,

      currentPage: 1,
      totalResults: 0,
    }
  },
  methods: {
    async onClickSearch() {
      this.thereIsSearchResults = false
      this.searchResults = "buscando..."
      try {
        this.searchResults = await mercadoLibreAPI.getElements(this.item, 0, this.limit)
        let queryResultsNumber = this.searchResults.data.paging.total
        let maxPages = Math.ceil(this.APIlimitOffset/this.limit)
        // console.log('queryResultsNumber: ' + queryResultsNumber)
        if (queryResultsNumber > maxPages*this.limit) {
          this.totalResults = maxPages*this.limit
        } else {
          this.totalResults = queryResultsNumber
        }
        // console.log('totalResults: ' + this.totalResults)
        this.searchResults = this.searchResults.data.results
        this.thereIsSearchResults = true
      } catch (error) {
        console.error(error)
        this.searchResults = 'ERROR!'
      }
    },
    async pageChanged(page){
      this.thereIsSearchResults = false
      this.offset = this.limit*(page-1)
      let offsetExeeded = false
      try {
        this.searchResults = "buscando..."
        this.searchResults = await mercadoLibreAPI.getElements(this.item, this.offset, this.limit)
        let queryResultsNumber = this.searchResults.data.paging.total
        let maxPages = Math.ceil(this.APIlimitOffset/this.limit)
        // console.log('queryResultsNumber: ' + queryResultsNumber)
        if (queryResultsNumber > maxPages*this.limit) {
          this.totalResults = maxPages*this.limit
        } else {
          this.totalResults = queryResultsNumber
        }
        // console.log('totalResults: ' + this.totalResults)
        this.searchResults = this.searchResults.data.results
        this.thereIsSearchResults = true
      } catch (error) {
        console.error(error)
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