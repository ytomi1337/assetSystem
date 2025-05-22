<script setup>
  import { ref, computed, watchEffect, defineEmits } from 'vue';
  import AutoComplete from '../AutoComplete.vue';
  import assetService from '@/services/assetService';
  import printTemplate from './printTemplate.vue';

  const emits = defineEmits(['disableWindow',])
  const data = ref({ phones: [], selected: []})
  const pagination = ref({ count: 1, limit: 10})
  const userData = ref([])
  const header = ref('Protokół Zwrotu Telefonu')
  const isDisabled = computed (() => !userData.value.name )
  const errors = ref([])
  const printTemplateRef = ref(null);
  const date = new Date().toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  const returnToIt =ref(false)

const allSelected = computed(() => 
data.value.selected.length === data.value.phones.length && data.value.phones.length > 0
);

const toggleAll = (event) => {
  data.value.selected = event.target.checked ? [...data.value.phones] : []
};

const setUserData = (recivedData) =>{
  userData.value = recivedData
}
watchEffect(() =>{
  data.value.selected = []
    if(!userData.value.name) return
      assetService.getUserPhones(pagination.value.count, pagination.value.limit, userData.value.name)
                .then((response)=>{
                  data.value.phones = response.data.phones
                }).catch((error)=>{
                    console.error('Bład podczas ładowania urzedzen uzytkownika: ', error)
                }) 
    
  })

const downloadPDF = async () => {
  if(!data.value.selected){
    errors.value.push('Brak wybranego sprzętu')
    setTimeout(() => {
      errors.value = []
    }, 5000)
    return false
  }
  
  if(returnToIt.value == true){
    try{
    await assetService.updateAssetfromUser(data.value.selected, 'IT Magazyn')
    }catch(error){
      console.log('Error podczas przekazywania sprzetu do uzytkownika: "IT Magazyn"');

      return
    }
  }

  const { default: html2pdf } = await import('html2pdf.js');
  const element = printTemplateRef.value.printContent;
  html2pdf().from(element).save('Protokol_Przekazania.pdf');
};

const printForm = async () => {
  console.log(returnToIt.value);
  if(!data.value.selected.length){
    errors.value.push('Brak wybranego sprzętu do wydruku')
    setTimeout(() => {
      errors.value = []
    }, 5000)
    return false
  }

  if(returnToIt.value == true){
    console.log(returnToIt.value);
    try{
    await assetService.updatePhonesfromUser(data.value.selected, 'IT Magazyn')
    }catch(error){
      console.log('Error podczas przekazywania sprzetu do uzytkownika: "IT Magazyn"');

      return
    }
  }
  
  

  const { default: html2pdf } = await import('html2pdf.js');
  const element = printTemplateRef.value.printContent;

  html2pdf()
    .from(element)
    .toPdf()
    .get('pdf')
    .then(pdf => {
      pdf.autoPrint();
      window.open(pdf.output('bloburl'), '_blank'); 
    });

    emits("disableWindow");
};

const leaveComponent = () => {
  emits("disableWindow");
};
</script>


<template>

  <div class="box-overlay">
    <div class="box">
      
      <h2>Protokół Zwrotu Telefonu Od Użytkownika</h2>

      <div class="headerNav">
        <div class="item" style="text-align: left;">
        <label for="autoUser"><b>Podaj Użytkownika:</b></label>
        <AutoComplete 
        name="autoUser"
        @userinfo="setUserData">

        </AutoComplete>
        </div>
        <div class="rightItem">
          <button type="button" @click="downloadPDF" class="printBtn" :disabled="isDisabled">📥 Pobierz PDF</button>
          <button type="button" @click="printForm" class="printBtn" :disabled="isDisabled">🖨️ Drukuj zaznaczone</button>
        </div>

      </div>
      <div style="text-align: end;">
          <input type="checkbox" name="returnToIt" :disabled="isDisabled" @click="returnToIt = !returnToIt" id="checkbox">
          <label for="returnToIt" >Zwróć sprzęt do działu it</label>
        </div>
      <p v-if="errors.length != 0" class="errorTag">{{ errors[0] }}</p>
      <div class="tableBox">
        <table id="mainTable" class="mainTable">
              <tr>
                <th><input type="checkbox" @change="toggleAll" :checked="allSelected" > </th>
                <th>Kategoria</th>
                <th>Imei</th>
                <th>Nazwa</th>
                <th>Nr Tel</th>
              </tr>
              <tr v-for="phone in data.phones" :key="phone.id">
                <td>
                  <input type="checkbox" 
                  :value="phone" 
                  v-model="data.selected">
                </td>
                <td>{{ phone.category }}</td>
                <td>{{ phone.imei }}</td>
                <td>{{ phone.name }}</td>
                <td>{{ phone.nr_tel }}</td>
                
              </tr>
            </table>
        </div>

        <div class="btnSection">
          <button type="button" class="closeBtn" @click="leaveComponent" >Zamknij</button>
        </div>
    </div>
  </div>
  <div class="hidden-print" style="display: none;">
    <printTemplate 
    ref="printTemplateRef"
    :userData="userData"
    :selectedAssets="data.selected"
    :date="date"
    :header="header"
  />
  </div>
  

</template>

<style scoped>

.errorTag{
  font-weight: 600;
  color: rgb(235, 46, 46);
  transition: all 0.2s ease-in;
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
  z-index: 3;
  flex-direction: column;
  text-align: center;
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 800px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.headerNav{
  display: flex;
  justify-content: space-between;
  margin: 2% 0;
  align-items: end;
}

.item{
  width: 50%;
}
.rightItem{
  display: flex;
  gap: 10px;

  .printBtn{
    border: 1px solid rgba(180, 179, 179, 0.781);
    border-radius: 8px;
    background-color: rgba(248, 248, 248, 0.781);
    padding: 5px 10px;
  }
}

.tableBox{
  margin-top: 3%;
}

.btnSection{
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 2%;
  margin-top: 2%;
  padding-top: 20px;
  border-top: 1px solid rgba(180, 179, 179, 0.781);

  button{
    border: 1px solid rgba(180, 179, 179, 0.781);
    padding: 5px 10px;
    border-radius: 8px;
    text-align: center;
    transition: 0.3s;
    background-color: #eb1414d7;
    color: white;
  }

}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  text-align: left;
}

th {
  background: #f4f4f4;
}

#checkbox{
  scale: 1.4;
  margin-right: 10px;
}
</style>
