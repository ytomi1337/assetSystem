<script setup>
    import { ref, onMounted } from 'vue';
    import assetService from '@/services/assetService';
    import { GStore } from '@/main';
    import router from '@/router/index';
    

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

    const deleteAsset =() =>{

        const deletedAsset = asset.name
        const checkConfirm = confirm(`Czy jestes pewien że chcesz usunąć TRWALE urządzenie ${deletedAsset} ta operacja jest nieodwracalna!!!`)
        
        if(checkConfirm){
            assetService.deleteAsset(props.id)
        .then(()=>{
            GStore.deleteMessage = 'Urządzenie ' + deletedAsset + ' Zostało usunięte'
            setTimeout (() => {
              GStore.deleteMessage = ''
            },5000)
            router.push({name: 'asset-list'})
            console.log('Success');
        }).catch((error)=>{
            console.log('error');
        })
        }
    }

    

    
    





</script>

<template>
    <div v-if="asset">
        <div  class="container assetContainer">
            <div>
                <form>
                    <h1 class="mb-4">{{ asset.name }}</h1>
                    <p>
                    <label for="itNum">Nr działu IT: </label>
                    <input type="text" name="itNum" class="ms-3" :disabled="isDisabled" :placeholder="asset.it_num" v-model="headerTxt"> 
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
            </div>

            <div class="rightSection">
                <button class="deleteBtn" @click="deleteAsset">Usuń</button>
                <img src="../assets/Hp-ProBook-650G8.png">
            </div>
        </div>
    </div>
</template>

<style>
    .assetContainer{
        margin-top: 2%;
        display: flex;
        justify-content: space-around;
    }
    .rightSection{
        display: flex;
        flex-direction: column;
        align-items: end;
    }
    .deleteBtn{
        padding: 5px 0px;
        margin-right: 12%;
        border: solid 1px rgba(180, 179, 179, 0.781);
        width: 20%;
        border-radius: 5px;
        transition: 0.3s;
        background-color: #eb1414d7;
        color: #fff;
    }
    .deleteBtn:hover{
  background-color: #8a1515e6
}

</style>
