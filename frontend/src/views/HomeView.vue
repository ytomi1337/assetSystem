<script setup>
  import { ref,onMounted, computed } from 'vue';
  import AutoComplete from '@/components/AutoComplete.vue';
  import assetService from '@/services/assetService';
  import { utilsStore } from '@/stores/mainStorege';


  const useUtilsStore = utilsStore()
  const reminders = ref([])
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

  const updateTime = () => {
        localDate.value.time = new Date().toLocaleTimeString();
        localDate.value.date = new Date().toLocaleDateString();
      };

  onMounted(()=>{

    updateTime();
    setInterval(updateTime, 60000);

    assetService.getReminder()
    .then((response)=>{
      reminders.value = response.data
    }).catch((error) =>{
      console.log(error);
    })
  })

  const crtReminder = () =>{

    assetService.createReminder(newReminder.value)
      .then(() =>{
      }).catch((error)=>{
        console.log(error);
      })
  }

  const updateUser = (receivedName) => {
    newReminder.value.author = receivedName;
  }
  const deleteReminder = (id) =>{
    if(confirm('Napewno chcesz usunać przypomnienie?')){
      assetService.deleteReminder(id)
      .then((response) => {
        console.log('succses', response);
      }).catch((error)=>{
        console.log(error);
      })
    }else{
      return false
    }
  }

</script>

<template>
  
</template>

<style>

</style>