<script setup>
import { ref, defineProps } from 'vue';
import logo from '@/assets/Holcim_Logo_2021_sRGB.jpg'; 

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
      <!-- Logo i nagłówek -->
      <div class="header">
        <h1><b>{{ header }}</b></h1>
        <img :src="logo" alt="Logo" class="logo" />
      </div>
  
      <!-- Dane użytkownika -->
      <div class="user-info">
        <div class="leftSection">
            <p><strong>Imię i Nazwisko:</strong> {{ userData.name }}</p>
            <p><strong>Stanowisko:</strong> {{ userData.profession }}</p>
            <p><strong>Dział:</strong> {{ userData.department }}</p>
        </div>
        <div class="rightSection">
            <p><strong>{{ userData.company }}</strong></p>
            <p>{{ date }}</p>
        </div>
      </div>
  
      <!-- Tabela -->
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nr działu IT</th>
            <th>Nazwa</th>
            <th>Nr Seryjny</th>
            <th>Kategoria</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(selectedAsset, index) in selectedAssets" :key="index">
            <td>{{ index + 1 }}</td>
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
  