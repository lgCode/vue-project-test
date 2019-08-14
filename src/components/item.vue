<template>
  <a class="daily-item">
    <div class="daily-img" v-if="itemData.images">
      <img :src="imgPath" alt="">
    </div>
    <div class="daily-title" 
        :class="{ noImg: !imgPath}">{{itemData.title}}{{itemData.id}}</div>
  </a>

</template>

<script>
  export default {
    name:'item',
    props:{
      itemData:{
        type:Object
      }
    },
    data() {
      // console.log(this.itemData);
      return {
        imgPath:this.itemData.images[0]
      }
    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
