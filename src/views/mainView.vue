<template>
  <div>
    我是主页
    <router-link to="/mainView/echartsView">Echarts</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
    export default {
        name: "mainView"
    }
</script>

<style>

</style>
