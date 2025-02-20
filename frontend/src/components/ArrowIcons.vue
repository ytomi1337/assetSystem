<script setup>

import { defineProps } from 'vue'

const props = defineProps({
    column: String,
    value: String,
    current: String 
})

</script>

<template>
    {{ column == current ?(value == 'desc'? '&uarr;': '&darr;'): '&uarr;&darr;' }}

</template>

<style >

</style>
