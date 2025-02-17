<script>
import assetService from '@/services/assetService';
import { GStore } from '@/main';
import { ref, onMounted } from 'vue';
import AutoComplete from './AutoComplete.vue'






    export default {

      emits: ['showCreate', 'update-name'],


      setup() {
          const categories = ref([]);
          const localizations = ref([]);
          const statuses = ref ([]);

          onMounted(() => {
            assetService.getStatus().then((response)=>{
              statuses.value = response.data
              }).catch((error) =>{
                  console.log(error);
              })
            
            assetService.getCategories().then((response)=>{
                  categories.value = response.data
              }).catch((error) =>{
                  console.log(error);
              })

            assetService.getLocalizations().then((response)=>{
                  localizations.value = response.data
              }).catch((error) =>{
                  console.log(error);
              })
          });

          return {
            categories, localizations, statuses
          };
    },
      data(){
        return{

          defaultAsset: {
              name: '',
              it_num: '',
              serialnum: '',
              user_new: '',
              localization:'' ,
              category:'' ,
              status: '',
              recipt_date: '',
              warranty_date: ''
          },
          newAsset: {
              name: '',
              it_num: '',
              serialnum: '',
              user_new: '',
              localization:'' ,
              category:'' ,
              status: '',
              recipt_date: '',
              warranty_date: ''
           },
          isError: ''
        }
    },
      components:{
      AutoComplete
    },
      methods: {

      updateUser(receivedName) {
      this.newAsset.user_new = receivedName
    },

      crtAssetFun(event){
        event.preventDefault()
        assetService.createAsset(this.newAsset
        )
        .then(()=>{
            GStore.flashMessage = 'Urządzenie ' + this.newAsset.name + ' zostało dodane prawidłowo'
            setTimeout (() => {
              GStore.flashMessage = ''
            },5000)
            console.log('object added sucesfly');
            this.$emit('showCreate')
        }).catch((error)=>{
            this.isError = error.response.data.errors[0].msg
        })
  
      }, 

      leaveComponent(){
        if(JSON.stringify(this.newAsset) !== JSON.stringify(this.defaultAsset)){
          if(confirm('Masz wprowadzone dane czy napewno chcesz zamknac?')){
            this.$emit('showCreate')
          }
        }else{
          this.$emit('showCreate')
        }
      },
    }
  }

</script>

<template>
<div class="box-overlay">
  <div class="box">
    <h2 class="mb-4">Dodaj Urządzenie:</h2>

    <form @submit="crtAssetFun">

      <div class="errorSection">
      <p v-if="isError" >{{ this.isError }}</p>
      </div>

      <div class="formRecord">
      <label for="it_num">Nr działu IT:</label>
      <input type="text" v-model="newAsset.it_num" required/>
      </div>

      <div class="formRecord">
      <label for="name">Nazwa:</label>
      <input type="text" v-model="newAsset.name" required/>
      </div>

      <div class="formRecord">
      <label for="serialnum">Nr Seryjny:</label>
      <input type="text" v-model="newAsset.serialnum" required/>
      </div>

      <div class="formRecord">
        <AutoComplete @update-name="updateUser"> </AutoComplete>
      </div>

      <div class="formRecord">
      <label for="localization">Lokalizacja:</label>
      <select v-model="newAsset.localization" name="localization">
          <option v-for="localization in localizations" :key="localization.id" :value="localization.name">
            {{ localization.name }}
          </option>
      </select>
      </div>

      <div class="formRecord">
      <label for="category">Kategoria:</label>
      <select v-model="newAsset.category" name="category">
          <option v-for="category in categories" :key="category.id" :value="category.name">
            {{ category.name }}
          </option>
      </select>
      </div>

      <div class="formRecord">
      <label for="status">Status:</label>
      <select v-model="newAsset.status" name="status">
          <option v-for="status in statuses" :key="status.id" :value="status.name">
            {{ status.name }}
          </option>
      </select>
      </div>

      <div class="formRecord">
      <label for="warranty_date">Data Gwarancji:</label>
      <input type="date" v-model="newAsset.warranty_date"/>
      </div>

      <div class="formRecord">
      <label for="recpit_date">Data Wydania:</label>
      <input type="date" v-model="newAsset.recipt_date"/>
      </div>

      <div class="butonnSection">
        <button type="submit" class="formBtn">Utworz</button>
        <button type="button" class="formBtn" @click="leaveComponent">Zamknij</button>
      </div>
    </form>
    
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