<script setup>
import { ref, computed, watchEffect, defineEmits } from 'vue';
import AutoComplete from '../AutoComplete.vue';
import assetService from '@/services/assetService';
import printTemplate from './printTemplate.vue';


const assets = ref(['test'])
const selectedAssets = ref([])
const page = ref(1)
const limit = ref(10)
const user = ref('');
const userData = ref([])
const header = ref('Protokół Zwrotu')
const isDisabled = computed (() => selectedAssets.value.length == 0)
const errors = ref([])
const emits = defineEmits(['disableWindow',])
const date = new Date().toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

const printTemplateRef = ref(null);

const allSelected = computed(() => 
  selectedAssets.value.length === assets.value.length && assets.value.length > 0
);

const toggleAll = (event) => {
  if (event.target.checked) {
    selectedAssets.value = [...assets.value];
  } else {
    selectedAssets.value = []; 
  }
};

const setUserFrom = (receivedName) => {
  user.value = receivedName;
}

const setUserData = (recivedData) =>{
  userData.value = recivedData
}
watchEffect(() =>{
  selectedAssets.value = []
  assetService.getUserAssets(page.value, limit.value, user.value)
                .then((response)=>{
                  assets.value = response.data.assets
                }).catch((error)=>{
                    console.log(error);
                    console.log('wyzej error');
                }) 
    
  })

const downloadPDF = async () => {
  const { default: html2pdf } = await import('html2pdf.js');
  const element = printTemplateRef.value.printContent;
  html2pdf().from(element).save('Protokol_Zwrotu.pdf');
};

const printForm = async () => {

  const { default: html2pdf } = await import('html2pdf.js');
  const element = printTemplateRef.value.printContent;

  html2pdf()
    .from(element)
    .toPdf()
    .get('pdf')
    .then(pdf => {
      pdf.autoPrint(); // Wymusza okno drukowania
      window.open(pdf.output('bloburl'), '_blank'); // Otwiera PDF w nowym oknie
    });
};

const leaveComponent = () => {
  emits("disableWindow");
};
</script>

<template>

  <div class="box-overlay">
    <div class="box">
      
      <h2>Protokół Zwrotu Od Użytkownika</h2>

      <div class="headerNav">
        <div class="item" style="text-align: left;">
        <label for="autoUser"><b>Podaj Użytkownika:</b></label>
        <AutoComplete 
        name="autoUser"
        @update-name="setUserFrom"
        @userinfo="setUserData">

        </AutoComplete>
        </div>
        <div class="rightItem">
          <button type="button" @click="downloadPDF" class="printBtn" :disabled="isDisabled">📥 Pobierz PDF</button>
          <button type="button" @click="printForm" class="printBtn" :disabled="isDisabled">🖨️ Drukuj zaznaczone</button>
        </div>
      </div>
      <p v-if="errors.length != 0" class="errorTag">{{ errors[0] }}</p>
      <div class="tableBox">
            <table id="mainTable" class="mainTable">
              <tr>
                <th><input type="checkbox" @change="toggleAll" :checked="allSelected" > </th>
                <th>Nr IT</th>
                <th>Nazwa</th>
                <th>Nr Serii</th>
                <th>Kategoria</th>
              </tr>
              <tr v-for="asset in assets" :key="asset.id">
                <td>
                  <input type="checkbox" 
                  :value="asset" 
                  v-model="selectedAssets">
                </td>
                <td>{{ asset.it_num }}</td>
                <td>{{ asset.name }}</td>
                <td>{{ asset.serialnum }}</td>
                <td>{{ asset.category }}</td>
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
    :user="user"
    :userData="userData"
    :selectedAssets="selectedAssets"
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
  margin: 5% 0;
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


</style>
