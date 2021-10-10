<template>
  <div id="app">
    <router-view>
      <Home></Home>
    </router-view>
  </div>
</template>

<script>
import Home from './views/Home.vue'

export default {
  name: 'app',
  components: {
      Home
  }
}
</script>

<style>
</style>
