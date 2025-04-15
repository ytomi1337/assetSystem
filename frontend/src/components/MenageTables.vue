<script setup>
import { ref, defineEmits, computed, watchEffect, onMounted} from 'vue';
import { GStore } from '@/main';
import assetService from '@/services/assetService';
import { utilsStore } from '@/stores/mainStorege';
import { create } from 'lodash';

const emits = defineEmits([
  'disableWindow', 'update-name'
])
const props = defineProps({
  formData: Object,
})
const useUtilsStore = utilsStore()

const data = ref(null)
const activeForm = ref('mainView')

const newEvent = ref({
  name: '',
  profession: '',
  department: ''
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

  }catch(error){
    console.log('Error podczas ładowania tabeli: ', props.formData.type);
  }

})

const toggleForm = (formName) => {
    activeForm.value = activeForm.value === formName ? null : formName;
  };

const crtEvent = async (event) =>{
  event.preventDefault();

  try{
    if (props.formData.type === 'users') {
      await assetService.addUser(newEvent.value);
    } else if (props.formData.type === 'localizations') {
      await assetService.addLocalizations(newEvent.value.name);
    } else if (props.formData.type === 'categories') {
      await assetService.addLocalizations(item);
    } else if (props.formData.type === 'statuses') {
      await assetService.addLocalizations(item);
    }

    await useUtilsStore.loadAllData();

    if (props.formData.type == 'users') {
      data.value = useUtilsStore.users;
    }
    if (props.formData.type == 'localizations') {
      data.value = useUtilsStore.localizations;
    }
    if (props.formData.type == 'categories') {
      data.value = useUtilsStore.categories;
    }
    if (props.formData.type == 'statuses') {
      data.value = useUtilsStore.statuses;
    }

    activeForm.value = 'mainView'
  }catch(error){
    console.log('Bład podczas Dodawania:', error);
  }
 
}

const deleteEvent = async (item) => {
  if (!confirm('Czy na pewno chcesz usunąć ten element?')) return;
  
  try {
    if (props.formData.type === 'users') {
      await assetService.deleteUser(item);
    } else if (props.formData.type === 'localizations') {
      await assetService.deleteLocalizations(item);
    } else if (props.formData.type === 'categories') {
      await assetService.deleteCategory(item);
    } else if (props.formData.type === 'statuses') {
      await assetService.deleteStatus(item);
    }

    await useUtilsStore.loadAllData();

    if (props.formData.type == 'users') {
      data.value = useUtilsStore.users;
    }
    if (props.formData.type == 'localizations') {
      data.value = useUtilsStore.localizations;
    }
    if (props.formData.type == 'categories') {
      data.value = useUtilsStore.categories;
    }
    if (props.formData.type == 'statuses') {
      data.value = useUtilsStore.statuses;
    }
  } catch (error) {
    console.error('Błąd przy usuwaniu:', error);
  }
};
const disableForm = () => {
  emits("disableWindow")
}


</script>

<template>
 <div class="box-overlay">
    <div class="box">
      <div class="headerBox">
        <h1>{{ props.formData.header }}</h1>
        <div class="icon" v-if="activeForm == 'create'">
          <i @click="toggleForm('mainView')" class="fa-solid fa-arrow-left" style="color: lightskyblue;"></i>
        </div>
        <div class="icon addIcon" v-if="activeForm == 'mainView'">
          <i @click="toggleForm('create')" class="fa-solid fa-square-plus" ></i>
        </div>
        <div class="icon">
          <i @click="disableForm" class="fa-solid fa-xmark"></i>
        </div>
      </div>
       <table id="mainTable" class="mainTable" v-if="activeForm == 'mainView'" >
        <tr class="tableHeader">
          <th>ID</th>
          <th>Nazwa</th>
          <th>Akcje</th>
          
        </tr>
        <tr v-for="(item, index) in data" :key="index" > 
            <td>{{ index }}</td>
            <td>{{ item }}</td>
            <td>
              <button @click="deleteEvent(item)" style="color: rgba(214, 30, 30, 0.781);" ><i class="fa-solid fa-trash"></i> </button>
              <button style="color: #71cc5eda;" v-if="props.formData.type == 'users'"><i class="fa-solid fa-user-pen"></i> </button>
            </td>
        </tr>
      </table>
      
        <form @submit="crtEvent" v-if="activeForm == 'create'" class="createContainter">
            <div class="formRecord">
             <label>Nazwa</label>
             <input type="text" v-model="newEvent.name" required/>
            </div>

            <div class="formRecord" v-if="props.formData.type == 'users'">
             <label >Stanowisko:</label>
              <input type="text"  v-model="newEvent.department" required>
            </div>

            <div class="formRecord" v-if="props.formData.type == 'users'">
             <label >Dział</label>
              <input type="text" v-model="newEvent.profession" required>
            </div>

            <button type="submit" class="addBtn">Dodaj</button>
        </form>
      
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
    font-size: 1.8rem;
    transition: .8s ease all;
    color: rgba(214, 30, 30, 0.781)
  }

  .icon:hover{
    scale: 1.2;
    cursor: pointer;
    color: rgba(208, 23, 23, 0.781);
  }

  .addIcon{
    color: #71cc5eda;
  }
  .addIcon:hover{
    color: #4e9c3fda;
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

.createContainter{
  display: flex;
  justify-content: center;
  text-align: left;
  width: 70%;
  flex-direction: column;
}
.addBtn{
  border: 1px solid #f3efef;
  margin-top: 10px;
  width: 20%;
  padding: 5px 15px;
  background-color: #71cc5eda;
  border-radius: 5px;
}


</style>