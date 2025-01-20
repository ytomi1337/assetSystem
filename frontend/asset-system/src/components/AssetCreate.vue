<script>
import assetService from '@/services/assetService';
import { GStore } from '@/main';

    export default {

      emits: ['showCreate'],
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
           }
        }
    },
    methods: {
      crtAssetFun(event){

        event.preventDefault()

        if(this.newAsset.name =='' || this.newAsset.category=='' || this.newAsset ==''||this.newAsset.it_num=='' ||this.newAsset.user_new == ''){
          return console.log('error');
        }

        GStore.flashMessage = 'Urządzenie ' + this.newAsset.name + ' zostało dodane prawidłowo'
            setTimeout (() => {
              GStore.flashMessage = ''
            },5000)

        assetService.createAsset(this.newAsset
        )
        .then(()=>{
            console.log('object added sucesfly');
        }).catch((error)=>{
            console.log(error);
        }).finally(()=>{
            this.$emit('showCreate')
        })
        this.$router.push({ name: 'asset-list' });
      },
      leaveComponent(){

        if(JSON.stringify(this.newAsset) !== JSON.stringify(this.defaultAsset)){
         const close = confirm('Masz wprowadzone dane czy napewno chcesz zamknac?')
          if(close == true){
            this.$emit('showCreate')
          }
        }else{
          this.$emit('showCreate')
        }

        
      }
    }
  }
    
</script>

<template>
<div class="box-overlay">
  <div class="box">
    <h2 class="mb-4">Dodaj Urządzenie:</h2>

    <form @submit="crtAssetFun">
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
      <label for="user_new">Użytkownik:</label>
      <input type="text" v-model="newAsset.user_new" required/>
      </div>

      <div class="formRecord">
      <label for="localization">Lokalizacja:</label>
      <input type="text" v-model="newAsset.localization"/>
      </div>

      <div class="formRecord">
      <label for="warranty_date">Kategoria: </label>
      <input type="text" v-model="newAsset.category" required/>
      </div>

      <div class="formRecord">
      <label for="warranty_date">Status:</label>
      <input type="text" v-model="newAsset.status"/>
      </div>

      <div class="formRecord">
      <label for="warranty_date">Data Gwarancji:</label>
      <input type="date" v-model="newAsset.warranty_date"/>
      </div>

      <div class="formRecord">
      <label for="recpit_date">Data Wydania:</label>
      <input type="date" v-model="newAsset.recipt_date"/>
      </div>

      <div class="buttonSection">
        <button type="submit" class="formBtn">Utworz</button>
        <button type="button" class="formBtn" @click="leaveComponent">Zamknij</button>
      </div>
    </form>
    
  </div>
</div>

   
</template>

<style>
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
}

.formBtn{
    margin-top: 13%;
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
</style>