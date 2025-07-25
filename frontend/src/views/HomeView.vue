<script setup>
import { ref, onMounted } from 'vue';
import assetService from '@/services/assetService';
import DoughnutChart from '@/components/charts/DoughnutChart.vue';
import MenageTables from '@/components/MenageTables.vue';
import AutoComplete from '@/components/AutoComplete.vue';

const assetsData = ref(null);
const phonesData = ref(null);
const assetsStatusesData = ref(null);
const assetsPhoneData = ref(null);

const activeForm = ref(null);
const formData = ref({})

const reminders = ref([])
const addReminderMode = ref(false)
const newReminder = ref({
  title: '',
  author: '',
  content: '',
  expiryDate: '',
  createdAt: ''
})

const localDate = ref({
  time: '',
  date: '',
});


const toggleForm = (formName) => {
    activeForm.value = true

    if (formName == 'menageUsers'){
      formData.value ={
        header: 'Zarządzanie Użytkownikami',
        type: 'users'
      }
    }
    if (formName == 'menageLocalizations'){
      formData.value ={
        header: 'Zarządzanie Lokalizacjami',
        type: 'localizations'
      }
    }
    if (formName == 'menageCategories'){
      formData.value ={
        header: 'Zarządzanie Kategoriami',
        type: 'categories'
      }
    }
    if (formName == 'menageStatuses'){
      formData.value ={
        header: 'Zarządzanie Statusami',
        type: 'statuses'
      }
    }
  };

