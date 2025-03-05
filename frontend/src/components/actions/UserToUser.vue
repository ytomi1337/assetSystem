<script setup>
import { ref, defineEmits, defineProps, watch , onMounted, computed, watchEffect} from 'vue';
import { GStore } from '@/main';
import assetService from '@/services/assetService';
import AutoComplete from '../AutoComplete.vue';
const emits = defineEmits(['showCreate', 'update-name'])

const userSending = ref('');
const userReciving = ref('');

const assets = ref([])
const selectedAssets = ref([])

const recivedAssets = ref([])
const recivedSelectedAssets = ref ([])

const errors = ref([])

const isDisabled = computed (()=> userReciving.value == '' || userReciving.value == '')

const setUserFrom = (receivedName) => {
  userSending.value = receivedName;
}

const setUserTo = (receivedName) => {
  userReciving.value = receivedName;
}

  watchEffect(() =>{
    selectedAssets.value = []
    recivedSelectedAssets.value = []
    recivedAssets.value = []
      assetService.getUserAssets(userSending.value)
                .then((response)=>{
                  assets.value = response.data
                }).catch((error)=>{
                    console.log(error);
                    console.log('wyzej error');
                }) 
    
  })

  const allSelected = computed(() => 
  selectedAssets.value.length === assets.value.length && assets.value.length > 0
);

const allSelectedRecived = computed(() => 
recivedSelectedAssets.value.length === recivedAssets.value.length && recivedAssets.value.length > 0
);

const toggleAll = (event) => {
  if (event.target.checked) {
    selectedAssets.value = [...assets.value];
  } else {
    selectedAssets.value = []; 
  }
};

const toggleAllRecived = (event) => {
  if (event.target.checked) {
    recivedSelectedAssets.value = [...recivedAssets.value];
  } else {
    recivedSelectedAssets.value = []; 
  }
};

const transferAssets = () => {
  recivedAssets.value.push(...selectedAssets.value)

  assets.value = assets.value.filter(asset => 
    !selectedAssets.value.some(selected => selected.id == asset.id)
  )
  
  selectedAssets.value = []
}

const transferBack = () => {
  assets.value.push(...recivedSelectedAssets.value)
  
  recivedAssets.value = recivedAssets.value.filter(rAsset => 
    !recivedSelectedAssets.value.some(rSelected => rSelected.id == rAsset.id)
  )

  recivedSelectedAssets.value = []
}
const leaveComponent = () => {
  emits("showCreate");
};

const applyFunction = () => {

  if(userReciving.value != '' && userSending.value != ''){
    if(userReciving.value == userSending.value){
      errors.value.push('Użytkownik odbierający i wysyłający nie mogą być tacy sami !');
    setTimeout(() => {
      errors.value = []
    }, 5000)
    }else{
        assetService.updateAssetfromUser(recivedAssets.value, userReciving.value)
      .then((response)=>{
        console.log(response.data.message);

        GStore.flashMessage =
        "Operacja Aktualizacji przebiegła pomyślnie!";
      setTimeout(() => {
        GStore.flashMessage = "";
      }, 5000);

        emits("showCreate");
      }).catch((error) =>{
        console.log(error);
      })
    }
  }else{
    errors.value.push('Pole użytkownika odbierającego i wysyłającego musi byc wypełnione !');
    setTimeout(() => {
      errors.value = []
    }, 5000)
    
  }
}
</script>

<template>
 <div class="box-overlay">
    <div class="box">
        <h3>Przekazanie między użytkownikami</h3>
        <p v-if="errors.length != 0">{{ errors[0] }}</p>
        <div class="navUserDiv">
          <div class="item">
            <label name="userFrom"><b>Użytkownik od:</b></label>
          <AutoComplete @update-name="setUserFrom" name="userFrom" > </AutoComplete>
          </div>
          <div class="item">
            <label name="userTo"><b>Użytkownik do:</b></label>
            <AutoComplete @update-name="setUserTo" name="userTo"> </AutoComplete>
          </div>
        </div>
       
        <hr>

        <div class="tableContainer">
          <div class="tableBox leftBox">
            <table id="mainTable" class="mainTable">
              <tr>
                <th><input type="checkbox" @change="toggleAll" :checked="allSelected"></th>
                <th>Nr IT</th>
                <th>Nazwa</th>
                <th>Nr Serii</th>
                <th>Kategoria</th>
              </tr>
              <tr v-for="asset in assets" :key="asset.id">
                <td>
                  <input type="checkbox" 
                  :value="asset" 
                  v-model="selectedAssets">
                </td>
                <td>{{ asset.it_num }}</td>
                <td>{{ asset.name }}</td>
                <td>{{ asset.serialnum }}</td>
                <td>{{ asset.category }}</td>
              </tr>
              
            </table>
          </div>
          <div class="midBox">
            <button class="userToUserBtn" @click="transferAssets" :disabled="isDisabled">></button>
            <button class="userToUserBtn" @click="transferBack" :disabled="isDisabled"><</button>
          </div>
          <div class="tableBox rightBox">
            <table id="mainTable" class="mainTable">
              <tr>
                <th><input type="checkbox" @change="toggleAllRecived" :checked="allSelectedRecived"></th>
                <th>Nr IT</th>
                <th>Nazwa</th>
                <th>Nr Serii</th>
                <th>Kategoria</th>
              </tr>
              <tr v-for="rAsset in recivedAssets" :key="rAsset.id">
                <td>
                  <input type="checkbox" 
                  :value="rAsset" 
                  v-model="recivedSelectedAssets">
                </td>
                <td>{{ rAsset.it_num }}</td>
                <td>{{ rAsset.name }}</td>
                <td>{{ rAsset.serialnum }}</td>
                <td>{{ rAsset.category }}</td>
              </tr>
    
            </table>
          </div>
        </div>
        
        <div class="btnSection">
          <button class="applyBtn" @click="applyFunction">Zastosuj</button>
          <button type="button" class="closeBtn" @click="leaveComponent">Zamknij</button>
        </div>

        </div>
        </div>
</template>

<style scoped> 

p{
  font-weight: 500;
  color: red;
}

input:hover{
  cursor: pointer;
}
.box-overlay {
  transition: 0.5s;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  display: flex;
  flex-direction: column;
  text-align: center;
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 900px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.navUserDiv{
  display: flex;
  justify-content: space-between;
  gap: 10%;
  margin-top: 5%;
  padding: 2px 0;
  
}
.item{
  width: 100%;
  text-align: left;
}

.tableContainer{
  display: flex;
  justify-content: space-between;
}

.tableBox{
  height: 300px;
  width: 45%;
  border: 1px solid #a8a6a6;
  border-radius: 10px;
}

.midBox{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 10%;
}

.mainTable{
        width: 100%;
        margin-top: 1%;
    }
    th{
        text-align: center;
        padding: 5px;
        border-bottom: 1px solid #e6e5e5
    }
    td{
        text-align: center;
        padding-bottom: 5px;
        font-size: 0.8rem;
    }

.userToUserBtn{
  border: 1px solid rgba(180, 179, 179, 0.781);
  background-color: transparent;
  border-radius: 8px;
  text-align: center;
  width: 50%;
  transition: 0.3s;
}
.btnSection{
  display: flex;
  justify-content: end;
  gap: 2%;
  margin-top: 2%;

  button{
    border: 1px solid rgba(180, 179, 179, 0.781);
    padding: 5px 10px;
    border-radius: 8px;
    text-align: center;
    transition: 0.3s;
  }

  .applyBtn{
    background-color: #7af14b;
  }

  .closeBtn{
    background-color: #eb1414d7;
    color: white;
  }
}

</style>