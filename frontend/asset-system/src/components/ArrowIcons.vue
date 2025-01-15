<script>

    export default{
        props: {
            column: String,
            value: String,
            current: String
        }
    }
</script>

<template>
    {{ column == current ?(value == 'desc'? '&uarr;': '&darr;'): '&uarr;&darr;' }}

</template>

<style >

</style>
