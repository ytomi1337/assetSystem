<script setup>
    import { ref, onMounted, computed } from 'vue';
    import assetService from '@/services/assetService';
    import { GStore } from '@/main';
    import router from '@/router/index';
    import { cloneDeep } from 'lodash';
    import AutoComplete from '@/components/AutoComplete.vue';

const emits = defineEmits(['showCreate', 'update-name'])
    const props = defineProps({
        id:{
            required: true,
        },
    })
const id = computed(()=> props.id)
const phone = ref([])

const orginalAsset = ref(null)

const categories = ref([])
const localizations = ref([])
const statuses = ref([])

const isLeaveEdited = ref(false)
const isEdit = ref(true)
const isSave = ref(false)
const isDelete = ref(true)
const isDisabled = ref(true)

onMounted(() => {
    assetService.getStatus().then((response)=>{
        statuses.value = response.data
        }).catch((error) =>{
            console.log(error);
        }) 
    assetService.getPhoneId(id.value)
    .then((response) =>{
        phone.value = response.data
        console.log(phone.value);
    }).catch((error)=>{
        console.log(error);
    })
})
   
</script>

<template>
    <div v-if="phone">
        <div id="editMessage" v-if="GStore.editMessage"> {{ GStore.editMessage }}</div>
        <div  class="container mt-4">
            <div>
                <form class="formClass">

                <div class="leftSectionForm">
                    <h1 class="mb-4">{{ phone.name }}</h1>

                    <div class="formRecord">
                    <label for="name">IMEI:</label>
                    <input type="text" name="serialnum" :disabled="isDisabled" v-model="phone.imei"/>
                    </div>

                    <div class="formRecord">
                        <label for="user">Użytkownik:</label>
                        <AutoComplete 
                        @update-name="updateUser" 
                        v-model="phone.user"
                        v-model:isDisabled="isDisabled"
                        
                        name="user">
                        </AutoComplete>
                    </div>

                    <div class="formRecord">
                    <label for="name">Poprzedni Użytkownik:</label>
                    <input type="text" name="user_old" :disabled="isDisabled" v-model="phone.name"/>
                    </div>
                
                    <div class="formRecord">
                    <label for="status">Status:</label>
                    <select :disabled="isDisabled" name="status" v-model="phone.name">
                        <option v-for="status in statuses" > {{ status.name }}</option>
                    </select>
                    </div>
                    <div class="formRecord">
                    <label for="name">Data Wydania:</label>
                    <input type="text" name="recipt_date" :disabled="isDisabled" :placeholder="phone.name" />
                    </div>

                    <div class="formRecord">
                    <label for="name">Data Zwrotu:</label>
                    <input type="text" name="return_date" :disabled="isDisabled" :placeholder="phone.name" />
                    </div>
                    
                    <div class="formRecord">
                    <label for="comment">Uwagi:</label>
                    <textarea name="comment" id="comment" :disabled="isDisabled" placeholder="Uwagi"></textarea>
                    </div>
                </div>
                <div class="rightSectionForm">
                    
                    <div class="formRecordImg"><img src="../assets/A52.jpg" width="400px"></div>

                    <div class="formRecord">
                    <label for="comment">Uwagi:</label>
                    <textarea name="comment" id="comment" :disabled="isDisabled" placeholder="Uwagi"></textarea>
                    </div>
                    
                    <div class="buttonsSection mt-4">
                        <button v-if="isEdit" class="btnSectionNew editBtn" @click="editAsset">Edycja</button>
                        <button type="button" v-if="isLeaveEdited" class="btnSectionNew deleteBtn" @click="leaveEdit">Opuść Edycje</button>
                        <button type="button" v-if="isSave" class="btnSectionNew safeBtn"  @click="saveAsset">Zapisz</button>
                        <button type="button" v-if="isDelete" class="btnSectionNew deleteBtn" @click="deleteAsset">Usuń</button>
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
