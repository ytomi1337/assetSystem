<script setup>
    import assetService from '@/services/assetService';
    import AssetActionData from '@/components/AssetActionData.vue';
    import { ref, onMounted} from 'vue'

    const assets = ref(null)

    onMounted(() =>{
        assetService.getAssets()
        .then((response)=>{
            assets.value = response.data
        }).catch((error)=>{
            console.log(error);
            console.log('wyzej error');
        })
    })

    console.log(assets);

</script>

<template>
    <div class="containerBox">
        <div class="filterBar">
            <button class="navbtn createBtn">Utwórz</button>
            <button class="navbtn">Filtr</button>
            <button class="navbtn">Refresh</button>
        </div>
        <hr>
        <table id="mainTable" class="mainTable">
            <tr class="tableHeader">
                <th>ID</th>
                <th>Nr IT</th>
                <th>Nazwa</th>
                <th>Nr Seryjny</th>
                <th>Użytkownik</th>
                <th>Lokalizacja</th>
                <th>Status</th>
                <th>Data Gwarancji</th>
                <th>Data Wydania</th>
                <th>Akcje</th>
            </tr>
            <tr v-for="asset in assets" :id="asset" >
                <td>{{ asset.id }}</td>
                <td>{{ asset.it_num }}</td>
                <td>{{ asset.name }}</td>
                <td>{{ asset.serialnum }}</td>
                <td>{{ asset.user_new }}</td>
                <td>{{ asset.localization }}</td>
                <td>{{ asset.status }}</td>
                <td>{{ asset.warranty_date }}</td>
                <td>{{ asset.recipt_date }}</td>
                <td><AssetActionData :key="asset.id" :asset="asset"></AssetActionData></td>
            </tr>
            
        </table>
        
    </div>
  
</template>

<style>

    th{
        text-align: center;
        background-color: #fdf9f9;
        padding: 10px 0px;
    }
    td{
        text-align: center;
        padding-bottom: 5px;
    }
    .containerBox{
        margin-left: 10%;
        margin-right: 10%;
        width: 80%;
    }
    .mainTable{
        width: 100%;
    }
    .filterBar{
        margin-top: 3%;
        width: 100%;
        padding: 10px;

        .navbtn{
            padding: 5px 15px;
            border: solid 1px rgba(180, 179, 179, 0.781);
            margin-right: 2%;
            border-radius: 5px;
            transition: 0.3s;
        }
        .navbtn:first-child{
            background-color: #71cc5eda;
        }
        .navbtn:first-child:hover{
            background-color: #398d23c9;
            color: #fff;
        }

        .navbtn:hover{
            background-color: rgba(109, 109, 109, 0.781);
            color: #fff;
        }
    }

</style>