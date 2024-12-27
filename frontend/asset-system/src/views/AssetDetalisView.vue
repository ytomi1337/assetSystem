<script setup>
    import { ref, onMounted } from 'vue';
    import assetService from '@/services/assetService';
    

    const props = defineProps({
        id:{
            required: true,
        }
    })

    const asset = ref(null)
    const isDisabled = ref(true)

    onMounted(() => {
        assetService.getId(props.id)
        .then((response) => {
        asset.value = response.data
        }).catch((error) => {
            console.log(error);
        })
    })

    const setEnabled = () => {
        isDisabled.value = false;
    };

    console.log(asset);
    console.log(asset.user_old);
    console.log('new assets');





</script>

<template>
    <div v-if="asset">
        <div  class="container assetContainer">
                <form>
                    <h1 class="mb-4">{{ asset.name }}</h1>
                    <p>
                    <label for="itNum">Nr działu IT: </label>
                    <input type="text" name="itNum" class="ms-3" :disabled="isDisabled" :placeholder="asset.name"> 
                    </p>

                    <p>
                    <label for="serialNum">Nr Seryjny:</label>
                    <input type="text" name="serialNum" class="ms-3" disabled :placeholder="asset.serialnum"> 
                    </p>

                    <p>
                    <label for="userNew">Użytkownik:</label>
                    <input type="text" name="userNew" class="ms-3" disabled :placeholder="asset.user_new"> 
                    </p>

                    <p>
                    <label for="userOld">Uzytkownik poprzedni: </label>
                    <input v-if="asset.user_old != undefined" type="text" name="userOld" class="ms-3" disabled :placeholder="asset.user_old"> 
                    <input v-else type="text" name="userOld" class="ms-3" disabled placeholder="Brak Uzytkownika"> 
                    </p>

                    <p>
                    <label for="localization">Lokalizacja: </label>
                    <input type="text" name="localization" class="ms-3" disabled :placeholder="asset.localization"> 
                    </p>

                    <button type="button" @click="setEnabled()">Edytuj dane</button>
                </form>
            <img src="../assets/Hp-ProBook-650G8.png">
        </div>
    </div>
</template>

<style>
    .assetContainer{
        margin-top: 2%;
        display: flex;
        justify-content: space-around;
    }

</style>
