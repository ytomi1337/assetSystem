<script setup>
import { ref, defineEmits, computed, watchEffect, onMounted} from 'vue';
import { GStore } from '@/main';
import assetService from '@/services/assetService';
import { utilsStore } from '@/stores/mainStorege';
const emits = defineEmits(['disableWindow', 'update-name'])

const useUtilsStore = utilsStore()

const data = ref(null)

const props = defineProps({
  formData: Object,
})

onMounted(async() => {
  await useUtilsStore.loadAllData()

  try{
    if(props.formData.type == 'users'){
      console.log('users');
      data.value = useUtilsStore.users
    }
    if(props.formData.type == 'localizations'){
      data.value = useUtilsStore.localizations
    }
    if(props.formData.type == 'categories'){
      data.value = useUtilsStore.categories
    }
    if(props.formData.type == 'statuses'){
      data.value = useUtilsStore.statuses
    }

    console.log(data.value);
  }catch(error){
    console.log('error');
  }

})

const disableForm = () => {
  emits("disableWindow")
}


</script>

<template>
 <div class="box-overlay">
    <div class="box">
      <div class="headerBox">
        <h1>{{ props.formData.header }}</h1>
        <div class="icon">
          <i @click="disableForm" class="fa-solid fa-xmark"></i>
        </div>
      </div>
       <table id="mainTable" class="mainTable">
        <tr class="tableHeader">
          <th>ID</th>
          <th>Nazwa</th>
          <th>Akcje</th>
          
        </tr>
        <tr v-for="(item, index) in data" :key="index" > 
            <td>{{ index }}</td>
            <td>{{ item }}</td>
            <td>
              <button style="color: rgba(214, 30, 30, 0.781);"><i class="fa-solid fa-trash"></i> </button>
              <button style="color: #71cc5eda;" v-if="props.formData.type == 'users'"><i class="fa-solid fa-user-pen"></i> </button>
            </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style scoped> 


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
button{
  border: none;
  background-color: transparent;
}
.headerBox{
  display: flex;
  justify-content: space-around;
  align-items: center;

  .icon{
    font-size: 1.5rem;
    transition: .8s ease all;
    color: rgba(214, 30, 30, 0.781)
  }
  .icon:hover{
    scale: 1.2;
    cursor: pointer;
    color: rgba(208, 23, 23, 0.781);
  }
}
.mainTable{
  width: 100%;
  margin-top: 1%;

  th{
    text-align: center;
    background-color: #fdf9f9;
    padding: 10px 0px;
  }
  td{
    text-align: center;
    padding-bottom: 5px;
    border-bottom: 1px solid #f3efef;
  }
}

</style>