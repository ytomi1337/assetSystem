<script setup>
import { ref, defineEmits, defineProps, watch , onMounted, computed, watchEffect} from 'vue';
import assetService from '@/services/assetService';
import AutoComplete from '../AutoComplete.vue';
const emits = defineEmits(['showCreate', 'update-name'])

const users = ref({
  name: ''
});

const filters = ref({})

const userFromAssets = ref(null)

const setUserFrom = (receivedName) => {
  users.value.name = receivedName;
  console.log('nowy uzytkownik', users.value);
}


  watchEffect(() =>{
    if(users.value.name == ''){
      console.log('test');
    }else{
      console.log(users.value);
      assetService.getUserAssets(users.value.name)
                .then((response)=>{
                  userFromAssets.value = response.data
                  console.log(userFromAssets.value);
                }).catch((error)=>{
                    console.log(error);
                    console.log('wyzej error');
                }) 
    }
    
  })




</script>

<template>
 <div class="box-overlay">
    <div class="box">
        <h3>Przekazanie między użytkownikami</h3>
        <div class="navUserDiv">
          <AutoComplete @update-name="setUserFrom" > </AutoComplete>
          <AutoComplete > </AutoComplete>
        </div>
       
        <hr>

        <div class="tableContainer">
          <div class="tableBox leftBox">
            <table id="mainTable" class="mainTable">
              <tr>
                <th><input type="checkbox"></th>
                <th>Nr IT</th>
                <th>Nazwa</th>
                <th>Nr Serii</th>
                <th>Kategoria</th>
              </tr>
              <tr v-for="asset in userFromAssets">
                <td><input type="checkbox"></td>
                <td>{{ asset.it_num }}</td>
                <td>{{ asset.name }}</td>
                <td>{{ asset.serialnum }}</td>
                <td>{{ asset.category }}</td>
              </tr>
            </table>
          </div>
          <div class="midBox">
            <button class="userToUserBtn">></button>
            <button class="userToUserBtn">>></button>
            <button class="userToUserBtn"><</button>
            <button class="userToUserBtn"><<</button>
          </div>
          <div class="tableBox rightBox">
            <table id="mainTable" class="mainTable">
              <tr>
                <th><input type="checkbox"></th>
                <th>Nr IT</th>
                <th>Nazwa</th>
                <th>Nr Serii</th>
                <th>Kategoria</th>
              </tr>
            </table>
          </div>
        </div>
        </div>
        </div>
</template>

<style scoped> 
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
  text-align: center;
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 900px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.navUserDiv{
  display: flex;
  gap: 25%;
  margin-top: 5%;
  padding: 2px 0;
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
</style>