<script setup>
import assetService from '@/services/assetService';
import { GStore } from '@/main';
import { ref, onMounted, defineEmits, computed } from 'vue';
import AutoComplete from './AutoComplete.vue'
import { utilsStore } from '@/stores/mainStorege';

const useUtilsStore = utilsStore()

const emits = defineEmits(['showCreate', 'update-name'])

const defaultAsset = ref({
  name: '',
  category: '',
  user: '',
  nr_tel: '',
  localization:'' ,
  imei:'' ,
  puk: '',
  pin: '',
  status: '',
  recipt_date: ''
})

const newPhone = ref({ ...defaultAsset.value })
const userChoice = computed (() => newPhone.category)
const isError = ref("")

onMounted(() => {
  useUtilsStore.loadAllData()
})

const updateUser = (receivedName) => {
  newPhone.value.user = receivedName;
}

const crtAssetFun = (event) => {
  event.preventDefault();
  assetService
    .createPhone(newPhone.value)
    .then(() => {
      GStore.flashMessage =
        "Urządzenie " + newPhone.value.name + " zostało dodane prawidłowo";
        GStore.wasChange = true
      setTimeout(() => {
        GStore.flashMessage = "",
        GStore.wasChange = false;
      }, 5000);
      console.log("Obiekt dodany poprawnie");
      emits("showCreate");
    })
    .catch((error) => {
      console.log(error);
    });
};

const leaveComponent = () => {
  if (JSON.stringify(newPhone.value) !== JSON.stringify(defaultAsset.value)) {
    if (confirm("Masz wprowadzone dane, czy na pewno chcesz zamknąć?")) {
      emits("showCreate");
    }
  } else {
    emits("showCreate");
  }
};

</script>

<template>
<div class="box-overlay">
  <div class="box">
    <h2 class="mb-4">Dodaj Telefon / Karte:</h2>
    <form @submit="crtAssetFun">

      <div class="errorSection">
      <p v-if="isError" >{{ isError.value }}</p>
      </div>

      <div class="formRecord">
      <label for="category">Kategoria:</label>
      <select v-model="newPhone.category" name="category" required>
          <option v-for="category in useUtilsStore.phoneCategories">
            {{ category }}
          </option>
      </select>
      </div>

      <div class="formRecord">
        <label for="user" required>Użytkownik:</label>
        <AutoComplete @update-name="updateUser" name="user"> </AutoComplete>
      </div>

      <hr>

      <div v-if="newPhone.category == 'Telefon'">
        <div class="formRecord">
      <label for="name">Nazwa:</label>
      <input type="text" v-model="newPhone.name" required/>
      </div>

        <div class="formRecord">
          <label for="serialnum">IMEI:</label>
          <input type="text" v-model="newPhone.imei" required/>
        </div>

        <div class="formRecord">
      <label for="status">Status:</label>
      <select v-model="newPhone.status" name="status">
          <option v-for="status in useUtilsStore.statuses" :key="status.id" :value="status">
            {{ status }}
          </option>
      </select>
      </div>

      <div class="formRecord">
      <label for="recpit_date">Data Wydania:</label>
      <input type="date" v-model="newPhone.recipt_date"/>
      </div>

      </div>
      <div v-else-if="newPhone.category == 'Karta Sim'">
        <div class="formRecord">
          <label for="serialnum">Nr Tel:</label>
          <input type="text" v-model="newPhone.nr_tel" required/>
        </div>

        <div class="formRecord">
        <label for="name">PIN:</label>
        <input type="text" v-model="newPhone.pin" />
        </div>

        <div class="formRecord">
        <label for="name">PUK:</label>
        <input type="text" v-model="newPhone.puk" />
        </div>

        <div class="formRecord">
        <label for="status">Status:</label>
        <select v-model="newPhone.status" name="status">
            <option v-for="status in useUtilsStore.statuses" :key="status.id" :value="status">
              {{ status }}
            </option>
        </select>
        </div>
        
        <div class="formRecord">
        <label for="recpit_date">Data Wydania:</label>
        <input type="date" v-model="newPhone.recipt_date"/>
        </div>
      </div>

      <div class="butonnSection">
        <button type="submit" class="formBtn">Utworz</button>
        <button type="button" class="formBtn" @click="leaveComponent">Zamknij</button>
      </div>
    </form>
    
  </div>
</div>

   
</template>

<style>
select{
  padding: 3px ;
}

select:hover{
  cursor: pointer;
}

input{
  padding: 3px;
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
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.formRecord{
  display: flex;
  flex-direction: column;
  margin-top: 10px;

  label{
    font-weight: 500;
  }

  img{
    max-width: 448px;
  }
}

.formBtn{
    margin-top: 8%;
    padding: 5px 15px;
    border: solid 1px rgba(180, 179, 179, 0.781);
    margin-right: 2%;
    border-radius: 5px;
    transition: 0.3s;
    background-color: #eb1414d7;
    color: #fff;
}

.formBtn:hover{
  background-color: #8a1515e6
}
.formBtn:first-child{
    background-color: #71cc5eda;
}
.formBtn:first-child:hover{
    background-color: #398d23c9;
    color: #fff;
}

.errorSection{
  text-align: center;
  margin: 0%;
  color: #fff;
  background-color: #eb1414d7;
  border-radius: 5px;
}
</style>