const disableActiveform = () =>{
  activeForm.value = null
}
onMounted(async () => {

    try {
      const response = await assetService.countCategories();
      const statusResponse = await assetService.countStatuses();
      

      const assetLabels = response.data.assets.map(item => item.category);
      const assetCounts = response.data.assets.map(item => Number(item.count));

      const phoneLabels = response.data.phones.map(item => item.category);
      const phoneCounts = response.data.phones.map(item => Number(item.count));

      const assetStatusesLabels = statusResponse.data.assets.map(item => item.status);
      const assetStatusesCounts = statusResponse.data.assets.map(item => Number(item.count));

      const phoneStatusesLabels = statusResponse.data.phones.map(item => item.status);
      const phoneStatusesCounts = statusResponse.data.phones.map(item => Number(item.count));

      assetsData.value = {
        labels: assetLabels,
        datasets: [
          {
            data: assetCounts,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FC3192', '#FD92A1']
          }
        ]
      };

      phonesData.value = {
        labels: phoneLabels, 
        datasets: [
          {
            data: phoneCounts,
            backgroundColor: ['#D8CCF5', '#60AC3A']
          }
        ]
      };

      assetsStatusesData.value = {
        labels: assetStatusesLabels,
        datasets: [
          {
            data: assetStatusesCounts,
            backgroundColor: ['#648BD8', '#6FFA74', '#FFCE56', '#FC3192', '#FD92A1']
          }
        ]
      };

      assetsPhoneData.value = {
        labels: phoneStatusesLabels,
        datasets: [
          {
            data: phoneStatusesCounts,
            backgroundColor: ['#f5b041', '#f9e79f', '#FFCE56', '#FC3192', '#FD92A1']
          }
        ]
      };
    } catch (error) {
      console.error('Błąd przy ładowaniu danych do wykresów:', error);
    }

    await assetService.getReminder()
    .then((response)=>{
      reminders.value = response.data
    }).catch((error) =>{
      console.log(error);
    })
});
  const crtReminder = async (event) =>{

    event.preventDefault();
    console.log(newReminder.value);
    await assetService.createReminder(newReminder.value)
      .then(async() =>{
        console.log('success');

         await assetService.getReminder().then((response)=>{
          reminders.value = response.data

          addReminderMode.value = !addReminderMode
        })
      }).catch((error)=>{
        console.log(error);
      })
  }

  const updateUser = (receivedName) => {
    newReminder.value.author = receivedName;
  }
  const deleteReminder = async (id) =>{
    if(confirm('Napewno chcesz usunać przypomnienie?')){
      assetService.deleteReminder(id)
      .then(async() =>{
         await assetService.getReminder().then((response)=>{
          reminders.value = response.data
        })
      }).catch((error)=>{
        console.log(error);
      })


    }else{
      return false
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getFullYear())}`;
  };

</script>

<template>
  <div class="home-container">
    <div class="home-box box1">
      <div v-if="!assetsData">Ładowanie danych...</div>
      <div v-else>
        <DoughnutChart :chartData="assetsData" title-text="Sprzęt IT"/>
      </div>
    </div>
    <div class="home-box box1">
      <div v-if="!phonesData">Ładowanie danych...</div>
      <div v-else>
        <DoughnutChart :chartData="phonesData" title-text="Telefony"/>
      </div>
    </div>
    <div class="home-box box2">
      <div class="reminderHeader">
        <h4>Przypomnienia</h4>
       <i @click="addReminderMode = !addReminderMode" v-if="!addReminderMode" class="fa-solid fa-square-plus add-icon" ></i>
       <i @click="addReminderMode = !addReminderMode" v-else class="fa-solid fa-xmark delete-icon"></i>
      </div>
        <table v-if="!addReminderMode">
          <tr>
            <th>Tytuł</th>
            <th>Treść</th>
            <th>Osoba</th>
            <th>Data</th>

          </tr>
          <tr v-for="reminder in reminders">
            <td>{{ reminder.title }}</td>
            <td>{{ reminder.content }}</td>
            <td>{{ reminder.author }}</td>
            <td>{{ formatDate(reminder.expiryDate) }}</td>
            <td><i class="fa-solid fa-trash" @click="deleteReminder(reminder.id)"></i></td>
          </tr>
        </table>
        
        <form class="addReminder" v-else @submit="crtReminder">
          
            <label for="title">Temat:</label>
            <input type="text" v-model="newReminder.title" name="title" class="reminderInput">
        
            <label for="content">Treść:</label>
            <input type="text" v-model="newReminder.content" name="content">
          
            <label for="title">Autor</label>
            <AutoComplete @update-name="updateUser" name="user"> </AutoComplete>
          
            <label for="date">Data:</label>
            <input type="date" v-model="newReminder.expiryDate" name="date">
          
            <button type="submit" class="addBtn">Dodaj</button>
        </form>
    </div>
  </div>

  <div class="home-container">
    <div class="home-box menage" >
      <ul>
      <li> 
        <a href="#" @click="toggleForm('menageUsers')">Użytkownicy <i class="fa-solid fa-arrow-right"></i></a>
      </li>
      <li> 
        <a href="#" @click="toggleForm('menageLocalizations')">Lokalizacje <i class="fa-solid fa-arrow-right"></i></a>
      </li>
      <li> 
        <a href="#" @click="toggleForm('menageCategories')">Kategorie <i class="fa-solid fa-arrow-right"></i></a>
      </li>
      <li> 
        <a href="#" @click="toggleForm('menageStatuses')">Statusy <i class="fa-solid fa-arrow-right"></i></a>
      </li>
      </ul>
    </div>
    <div class="home-box box1">
      <div v-if="!phonesData">Ładowanie danych...</div>
      <div v-else>
        <DoughnutChart :chartData="assetsStatusesData" title-text="Statusy Sprzętu IT"/>
      </div>
    </div>
    <div class="home-box box1">
      <div v-if="!phonesData">Ładowanie danych...</div>
      <div v-else>
        <DoughnutChart :chartData="assetsPhoneData" title-text="Statusy Telefonow"/>
      </div>
    </div>
    <div class="home-box box1">
      <div v-if="!phonesData">Ładowanie danych...</div>
      <div v-else>
        <DoughnutChart :chartData="phonesData" />
      </div>
    </div>
  </div>

  <MenageTables 
    @disableWindow="disableActiveform" 
    v-if="activeForm"
    :formData="formData">
  </MenageTables>
</template>

<style scoped>
  .home-container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    margin: 0 5%;
    padding-top: 20px ;

    .home-box{
    border: 1px solid #dedede;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    border-radius: 10px;
    height: 350px;
  }
  .box1{
    width: 25%;
  }
  .box2{
    padding: 20px;
    width: 50%;
    justify-content: start;
  }
  .menage{
    padding: 20px;
    width: 25%;
    text-align: left;
    justify-content: start;
    ul{
      list-style: none;
    }
    li{
      padding: 5px 0;
    }
    a{
      text-decoration: none;
      color: black;
    }
  }
  }
  
  .reminderHeader{
    display: flex;
    justify-content: space-between;
  
    
    .add-icon,.delete-icon{
      scale: 1.3;
      cursor: pointer;
    }

    .add-icon{
      color: #71cc5eda;
    }
    
    .delete-icon{
      color: rgba(214, 30, 30, 0.781)
    }
  }

  .addReminder{
    display: flex;
    text-align: left;
    flex-direction: column;

    .addBtn{
      align-self: flex-end;
      margin-top: 2%;
      width: 20%;
      background-color: transparent;
      border: 1px solid #71cc5eda;;
      padding: 5px 15px;
      border-radius: 5px;
    }
  }

  th{
        text-align: center;
        padding: 10px 0px;
        border-bottom: 1px solid #d9d6d6;
    }
  td{
      text-align: center;
      padding: 5px;
      border-bottom: 1px solid #f3efef;
  }
  
</style>