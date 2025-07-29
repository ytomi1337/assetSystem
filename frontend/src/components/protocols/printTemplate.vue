<script setup>
import { ref, defineProps } from 'vue';
import logo from '@/assets/Holcim_Logo_2021_sRGB.jpg'; // ← poprawny import

defineProps({
  userData: Object,
  selectedAssets: Array,
  date: String,
  header: String
});


const printContent = ref(null);

defineExpose({ printContent });


</script>

<template>
    <div ref="printContent" class="pdf-container">

      <div class="header">
        <div class="headerLogo">
          <img :src="logo" alt="Logo" class="logo" />
        </div>
        
        <div class="headerTopic">
          <h6><b>{{ header }}</b></h6>
        </div>
        

        <div class="protocolInfo">
          <div class="protocolBox">LI3.02.01.PR001.02</div>
          <div class="protocolBox">Wyd. 3</div>
          <div class="protocolBox">str. 1/1</div>
        
          
        </div>

      </div>
  
     
      <div class="user-info">
          <p><strong>Użytkownik (Imię i Nazwisko): </strong> {{ userData.name }}</p>
          <p><strong>Przekazujący (Imię i Nazwisko): </strong> ........................................................................................</p>

          <div class="assetData">
            <p><strong>Typ Sprzętu IT: </strong> </p> 
              <div v-for="(selectedAsset, index) in selectedAssets" :key="index" >
                {{ selectedAsset.category }}, 
              </div>
          </div>

          <div class="assetData">
            <p><strong>Model: </strong> </p> 
              <div v-for="(selectedAsset, index) in selectedAssets" :key="index" >
                {{ selectedAsset.name }}, 
              </div>
          </div>

          <div class="assetData">
            <p><strong>S/N /IMEI: </strong> </p> 
              <div v-for="(selectedAsset, index) in selectedAssets" :key="index" >
                {{ selectedAsset.serialnum }}, 
              </div>
          </div>

          <div class="assetData">
            <p><strong>Stan techniczny (nowy/ używany) </strong> </p> 
              <div v-for="(selectedAsset, index) in selectedAssets" :key="index" >
                {{ selectedAsset.status }}, 
              </div>
          </div>

          <p><strong>Data Przekazania: </strong> {{ date }}</p>
          <p><strong>Wyposażenie dodatkowe: </strong> ........................................................................................</p>
          <p><strong>Inne, dodatkowe informacje: </strong> ........................................................................................</p>
          
      </div>
  
      <div class="infoNotes">
            <p style="color: red;">Sprzęt pozostaje w dyspozycji pracownika na czas pełnienia 
            obowiązków dla pracodawcy/usługodawcy. Z chwilą zakończenia pracy pracownik 
            ma obowiązek odesłać/zdać sprzęt do lokalnego działu IT</p>
          <p >Zapoznałem się z procedurą LI3.02.01.PR001.00 Procedura 
            IT zarządzania aplikacjami i domenami, sprzętem teleinformatycznym 
            oraz dostępami do systemów informatycznych,
            rozumiem i akceptuję zasady używania sprzętu IT.</p>
          </div>

      <div class="signatures">
        <div>
           <div class="signature-line"></div>
           <p>Data</p>
        </div>
        <div>
          <div class="signature-line"></div>
           <p>Czytelny Podpis Przekazujacego</p>
        </div>
        <div>
          <div class="signature-line"></div>
          <p>Czytelny Podpis Przekazujacego</p>
        </div>
      </div>
    </div>


  </template>
  
  <style scoped>
  .pdf-container {
    font-family: Arial, sans-serif;
    padding: 20px;
    max-width: 800px;
    margin: auto;
    background: white;
    border: 1px solid #ddd;
    
    display: flex;
    flex-direction: column;
    min-height: 122vh; 
  }

  .header {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    align-items: center;
    border: 1px solid black;

    .headerLogo{
      border-right: 1px solid black;
      padding: 10px;
    }
    .logo {
      height: 52px;
    }
  
    .protocolInfo{
    display: flex;
    flex-direction: column;

    .protocolBox{
      padding: 0 5px;
      text-align: center;
      border-left: 1px solid black;
      border-bottom: 1px solid black;
    }

    .protocolBox:last-child{
      border-bottom: none
    }

    }
}


.user-info {
  display: flex;
  flex-direction: column;
  margin: 5% 0;

  .assetData{
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  }

}



.signatures {
  text-align: center;
  display: flex;
  justify-content: space-between;
  margin-top: auto; 
  padding-top: 40px;
}

.signature-line {
  border-top: 1px dotted black;
  margin-bottom: 10px;
}
  </style>
  