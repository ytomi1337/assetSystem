<script setup>

    defineProps({
        resource: {
            type: String,
            default: 'asset',
            required: true
        }
    })


</script>

<template >
    <div class="container d-flex flex-column align-items-center" ><h1>Oops!</h1>
    <h3>Strona której szukasz nie istnieje</h3>
    <RouterLink :to="{ name: 'asset-list'}"> -> Strona Główna</RouterLink></div>
    
</template>