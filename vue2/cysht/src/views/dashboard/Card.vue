<template>
  <div class="card">
    <p><i :class="item.icon"></i></p>
    <p>{{item.title}}</p>
    <p>{{item.total}}</p>
  </div>
</template>

<script>
export default {
props:{
    item:Object
},
data() {
    return {
        property: 'value',
    };
},
}
</script>

<style lang="scss" scoped>
.card{
    width: 20%;
    height: 100px;
    background-color: #fff;
    border-radius: 4px;
    text-align: center;
}
</style>