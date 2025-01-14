<script setup>
    import assetService from '@/services/assetService';
    import AssetActionData from '@/components/AssetActionData.vue';
    import AssetCreate from '@/components/AssetCreate.vue';
    import { ref, onMounted, watchEffect, computed} from 'vue'

    const assets = ref(null)

    const page = ref(1)
    const limit = ref(4)
    const sortKey = ref('id')
    const sortValue = ref('asc')
    const sortSymbol = ref('&darr;&uarr;')
   
    const limitOne = ref(3)
    const limitTwo = ref(5)
    const limitThree = ref(10)

    onMounted(() =>{
        watchEffect(()=>{ 
            assetService.getAssets(page.value, limit.value, sortValue.value, sortKey.value)
            .then((response)=>{
                assets.value = response.data
            }).catch((error)=>{
                console.log(error);
                console.log('wyzej error');
            })
            
    })
    })

    const toggleSort = (column) => {
        if(column){
          sortValue.value = sortValue.value == 'asc' ? 'desc':'asc';
          sortSymbol.value = sortValue.value == 'asc' ? '&darr;': '&uarr;';
        }
        sortKey.value = column

    };
    
    const pagePlus = () =>{
        page.value = page.value + 1
    }

    const pageMinus = () =>{
        page.value = page.value - 1
    }

    const changeLimit = (limitNum) =>  {
        limit.value = limitNum
    }  
    
    const showCreateForm = ref(false)

</script>

<template>
    <AssetCreate v-if="showCreateForm" class="transComp" ></AssetCreate>
    <div class="containerBox">
        
        <div class="filterBar">
            <button class="navbtn createBtn" @click="showCreateForm = true">Utworz</button>
            <button class="navbtn">Filtr</button>
            <button class="navbtn">Refresh</button>
        </div>
        
        <hr>
        <table id="mainTable" class="mainTable">
            <tr class="tableHeader">
                <th>ID <button class="sortBtn" @click="toggleSort('id')" v-html="sortSymbol"></button> </th>
                <th>Nr IT<button class="sortBtn" @click="toggleSort('it_num')"v-html="sortSymbol"></button></th>
                <th>Nazwa <button class="sortBtn" @click="toggleSort('name')"v-html="sortSymbol"></button></th>
                <th>Nr Seryjny <button class="sortBtn" @click="toggleSort('serialnum')"v-html="sortSymbol"></button></th>
                <th>Użytkownik <button class="sortBtn" @click="toggleSort('user_new')"v-html="sortSymbol"></button></th>
                <th>Lokalizacja <button class="sortBtn" @click="toggleSort('localization')"v-html="sortSymbol"></button></th>
                <th>Status <button class="sortBtn" @click="toggleSort('status')"v-html="sortSymbol"></button></th>
                <th>Data Gwarancji <button class="sortBtn" @click="toggleSort('warranty_date')"v-html="sortSymbol"></button></th>
                <th>Data Wydania <button class="sortBtn" @click="toggleSort('recipt_date')"v-html="sortSymbol"></button></th>
                <th>Akcje</th>
            </tr>
            <tr v-for="asset in assets" >
                <td>{{ asset.id }}</td>
                <td>{{ asset.it_num }}</td>
                <td>{{ asset.name }}</td>
                <td>{{ asset.serialnum }}</td>
                <td>{{ asset.user_new }}</td>
                <td>{{ asset.localization }}</td>
                <td>{{ asset.status }}</td>
                <td>{{ asset.warranty_date }}</td>
                <td>{{ asset.recipt_date }}</td>
                <td><AssetActionData :asset="asset"></AssetActionData></td>
            </tr>
            
        </table>
        <div class="tableFotter">
            <div class="paginationSection">
                <button @click="pageMinus" v-if="page != 1"> < </button>
                <button @click="pagePlus"> > </button>
            </div>
            <div class="rowsSection">
                <button @click="changeLimit(limitOne)">{{ limitOne }}</button>
                <button @click="changeLimit(limitTwo)">{{ limitTwo }}</button>
                <button @click="changeLimit(limitThree)">{{ limitThree }}</button>
            </div>
        </div>
        
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

    .sortBtn{
        border: none;
        background-color: transparent;
        
    }
    
    .tableFotter{
        display: flex;
        justify-content: space-between;
        margin-top: 2%;

        button{
            border: 1px solid rgba(180, 179, 179, 0.781);
            padding: 5px 10px;
            margin: 3px;
            background-color: transparent;
            border-radius: 8px;
            transition: 0.3s;
        }

        button:hover{
            background-color: rgba(109, 109, 109, 0.781);
            color: #fff;
        }
    }

</style>