<template>
  <div class="about">
    <h1 class="page-name">MercadoDaniel!</h1>
    <div class="search-group">
      <b-form-input class="search-input" v-model="item" placeholder="Search you item!"
      @keypress="enterPressed($event)"></b-form-input>
      <md-button
        class="md-raised md-primary search-button"
        @click="onClickSearch">
        Search!
      </md-button>
    </div>
    <div class="api-container">
      <div class="results-container">
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
import { BFormInput } from 'bootstrap-vue'

/* eslint-disable */

export default {
  name: 'MercadoAPI',
  components: {
    CardResults,
    BPagination,
    BFormInput,
  },
  data() {
    return {
      searchResults: 'There is no results yet!',
      offset: 0,
      limit: 50,
      thereIsSearchResults: false,
      item: '',
      
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
        if (queryResultsNumber == 0) {
          this.searchResults = 'Sorry! We did not find any results. 😔'
        }
        else {
          this.searchResults = this.searchResults.data.results
          this.currentPage = 1
          this.thereIsSearchResults = true
        }
      } catch (error) {
        console.error(error)
        this.searchResults = 'ERROR!'
      }
    },
    async pageChanged(page){
      this.thereIsSearchResults = false
      this.offset = this.limit*(page-1)
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
        window.scrollTo(0, 0)
        this.thereIsSearchResults = true
      } catch (error) {
        console.error(error)
        this.searchResults = 'ERROR!'
      }
    },
    enterPressed(event) {
      if (event.keyCode === 13) {
        this.onClickSearch()
      }
    }
  },
}
</script>

<style scoped>
.page-name {
  padding: 20px;
}
.search-group{
  display: flex;
  width: 100%;
  justify-content: center;
}
.search-input {
  width: 30%;
}
.api-container {
  display: flex;
  padding: 20px;
}
.search-button {
  margin-top: -1px;
  align-items: center;
}
.results-container {
  background-color: #dedede;
  width: 100%;
  min-height: 80px;
  padding: 1em;
}
</style>