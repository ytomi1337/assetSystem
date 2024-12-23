<script setup>
    import { ref, onMounted } from 'vue';
    import assetService from '@/services/assetService';

    const props = defineProps({
        id:{
            required: true,
        }
    })

    const asset = ref(null)

    onMounted(() => {
        assetService.getId(props.id)
        .then((response) => {
        asset.value = response.data
        }).catch((error) => {
            console.log(error);
        })
    })

    console.log(asset);
    console.log('new assets');
</script>

<template>
    <div v-if="asset">
        <div  class="container">
            <form>
                <h1>{{ asset.name }}</h1>
                <img src="../assets/Hp-ProBook-650G8.png">
                <h1>{{ asset.it_num }}</h1>

            </form>
        </div>
    </div>
</template>
