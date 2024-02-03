<template>
  <div class="card-group">
    <card v-for="item in cardList" :key="item.id" :item="item"></card>
  </div>
</template>

<script>
import Card from './Card.vue'
export default {
  components: { Card },
  props:{cardList:Array}
}
</script>

<style lang="scss" scoped>
.card-group{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>