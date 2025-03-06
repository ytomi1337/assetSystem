<script setup>
import { ref, computed, watchEffect, defineEmits } from 'vue';
import AutoComplete from '../AutoComplete.vue';
import assetService from '@/services/assetService';


const assets = ref(['test'])
const selectedAssets = ref([])
const user = ref('');

const emits = defineEmits(['disableWindow',])

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

watchEffect(() =>{
  selectedAssets.value = []
      assetService.getUserAssets(user.value)
                .then((response)=>{
                  assets.value = response.data
                  console.log(assets.value);
                }).catch((error)=>{
                    console.log(error);
                    console.log('wyzej error');
                }) 
    
  })


const userData = ref({
  name: 'Nikola Kruk',
  position: 'Młodszy Specjalista ds. Administracji',
  department: 'Administracja',
  company: 'Boerner Insulation Sp. z o.o.',
  date: new Date().toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
});

const downloadPDF = async () => {
  const { default: html2pdf } = await import('html2pdf.js');
  const element = document.getElementById('pdf-template');
  html2pdf().from(element).save('Protokol_Przekazania.pdf');
};

const printForm = async () => {
  const { default: html2pdf } = await import('html2pdf.js');
  const element = document.getElementById('pdf-template');

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
      <h2>Protokół przekazania do użytkownika</h2>

      <div class="headerNav">
        <div class="item" style="text-align: left;">
        <label for="autoUser"><b>Podaj Użytkownika:</b></label>
        <AutoComplete 
        name="autoUser"
        @update-name="setUserFrom">

        </AutoComplete>
        </div>
        <div class="rightItem">
          <button @click="downloadPDF" class="printBtn">📥 Pobierz PDF</button>
          <button @click="printForm" class="printBtn">🖨️ Drukuj zaznaczone</button>
        </div>
      </div>

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
  <div id="mainPrintedForm" style="display: none;">
   

    <div id="pdf-template" class="pdf-container">
      <!-- Logo i nagłówek -->
      <div class="header">
        <h1><b>Protokół Przekazania</b></h1>
        <img src="#" alt="Logo" class="logo" />
      </div>

      <!-- Dane użytkownika -->
      <div class="user-info">
        <div class="leftSection">
            <p><strong>Imię i Nazwisko:</strong> {{ user }}</p>
            <p><strong>Stanowisko:</strong> {{ userData.position }}</p>
            <p><strong>Dział:</strong> {{ userData.department }}</p>
        </div>
        <div class="rightSection">
            <p><strong>{{ userData.company }}</strong></p>
            <p>{{ userData.date }}</p>
        </div>
      </div>

      <!-- Tabela -->
      <table>
        <thead>
          <tr>
            <th>Nr działu IT</th>
            <th>Nazwa</th>
            <th>Nr Seryjny</th>
            <th>Kategoria</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(selectedAsset, index) in selectedAssets" :key="index">
            <td>{{ selectedAsset.it_num }}</td>
            <td>{{ selectedAsset.name }}</td>
            <td>{{ selectedAsset.serialnum }}</td>
            <td>{{ selectedAsset.category }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Miejsce na podpisy -->
      <div class="signatures">
        <div>
          <p>Podpis / data osoby przekazującej</p>
          <div class="signature-line"></div>
        </div>
        <div>
          <p>Podpis / data osoby odbierającej</p>
          <div class="signature-line"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input:hover{
  cursor: pointer;
}
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
  display: flex;
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
.pdf-container {
  font-family: Arial, sans-serif;
  padding: 20px;
  max-width: 800px;
  margin: auto;
  background: white;
  border: 1px solid #ddd;
  
  display: flex;
  flex-direction: column;
  min-height: 122vh; /* Zapewnia pełną wysokość strony A4 */
}

.header {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  align-items: center;

  img{
    width: 15rem;
  }
}

.logo {
  width: 150px;
  margin-bottom: 10px;
}

.user-info {
  display: flex;
  margin-top: 10%;
  justify-content: space-between;
  padding-bottom: 10px;
  margin-bottom: 12%;
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

/* Upewnia się, że treść rośnie w górę, a podpisy zostają na dole */
.signatures {
  display: flex;
  justify-content: space-between;
  margin-top: auto; /* Przesuwa podpisy na dół */
  padding-top: 40px;
}

.signature-line {
  border-top: 1px solid black;
  width: 200px;
  margin-top: 10px;
}
</style>
