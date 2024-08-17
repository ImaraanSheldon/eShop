<template>
    <section v-if="recentProducts?.length">
        <div class="card" v-for="product in recentProducts" :key="product.id">
            <div class="card-header">
                <slot name="cardHeader" :product="product">{{ product.name }}</slot>
            </div>
            <div class="card-body">
                <h5 class="card-title">{{ product.title }}</h5>
                <slot name="cardBody" :product="product">{{ product.description }}</slot>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "CardSlot",
    props: {
        recentProducts: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>
.card {
    width: 18rem;
    margin-bottom: 1rem;
}
.card-header {
    font-weight: bold;
}
</style>