<script setup>
    import { ref, onMounted, computed } from 'vue';
    import assetService from '@/services/assetService';
    import { GStore } from '@/main';
    import router from '@/router/index';
    import { cloneDeep } from 'lodash';
    import AutoComplete from '@/components/AutoComplete.vue';
    import { utilsStore } from '@/stores/mainStorege';

    const useUtilsStore = utilsStore()

    const emits = defineEmits(['showCreate', 'update-name'])

    const props = defineProps({
        id:{
            required: true,
        },
    })

    const id = computed(()=> props.id)

    const asset = ref(null)
    const orginalAsset = ref(null)

    const isLeaveEdited = ref(false)
    const isEdit = ref(true)
    const isSave = ref(false)
    const isDelete = ref(true)
    const isDisabled = ref(true)

    const useDateField = (field) => {
        return computed({
            get() {
            return asset.value[field] ? asset.value[field].split("T")[0] : "";
            },
            set(value) {
            asset.value[field] = value;
            },
        });
        };

    const recipt_date = useDateField("recipt_date");
    const return_date = useDateField("return_date");
    const warranty_date = useDateField("warranty_date");

    onMounted(() => {
       useUtilsStore.loadAllData()

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
    const updateUser = (receivedName) => {
        if(receivedName == ''){
            return false
        }
        asset.value.user_new = receivedName

        console.log('orginal:', orginalAsset.value.user_new);
        console.log('New:', asset.value.user_new);
        }

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
   
    const toggleEditMode = (isEditing) => {
        isSave.value = isEditing;
        isDelete.value = !isEditing;
        isEdit.value = !isEditing;
        isLeaveEdited.value = isEditing;
        isDisabled.value = !isEditing;

        if (isEditing) {
            orginalAsset.value = cloneDeep(asset.value);
        } else {
            asset.value = cloneDeep(orginalAsset.value);
        }
    };

    const editAsset = () => toggleEditMode(true);

    const leaveEdit = () => {
        if (JSON.stringify(asset.value) !== JSON.stringify(orginalAsset.value)) {
            if (confirm('Masz wprowadzone dane, czy na pewno chcesz opuścić edycję?')) {
                toggleEditMode(false);
            }
        } else {
            toggleEditMode(false);
        }
    };

    const detectChanges=() =>{ 
        const changes = {}
            for (let key in asset.value) {
                if (asset.value[key] != orginalAsset.value[key]) {
                    changes[key] = asset.value[key];
                }
            }

            if(changes.user_new != undefined){
                changes.user_old = orginalAsset.value.user_new
            }

        return changes;
    };
    const saveAsset = async () => {
       const changes = detectChanges()

       
       try{
        const response = await assetService.updateAsset(props.id, changes)
        asset.value = response.data.asset

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
        console.error("Unable to upddate asset", error);
       }

    }
    
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
                        <label for="user">Użytkownik:</label>
                        <AutoComplete 
                        @update-name="updateUser" 
                        v-model="asset.user_new"
                        v-model:isDisabled="isDisabled"
                        name="user">
                        </AutoComplete>
                    </div>

                    <div class="formRecord">
                    <label for="name">Poprzedni Użytkownik:</label>
                    <input type="text" name="user_old" disabled v-model="asset.user_old"/>
                    </div>
                
                    <div class="formRecord">
                    <label for="localization">Lokalizsacja:</label>
                    <select :disabled="isDisabled" name="localization" v-model="asset.localization">
                        <option v-for="localization in useUtilsStore.localizations" > {{ localization }}</option>
                    </select>
                    </div>

                    <div class="formRecord">
                    <label for="category">Kategoria:</label>
                    <select :disabled="isDisabled" name="category" v-model="asset.category">
                        <option v-for="category in useUtilsStore.categories" > {{ category }}</option>
                    </select>
                    </div>

                    <div class="formRecord">
                    <label for="status">Status:</label>
                    <select :disabled="isDisabled" name="status" v-model="asset.status">
                        <option v-for="status in useUtilsStore.statuses" > {{ status }}</option>
                    </select>
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
                    <input type="date" name="recipt_date" 
                    :disabled="isDisabled" 
                    v-model="recipt_date" 
                    />
                    </div>

                    <div class="formRecord">
                    <label for="return_date">Data Zwrotu:</label>
                    <input type="date" name="return_date" 
                    :disabled="isDisabled" 
                    v-model="return_date" 
                    />
                    </div>

                    <div class="formRecord">
                    <label for="warranty_date">Data Gwarancji:</label>
                    <input type="date" name="warranty_date" 
                    :disabled="isDisabled" 
                    v-model="warranty_date" 
                    />
                    </div>

                </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style>
@keyframes yellowfade{
        from{
            background: rgb(144, 238, 144);
        }
        to{
            background: rgba(144, 238, 144, 0.185);
        }
    }
#editMessage{
     animation-name: yellowfade;
        text-align: center;
        animation-duration: 7s;
}

.autoCompleteClass{
    z-index: 0;
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
