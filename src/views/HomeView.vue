<template>
   <div class="container-fluid">
    <div class="row">
      <h1 class="mt-5">This is the homepage</h1>
      <p v-if="recentProducts?.length">
        <ul>
          <li v-for="product in recentProducts" :key="product.id">
            {{ product.productName }} - {{ product.productDescription }}
          </li>
        </ul>
      </p>
      <SpinnerComp v-else />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SpinnerComp from '@/components/SpinnerComp.vue';

export default {
  name: 'HomeView',
  components: {
    SpinnerComp,
  
  },
  computed: {
    recentProducts(){
      return this.$store.state.recentProducts
    }
  },
  mounted(){
    this.$store.dispatch('recentProducts')
  }
}
</script>
