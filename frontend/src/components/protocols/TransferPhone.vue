<script setup>
import { ref, defineEmits, computed, watchEffect} from 'vue';
import { GStore } from '@/main';
import assetService from '@/services/assetService';
import AutoComplete from '../AutoComplete.vue';
const emits = defineEmits(['disableWindow', 'update-name'])

const users = ref({ sending: 'IT Magazyn', receiving: '' });
const pagination = ref({ page: 1, limit: 9 });
const data = ref({ phones: [], selected: [] });
const receivedData = ref({ phones: [], selected: [] });
const total = ref({ count: null, pages: null });
const errors = ref([]);

const isDisabled = computed (()=> !users.value.receiving)

const setUser = (type, name) => {
  users.value[type] = name
  pagination.value.page = 1
}

  watchEffect(() =>{
    if(!users.value.sending) return;

    data.value.selected = []
    receivedData.value.selected = []
    receivedData.value.phones = []

      assetService.getUserPhones(pagination.value.page, pagination.value.limit, users.value.sending)
                .then((response)=>{
                  data.value.phones = response.data.phones
                  total.value.count = response.data.count
                  total.value.pages = Math.ceil(total.value.count / pagination.value.limit);
                }).catch((error)=>{
                    console.error('Bład Przy pobieraniu danych wchodzacych: ', error)
                }) 
    
  })

  const changePage = (direction) => {
    pagination.value.page = Math.max(1, Math.min(total.value.pages, pagination.value.page + direction));
  };

  const allSelected = (data) => data.selected.length === data.phones.length && data.phones.length > 0;

  const toggleAll = (data, event) => {
    data.selected = event.target.checked ? [...data.phones] : []
  };

  const transferAssets = (from, to) => {
    to.phones.push(...from.selected);
    from.phones = from.phones.filter(phone => !from.selected.some(selected => selected.id === phone.id));
    from.selected = [];
  }

    const applyFunction = () => {
      const { sending, receiving } = users.value;
      if (!sending || !receiving) return showError('Pole użytkownika odbierającego i wysyłającego musi być wypełnione!');
      if (sending === receiving) return showError('Użytkownik odbierający i wysyłający nie mogą być tacy sami!');
      if (receivedData.value.phones.length === 0) return showError('Nie został wybrany żaden sprzęt do transferu!');

      console.log(receivedData.value.phones);

      assetService.updatePhonesfromUser(receivedData.value.phones, receiving)
        .then(() => {
          GStore.flashMessage = 'Operacja Aktualizacji przebiegła pomyślnie!';
          GStore.wasChange = true;
          setTimeout(() => (GStore.flashMessage = '', GStore.wasChange = false), 5000);
          emits('disableWindow');
        })
        .catch((error) => console.error('Błąd przy aktualizacji aktyw:', error));
      };
    
    const showError = (message) => {
    errors.value.push(message);
    setTimeout(() => (errors.value = []), 5000);
    };

    const leaveComponent = () => {
      emits("disableWindow");
  };
</script>

<template>
 <div class="box-overlay">
    <div class="box">
        <h3>Przekazanie Telefonu</h3>
        <p v-if="errors.length">{{ errors[0] }}</p>

        <div class="navUserDiv">
          <div class="item">
            <label><b>Użytkownik od:</b></label>
          <input type="text" v-model="users.sending" disabled>
          </div>
          <div class="item">
            <label><b>Użytkownik do:</b></label>
            <AutoComplete @update-name="(name) => setUser('receiving', name)"> </AutoComplete>
          </div>
        </div>
       
        <hr>

        <div class="tableContainer">
          <div class="tableBox leftBox">
            <table class="mainTable">
              <tr>
                <th>
                   <input type="checkbox"
                   @change="(event) => toggleAll(data, event)" 
                   :checked="allSelected(data)">
                </th>
                <th>Kategoria</th>
                <th>Nazwa</th>
                <th>IMEI</th>
                <th>Nr_tel</th>
              </tr>
              <tr v-for="phone in data.phones" :key="phone.id">
                <td>
                  <input type="checkbox" 
                  :value="phone" 
                  v-model="data.selected" />
                </td>
                <td>{{ phone.category }}</td>
                <td>{{ phone.name }}</td>
                <td>{{ phone.imei }}</td>
                <td>{{ phone.nr_tel }}</td>
              </tr>
              
            </table>
          </div>
          <div class="midBox">
            <button  class="paginationBtn3" @click="transferAssets(data, receivedData)" :disabled="isDisabled"><i class="fa-solid fa-chevron-right"></i></button>
            <button class="paginationBtn3" @click="transferAssets(receivedData, data)" :disabled="isDisabled"><i class="fa-solid fa-chevron-left"></i></button>
          </div>
          <div class="tableBox rightBox">
            <table class="mainTable">
              <tr>
                <th><input type="checkbox" @change="(e) => toggleAll(receivedData, e)" :checked="allSelected(receivedData)" /></th>
                <th>Nr IT</th>
                <th>Nazwa</th>
                <th>Nr Serii</th>
                <th>Kategoria</th>
              </tr>
              <tr v-for="rPhone in receivedData.phones" :key="rPhone.id">
                <td>
                  <input type="checkbox" 
                  :value="rPhone" 
                  v-model="receivedData.selected">
                </td>
                <td>{{ rPhone.it_num }}</td>
                <td>{{ rPhone.name }}</td>
                <td>{{ rPhone.serialnum }}</td>
                <td>{{ rPhone.category }}</td>
              </tr>
    
            </table>
          </div>
        </div>
        
        <div class="btnSection">
          <div>
            <button id="paginationBtn1" @click="changePage(-1)" v-if="pagination.page > 1"><i class="fa-solid fa-chevron-left"></i></button>
            <button id="paginationBtn" @click="changePage(1)" v-if="total.pages > pagination.page"><i class="fa-solid fa-chevron-right"></i></button>
          </div>
          <div>
            <button class="applyBtn" @click="applyFunction">Zastosuj</button>
            <button type="button" class="closeBtn" @click="leaveComponent">Zamknij</button>
          </div>
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
  z-index: 3;
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
  display: flex;
  flex-direction: column;
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
.paginationBtn1{
  border: 1px solid rgba(180, 179, 179, 0.781);
  background-color: transparent;
  padding: 10px 20px;
  border-radius: 8px;
  text-align: center;
  width: 100%;
  transition: 0.3s;
  
}
.btnSection{
  display: flex;
  justify-content: space-between;
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

.paginationBtn3{
  border-bottom: 1px solid #f3efef;
  border-style: none;
  background-color: transparent;
  padding: 5px 15px;
}

</style>