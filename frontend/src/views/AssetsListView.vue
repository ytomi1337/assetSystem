<script setup>
    import assetService from '@/services/assetService';
    import AssetActionData from '@/components/AssetActionData.vue';
    import AssetCreate from '@/components/AssetCreate.vue';
    import Filters from '@/components/Filters.vue';
    import ArrowIcons from '@/components/ArrowIcons.vue';
    import { ref, onMounted, watchEffect,  } from 'vue'
    import { GStore } from '@/main';

    const assets = ref(null)
    const totalNum = ref(null)

    const page = ref(1)
    const limit = ref(25)
    const sortKey = ref('id')
    const sortValue = ref('asc')
    const sortSymbol = ref('&darr;&uarr;')
   
    const limitOne = ref(3)
    const limitTwo = ref(5)
    const limitThree = ref(25)

    const totalPages = ref(null)

    const showCreateForm = ref(false)
    const showFilterForm = ref(false)
    const isChange = ref(false)

    const filters = ref({})


    onMounted(() =>{
        watchEffect(()=>{ 
            let change = showCreateForm.value
            if (Object.keys(filters.value).length == 0)
                assetService.getAssets(page.value, limit.value, sortValue.value, sortKey.value)
                .then((response)=>{
                    assets.value = response.data.assets
                    totalNum.value = response.data.count
                    totalPages.value = totalNum.value / limit.value
                    
                }).catch((error)=>{
                    console.log(error);
                    console.log('wyzej error');
                })

        })
    })
    
    const filterAssets = (appliedFilters) =>{
        page.value = 1
        filters.value = appliedFilters
        // watchEffect(()=>{
            assetService.applyFilters(page.value, limit.value, sortValue.value, sortKey.value, filters.value)
                .then((response)=>{
                    assets.value = response.data.assets
                    totalNum.value = response.data.count
                    totalPages.value = totalNum.value / limit.value
                    
                }).catch((error)=>{
                    console.log(error);
                    console.log('wyzej error');
                }) 
                 
    // })  
    }

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
        page.value = 1
        limit.value = limitNum
    }  
    
    const disableShowCreateForm = (form) =>{
        if(form == 'create'){
            showCreateForm.value = false
        }else{
            showFilterForm.value = false
            console.log('wartosc przy wylaczaniu: ', filters.value);
        }

    }
    const enableShowCreateForm = (form) => {
        if(form == 'create'){
            showCreateForm.value = true
            showFilterForm.value = false
        }else{
            showFilterForm.value = true
        }
    }

    const refresh = () => {
        window.location.reload()
    }

    const formatDate = (isoDate) => {
        let date = new Date(isoDate);

        if(isoDate != null){
        return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
        }
        
    }


</script>

