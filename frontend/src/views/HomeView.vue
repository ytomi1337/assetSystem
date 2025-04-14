<script setup>
import { ref, onMounted } from 'vue';
import assetService from '@/services/assetService';
import DoughnutChart from '@/components/charts/DoughnutChart.vue';
import MenageTables from '@/components/MenageTables.vue';

const assetsData = ref(null);
const phonesData = ref(null);
const assetLocalization = ref(null);

const activeForm = ref(null);
const formData = ref({})


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
      

      const assetLabels = response.data.assets.map(item => item.category);
      const assetCounts = response.data.assets.map(item => Number(item.count));

      const phoneLabels = response.data.phones.map(item => item.category);
      const phoneCounts = response.data.phones.map(item => Number(item.count));

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
            backgroundColor: ['#FF6384', '#36A2EB']
          }
        ]
      };

      assetLocalization.value = {
        labels: ['January', 'February', 'March'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 20, 12]
          }
        ]
      };
    } catch (error) {
      console.error('Błąd przy ładowaniu danych do wykresów:', error);
    }
});



  // const reminders = ref([])
  // const newReminder = ref({
  //   title: '',
  //   author: '',
  //   content: '',
  //   expiryDate: '',
  //   createdAt: ''
  // })

  // const localDate = ref({
  //   time: '',
  //   date: '',
  // });

  // const updateTime = () => {
  //       localDate.value.time = new Date().toLocaleTimeString();
  //       localDate.value.date = new Date().toLocaleDateString();
  //     };

  // onMounted(()=>{

  //   updateTime();
  //   setInterval(updateTime, 60000);

  //   assetService.getReminder()
  //   .then((response)=>{
  //     reminders.value = response.data
  //   }).catch((error) =>{
  //     console.log(error);
  //   })
  // })

  // const crtReminder = () =>{

  //   assetService.createReminder(newReminder.value)
  //     .then(() =>{
  //     }).catch((error)=>{
  //       console.log(error);
  //     })
  // }

  // const updateUser = (receivedName) => {
  //   newReminder.value.author = receivedName;
  // }
  // const deleteReminder = (id) =>{
  //   if(confirm('Napewno chcesz usunać przypomnienie?')){
  //     assetService.deleteReminder(id)
  //     .then((response) => {
  //       console.log('succses', response);
  //     }).catch((error)=>{
  //       console.log(error);
  //     })
  //   }else{
  //     return false
  //   }
  // }

</script>

<template>
  <div class="home-container">
    <div class="home-box box1">
      <div v-if="!assetsData">Ładowanie danych...</div>
      <div v-else>
        <DoughnutChart :chartData="assetsData" />
      </div>
    </div>
    <div class="home-box box1">
      <div v-if="!phonesData">Ładowanie danych...</div>
      <div v-else>
        <DoughnutChart :chartData="phonesData" />
      </div>
    </div>
    <div class="home-box box2">
      <h3>Reminders</h3>
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
        <DoughnutChart :chartData="phonesData" />
      </div>
    </div>
    <div class="home-box box1">
      <div v-if="!phonesData">Ładowanie danych...</div>
      <div v-else>
        <DoughnutChart :chartData="phonesData" />
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

<style>
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
  
</style>