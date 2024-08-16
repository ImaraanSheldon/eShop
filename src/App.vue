<template>
  <navbar/>
  <router-view/>
</template>

<script>
import navbar from "./views/NavbarView.vue"
export default{
  components:{
    navbar
  }
}
</script>

<style src="../src/assets/css/style.css"></style>