<template>
    <div id="flashMessage" v-if="GStore.flashMessage">{{ GStore.flashMessage }}</div>
    <div id="deletedMessage" v-if="GStore.deleteMessage">{{ GStore.deleteMessage }}</div>

    <transition name="fade">
        <AssetCreate @showCreate="disableShowCreateForm('create')" v-if="showCreateForm"></AssetCreate>
    </transition>
    <div class="containerBox">
        
        <div class="filterBar">
            <button class="navbtn createBtn" @click="enableShowCreateForm('create')">Utworz</button>
            <button class="navbtn" @click="enableShowCreateForm('filter')" >Filtr</button>
        </div>
        <transition name="slide-down">
             <Filters 
             @showCreate="disableShowCreateForm('filter')" 
             @filterApply="filterAssets" 
             v-if="showFilterForm"
             v-model="filters.value">
            </Filters>
        </transition>
        <table id="mainTable" class="mainTable">
            <tr class="tableHeader">
                <th>ID <button class="sortBtn" @click="toggleSort('id')" ><ArrowIcons :column="sortKey" :value="sortValue" :current="'id'"></ArrowIcons></button> </th>
                <th>Nr IT<button class="sortBtn" @click="toggleSort('it_num')"><ArrowIcons :column="sortKey" :value="sortValue" :current="'it_num'"></ArrowIcons></button></th>
                <th>Nazwa <button class="sortBtn" @click="toggleSort('name')"><ArrowIcons :column="sortKey" :value="sortValue" :current="'name'"></ArrowIcons></button></th>
                <th>Nr Seryjny <button class="sortBtn" @click="toggleSort('serialnum')"><ArrowIcons :column="sortKey" :value="sortValue" :current="'serialnum'"></ArrowIcons></button></th>
                <th>Użytkownik <button class="sortBtn" @click="toggleSort('user_new')"><ArrowIcons :column="sortKey" :value="sortValue" :current="'user_new'"></ArrowIcons></button></th>
                <th>Kategoria <button class="sortBtn" @click="toggleSort('category')"><ArrowIcons :column="sortKey" :value="sortValue" :current="'category'"></ArrowIcons></button></th>
                <th>Lokalizacja <button class="sortBtn" @click="toggleSort('localization')"><ArrowIcons :column="sortKey" :value="sortValue" :current="'localization'"></ArrowIcons></button></th>
                <th>Status <button class="sortBtn" @click="toggleSort('status')"><ArrowIcons :column="sortKey" :value="sortValue" :current="'status'"></ArrowIcons></button></th>
                <th>Data Gwarancji <button class="sortBtn" @click="toggleSort('warranty_date')"><ArrowIcons :column="sortKey" :value="sortValue" :current="'warranty_date'"></ArrowIcons></button></th>
                <th>Data Wydania <button class="sortBtn" @click="toggleSort('recipt_date')"><ArrowIcons :column="sortKey" :value="sortValue" :current="'recipt_date'"></ArrowIcons></button></th>
                <th>Akcje</th>
            </tr>
            <tr v-for="asset in assets" >
                <td>{{ asset.id }}</td>
                <td>{{ asset.it_num }}</td>
                <td>{{ asset.name }}</td>
                <td>{{ asset.serialnum }}</td>
                <td>{{ asset.user_new }}</td>
                <td>{{ asset.category }}</td>
                <td>{{ asset.localization }}</td>
                <td>{{ asset.status }}</td>
                <td>{{ formatDate(asset.warranty_date) }}</td>
                <td>{{ formatDate(asset.recipt_date)}}</td>
                <td><AssetActionData :asset="asset"></AssetActionData></td>
            </tr>
            
        </table>
        <div class="tableFotter">
            <div class="paginationSection">
                <button @click="pageMinus" v-if="page != 1"> < </button>
                <button @click="pagePlus" v-if="totalPages > page" > > </button>
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

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.1s ease-in-out;
}

.fade-enter-from {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

.fade-leave-from {
  opacity: 1;
}

.fade-leave-to {
  opacity: 0;
}

.slide-down-enter-active, 
.slide-down-leave-active {
    transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
}

.slide-down-enter-from {
  opacity: 0;
  transform: scaleY(0);
  transform-origin: bottom;
}

.slide-down-enter-to {
  opacity: 1;
  transform: scaleY(1);
}

 .slide-down-leave-from {
    opacity: 1;
  transform: scaleY(1);
}

.slide-down-leave-to {
    opacity: 0;
  transform: scaleY(0);
  transform-origin: top;
} 


    @keyframes yellowfade{
        from{
            background: rgb(144, 238, 144);
        }
        to{
            background: rgba(144, 238, 144, 0.185);
        }
    }

    @keyframes redFade{
        from{
            background: red;
        }
        to{
            background: rgba(245, 214, 214, 0.993);
        }
    }
    #flashMessage{
        animation-name: yellowfade;
        text-align: center;
        animation-duration: 7s;
    }

    #deletedMessage{
        color: #fff;
        animation-name: redFade;
        text-align: center;
        animation-duration: 7s;
    }
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
        margin-top: 1%;
        border-top: 1px solid black;
    }
    .filterBar{
        margin-top: 3%;
        width: 100%;

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