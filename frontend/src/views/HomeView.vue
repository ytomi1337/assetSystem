<script setup>
  import { ref,onMounted, computed } from 'vue';
  import { utilsStore } from '@/stores/mainStorege';
  import DoughnutChart from '@/components/charts/DoughnutChart.vue';
  import BarChart from '@/components/charts/BarChart.vue';

  const isLoading = ref(true)
  const assetsData = ref({})
  const phonesData = ref({})
  const assetLocalization = ref({})
  const useUtilsStore = utilsStore()

  onMounted (async () =>{
    await useUtilsStore.loadAllData();
    isLoading.value = useUtilsStore.loading

    if(!isLoading.value){
      assetsData.value = {
        labels: useUtilsStore.categories,
        datasets: [
          {
            data: [30,50,60,30,20],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FC3192', 'FD92A1']
          }
        ]
      }

      phonesData.value = {
        labels: useUtilsStore.phoneCategories,
        datasets: [
          {
            data: [30,50],
            backgroundColor: ['#FF6384', '#36A2EB']
          }
        ]
      }

      assetLocalization.value = {
        labels: [ 'January', 'February', 'March'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 20, 12]
          }
        ]
      }
    }

  })


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
      <div v-if="isLoading">Ładowanie danych...</div>
      <div v-else>
        <DoughnutChart :chartData="assetsData" />
      </div>
    </div>
    <div class="home-box box1">
      <div v-if="isLoading">Ładowanie danych...</div>
      <div v-else>
        <DoughnutChart :chartData="phonesData" />
      </div>
    </div>
    <div class="home-box box2">
      <h3>Reminders</h3>
    </div>
  </div>
  <div class="home-container">
    <div class="home-box box2">
      <div v-if="isLoading">Ładowanie danych...</div>
      <div v-else>
        <DoughnutChart :chartData="assetsData" />
      </div>
    </div>
    <div class="home-box box1">
      <div v-if="isLoading">Ładowanie danych...</div>
      <div v-else>
        <DoughnutChart :chartData="assetsData" />
      </div>
    </div>
    <div class="home-box box1">
      <div v-if="isLoading">Ładowanie danych...</div>
      <div v-else>
        <DoughnutChart :chartData="assetsData" />
      </div>
    </div>
  </div>
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
    width: 50%;
  }
  }
</style>