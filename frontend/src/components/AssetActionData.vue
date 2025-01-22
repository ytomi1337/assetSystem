<script setup>

    defineProps({
        asset:{
            type: Object,
            required: true
        }
    })
</script>

<template>

<RouterLink class="asset-object" :to="{ name: 'asset-detalis', params: { id: asset.id}}">
    Detalis    
</RouterLink>

</template>

<style scoped>

</style>
