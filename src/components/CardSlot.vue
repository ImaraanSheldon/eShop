<template>
    <div class="card">
        <slot name="cardHeader"></slot>
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <slot name="cardBody"></slot>
        </div>
    </div>
</template>

<script>
export default {
    components: {
        name: "CardSlot"
    }
}
</script>

<style scoped>
.card{
    width:18rem;
}
</style>