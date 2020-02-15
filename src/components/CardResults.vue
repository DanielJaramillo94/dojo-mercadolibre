<template>
  <div class="card-result-container">
    <template v-for="(result, index) in resultsData">
      <item-card
        :key="index"
        :item-data="result"/>
    </template>
  </div>
</template>

<script>
import ItemCard from '@/components/ItemCard'

export default {
  name: 'MercadoAPI',
  components: {
    ItemCard,
  },
  data() {
    return {
    }
  },
  props: {
    resultsData: {
      // type: Array,
      default: function () {
        return {}
      }
    },
  },
  methods: {
  },
}
</script>

<style scoped>
.card-result-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-content: space-around;
}
</style>