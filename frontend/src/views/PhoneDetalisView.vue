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

    const phone = ref([])
    const orginalPhone = ref(null)

    const isLeaveEdited = ref(false)
    const isEdit = ref(true)
    const isSave = ref(false)
    const isDelete = ref(true)
    const isDisabled = ref(true)

    const useDateField = (field) => {
    return computed({
        get() {
        return phone.value[field] ? phone.value[field].split("T")[0] : "";
        },
        set(value) {
        phone.value[field] = value;
        },
    });
    };

    const recipt_date = useDateField("recipt_date");
    const return_date = useDateField("return_date");

    onMounted(() => {
        useUtilsStore.loadAllData()

        assetService.getPhoneId(id.value)
        .then((response) =>{
            phone.value = response.data
        }).catch((error)=>{
            console.log(error);
        })
    })
    const updateUser = (receivedName) => {
        if(receivedName == ''){
            return false
        }
        phone.value.user = receivedName
        }

    const deleteAsset =() =>{
        if(confirm(`Czy jestes pewien że chcesz usunąć TRWALE urządzenie ${phone.value.name} ta operacja jest nieodwracalna!!!`)){
            assetService.deletePhone(props.id)
            .then(()=>{
                GStore.deleteMessage = 'Urządzenie ' + phone.value.name + ' Zostało usunięte'
                setTimeout (() => {
                GStore.deleteMessage = ''
                },5000)
                router.push({name: 'phone-list'})
            }).catch((error)=>{
                console.log('error:', error);
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
            orginalPhone.value = cloneDeep(phone.value);
        } else {
            phone.value = cloneDeep(orginalPhone.value);
        }
    };
    const editAsset = () => toggleEditMode(true);

    const leaveEdit = () => {
        if (JSON.stringify(phone.value) !== JSON.stringify(orginalPhone.value)) {
            if (confirm('Masz wprowadzone dane, czy na pewno chcesz opuścić edycję?')) {
                toggleEditMode(false);
            }
        } else {
            toggleEditMode(false);
        }
    };

    const detectChanges=() =>{ 
        const changes = {}
            for (let key in phone.value) {
                if (phone.value[key] != orginalPhone.value[key]) {
                    changes[key] = phone.value[key];
                }
            }
        if(changes.user != undefined){
        changes.user_old = orginalPhone.value.user
            }      
        return changes;
    };

    const saveAsset = async () => {
        const changes = detectChanges()
        console.log(changes);
        
        try{
        const response = await assetService.updatePhone(props.id, changes);
        phone.value = response.data.phone
        GStore.editMessage = 'Urządzenie: ' + phone.value.name + ' Zostało prawidło zakutalizowane'
        setTimeout (() => {
            GStore.editMessage = ''
        },5000)

        isSave.value = false
        isDelete.value = true
        isEdit.value = true
        isLeaveEdited.value = false
        isDisabled.value = !isDisabled.value

        }catch(error){
        console.log("Unable to upddate phone", error);
        }

    }

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
                        <label for="user">Użytkownik:</label>
                        <AutoComplete 
                        @update-name="updateUser" 
                        v-model="phone.user"
                        v-model:isDisabled="isDisabled"
                        
                        name="user">
                        </AutoComplete>
                    </div>

                    <div class="formRecord">
                        <label for="user_old">Poprzedni Użytkownik:</label>
                        <input type="text" name="user_old" disabled v-model="phone.user_old"/>
                    </div>

                    <div class="formRecord">
                        <label for="status">Status:</label>
                        <select :disabled="isDisabled" name="status" v-model="phone.status">
                            <option v-for="status in useUtilsStore.statuses" > {{ status }}</option>
                        </select>
                    </div>
                    <div v-if="phone.category == 'Karta Sim'">
                        <div class="formRecord">
                            <label for="nr_tel">Nr Tel:</label>
                            <input type="text" name="nr_tel" :disabled="isDisabled" v-model="phone.nr_tel"/>
                        </div>

                        <div class="formRecord">
                            <label for="pin">Pin:</label>
                            <input type="text" name="pin" :disabled="isDisabled" v-model="phone.pin"/>
                        </div>

                        <div class="formRecord">
                            <label for="puk">PUK:</label>
                            <input type="text" name="puk" :disabled="isDisabled" v-model="phone.puk"/>
                        </div>
                    </div>

                    <div v-else>
                        <div class="formRecord">
                            <label for="imei">IMEI:</label>
                            <input type="text" name="imei" :disabled="isDisabled" v-model="phone.imei"/>
                        </div>
                    </div>
                    <div class="formRecord">
                        <label for="recipt_date">Data Wydania:</label>
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
                        <label for="note">Uwagi:</label>
                        <textarea name="note" id="note" 
                        :disabled="isDisabled" 
                        v-model="phone.note" 
                        placeholder="Wpisz uwagi: ...."></textarea>
                    </div>
                </div>
                <div class="rightSectionForm">
                    
                    <div class="formRecordImg"><img src="../assets/A52.jpg" width="400px"></div>
                    
                    <div class="buttonsSection mt-4">
                        <button v-if="isEdit" class="btnSectionNew editBtn" @click="toggleEditMode(true)">Edycja</button>
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
        align-self: center;
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
