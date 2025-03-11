<script setup>

    defineProps({
        phone:{
            type: Object,
            required: true
        }
    })
</script>

<template>

<RouterLink class="asset-object" :to="{ name: 'phone-detalis', params: { id: phone.id}}">
    Więcej
</RouterLink>

</template>

