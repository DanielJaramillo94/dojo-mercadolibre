<template>
  <div class="container">
    <div class="name">
      <p>Item name long long long long long veeeeeeeeery long long long long long long veeeeeeeeery long</p>
      <!-- <p>Item name</p> -->
    </div>
    <div class="img"></div>
    <div class="info">
      <div class="price"></div>
      <div class="link"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemCard',
  data() {
    return {
      limit: 40,
    }
  },
}
</script>
<style scoped>
.container {
 display: flex;
 flex-direction: column;
 background-color: whitesmoke;
 width: 270px;
 height: 350px;
}
.name {
  background-color: #448aff;
  display: flex;
  justify-content: center;
  width: 270px;
  height: 50px;
  padding: 5px;
}
.name p {
  font-size: 1.4em;
  margin: 0.8px;
  padding: 0;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.img {
  padding: 0 10px 0 10px;
  width: 100%;
  flex-grow: 3;
}
.info {
  flex-grow: 4;
}

</style>