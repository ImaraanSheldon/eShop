<template>
  <div class="container-fluid">
    <div class="row">
      <h1 class="mt-5">this the homepage</h1>
      <SpinnerComp/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SpinnerComp from '@/components/SpinnerComp.vue';

export default {
  name: 'HomeView',
  components: {
    SpinnerComp
  }
}
</script>
