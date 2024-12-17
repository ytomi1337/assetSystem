<script >
    import assetService from '@/services/assetService';
    import { ref, onMounted} from 'vue'

    const assets = ref(null)

    onMounted(() =>{
        assetService.getAssets()
        .then((response)=>{
            assets.value = response.data
        }).catch((error)=>{
            console.log(error);
            console.log('wyzej error');
        })
    })

    console.log(assets);

</script>

<template>
  

  
</template>
