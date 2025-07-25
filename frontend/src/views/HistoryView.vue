<script setup>
import assetService from '@/services/assetService';
import AssetActionData from '@/components/AssetActionData.vue';
import AssetCreate from '@/components/AssetCreate.vue';
import Filters from '@/components/Filters.vue';
import ArrowIcons from '@/components/ArrowIcons.vue';
import { ref, onMounted, watchEffect,  } from 'vue'
import { GStore } from '@/main';

const props = defineProps({
        id:{
            required: true,
        },
    })
const logs = ref(null)

onMounted( async () => {
    
    try{
        await  assetService.getAssetLogs(props.id).then((response) => {
            logs.value = response.data

            console.log(logs.value);
        })
    }catch(error){
        console.log(error);
    }
   
})

function formatDate(isoString) {
  const date = new Date(isoString);

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Miesiące są od 0 do 11
  const year = date.getFullYear();

  return `${hours}:${minutes} ${day}.${month}.${year}`;
}
</script >

<template>
    <div class="container">
        <table class="logTable">
            <tr>
                <th></th>
                <th>Nr</th>
                <th>Nr IT sprzętu</th>
                <th>Użytkownik</th>
                <th>Użytkownik docelowy</th>
                <th>Opis</th>
                <th>Data</th>
                <th>Data</th>
            </tr>
            <tr  v-for="log in logs">
                <td v-if="log.action == 'AddedToDB'"><i class="fa-solid fa-square-plus icon"></i></td>
                <td v-else-if="log.action == 'Edited'"><i class="fa-solid fa-pen-to-square icon" ></i></td>
                <td v-else-if="log.action == 'Transfer'"><i class="fa-solid fa-people-arrows icon"></i></td>
                <td>{{ log.operationNumber }} </td>
                <td>{{ log.it_number }} </td>
                <td>{{ log.user }} </td>
                <td>{{ log.targetUser }} </td>
                <td>{{ log.description }} </td>
                <td>{{ formatDate(log.createdAt) }} </td>
                <td><i class="fa-solid fa-down-long"></i></td>
            </tr>
        </table>
    </div>
</template>

<style>
    .logTable{
        width: 100%;
        border-collapse: collapse;
        font-family: sans-serif;
        font-size: 14px;
        margin-top: 1%;
    }

    .icon{
        font-size: 1.2rem;
    }

    .logTable th,
    .logTable td {
        border-bottom: 1px solid #ddd;
        padding: 8px 10px;
        text-align: left;
    }

    .logTable th {
      font-weight: 600;   
      vertical-align: middle;
      white-space: nowrap; 
    }

    .logTable tr:nth-child(even) {
        background-color: #fffcfc;
    }

    .logTable .fa-square-plus { color: #4caf50; }  
    .logTable .fa-pen-to-square { color: #2196f3; }   
    .logTable .fa-people-arrows { color: #ff9800; }   
    .logTable .fa-down-long { color: #000000; }   
</style>