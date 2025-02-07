<script setup>
    import { ref, onMounted, computed } from 'vue';
    import assetService from '@/services/assetService';
    import { GStore } from '@/main';
    import router from '@/router/index';
    import { cloneDeep } from 'lodash';
    

    const props = defineProps({
        id:{
            required: true,
        }
    })

    const id = computed(()=> props.id)

    const asset = ref(null)
    const orginalAsset = ref(null)
    const isLeaveEdited = ref(false)
    const isEdit = ref(true)
    const isSave = ref(false)
    const isDelete = ref(true)
    const isDisabled = ref(true)

    

    onMounted(() => {
        assetService.getId(id.value).then((response) => {
        asset.value = response.data
        }).catch((error) => {
            console.log(error);
            router.push({
                name: '404Resource',
                params: {
                    resource: 'asset'
                }
            })
        })
    })

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
   
    const editAsset = () => {
        isSave.value = true
        isDelete.value = false
        isEdit.value = false
        isLeaveEdited.value = true
        isDisabled.value = !isDisabled.value
        orginalAsset.value = cloneDeep(asset.value)
        
    };

    const detectChanges=() =>{
        const changes = {}
            for (let key in asset.value) {
                if (asset.value[key] != orginalAsset.value[key]) {
                    changes[key] = asset.value[key];
                }
            }
        return changes;
    };
    const saveAsset = async () => {
       const changes = detectChanges()
       
       try{
        assetService.updateAsset(props.id, changes)
        GStore.editMessage = 'Urządzenie: ' + asset.value.it_num + ' Zostało prawidło zakutalizowane'
        setTimeout (() => {
            GStore.editMessage = ''
        },5000)

        isSave.value = false
        isDelete.value = true
        isEdit.value = true
        isLeaveEdited.value = false
        isDisabled.value = !isDisabled.value
       }catch(error){
        console.log("Unable to upddate asset", error);
       }

    }

    const leaveEdit = () => {

        if(JSON.stringify(asset.value) !== JSON.stringify(orginalAsset.value)){
            if(confirm('Masz wprowadzone dane czy napewno chcesz oposcic Edycje?')){
                asset.value = orginalAsset.value

                isSave.value = false
                isDelete.value = true
                isEdit.value = true
                isLeaveEdited.value = false
                isDisabled.value = !isDisabled.value
            }
            console.log('kontyuje');
        }else{
            isSave.value = false
            isDelete.value = true
            isEdit.value = true
            isLeaveEdited.value = false
            isDisabled.value = !isDisabled.value
        }   
    };
    
</script>

<template>
    <div v-if="asset">
        <div id="editMessage" v-if="GStore.editMessage"> {{ GStore.editMessage }}</div>
        <div  class="container mt-4">
            <div>
                <form class="formClass">

                <div class="leftSectionForm">
                    <h1 class="mb-4">{{ asset.name }}</h1>
                    <div class="formRecord">
                    <label for="name">Nr działu IT:</label>
                    <input type="text" name="it_num" :disabled="isDisabled" v-model="asset.it_num"/>
                    </div>

                    <div class="formRecord">
                    <label for="name">Nr Seryjny:</label>
                    <input type="text" name="serialnum" :disabled="isDisabled" v-model="asset.serialnum"/>
                    </div>

                    <div class="formRecord">
                    <label for="name">Aktualny Użytkownik:</label>
                    <input type="text" name="user_new" :disabled="isDisabled" v-model="asset.user_new"/>
                    </div>

                    <div class="formRecord">
                    <label for="name">Poprzedni Użytkownik:</label>
                    <input type="text" name="user_old" :disabled="isDisabled" v-model="asset.user_old"/>
                    </div>
                
                    <div class="formRecord">
                    <label for="name">Lokalizacja:</label>
                    <input type="text" name="localization" :disabled="isDisabled" v-model="asset.localization"/>
                    </div>

                    <div class="formRecord">
                    <label for="name">Kategoria:</label>
                    <input type="text" name="category" :disabled="isDisabled" v-model="asset.category"/>
                    </div>

                    <div class="formRecord">
                    <label for="name">Status:</label>
                    <input type="text" name="status" :disabled="isDisabled" v-model="asset.status"/>
                    </div>

                    <div class="formRecord">
                    <label for="comment">Uwagi:</label>
                    <textarea name="comment" id="comment" :disabled="isDisabled" placeholder="Uwagi"></textarea>
                    </div>
                </div>
                <div class="rightSectionForm">
                    <div class="formRecordImg"><img src="../assets/Hp-ProBook-650G8.png"></div>

                    <div class="buttonsSection mb-4">
                    <button v-if="isEdit" class="btnSectionNew editBtn" @click="editAsset">Edycja</button>
                    <button type="button" v-if="isLeaveEdited" class="btnSectionNew deleteBtn" @click="leaveEdit">Opuść Edycje</button>
                    <button type="button" v-if="isSave" class="btnSectionNew safeBtn"  @click="saveAsset">Zapisz</button>
                    <button type="button" v-if="isDelete" class="btnSectionNew deleteBtn" @click="deleteAsset">Usuń</button>
                    </div>

                    <div class="formRecord">
                    <label for="name">Data Wydania:</label>
                    <input type="text" name="recipt_date" :disabled="isDisabled" :placeholder="asset.recipt_date" />
                    </div>

                    <div class="formRecord">
                    <label for="name">Data Zwrotu:</label>
                    <input type="text" name="return_date" :disabled="isDisabled" :placeholder="asset.return_date" />
                    </div>

                    <div class="formRecord">
                    <label for="name">Data Gwarancji:</label>
                    <input type="text" name="warranty_date" :disabled="isDisabled" :placeholder="asset.warranty_date" />
                    </div>

                </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style>
#editMessage{
     animation-name: yellowfade;
        text-align: center;
        animation-duration: 7s;
}
.formRecordImg{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.formClass{
    display: flex;
    justify-content: space-around;
}
.leftSectionForm{
    width: 40%;
}
.rightSectionForm{
    width: 40%;
}
    
    .rightSection{
        display: flex;
        flex-direction: column;
        align-items: end;
    }
    .buttonsSection{
        width: 100%;
        display: flex;
        justify-content: space-around;
    }
    .btnSectionNew{
        padding: 5px 0px;
        border: solid 1px rgba(214, 30, 30, 0.781);
        width: 30%;
        border-radius: 5px;
        transition: 0.3s;
        color: #fff;
    }
    .btnSectionNew.deleteBtn{
        background-color: #eb1414d7;
    }
    .btnSectionNew.safeBtn{
        background-color: #71cc5eda;
    }
    .btnSectionNew.editBtn{
        background-color: rgb(62, 157, 212);
    }

</style>
