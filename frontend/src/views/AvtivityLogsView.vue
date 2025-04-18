<script setup>
    import { ref, onMounted } from 'vue'
    import assetService from '@/services/assetService'; 
    import { GStore } from '@/main';

    const logs = ref([])
    const totalNum = ref(null)
    const totalPages = ref(null)

    const page = ref(1)
    const limit = ref(25)
    const sortKey = ref('id')
    const sortValue = ref('asc')
    const sortSymbol = ref('&darr;&uarr;')
    
    const limitOne = ref(3)
    const limitTwo = ref(5)
    const limitThree = ref(25)

    onMounted ( async () =>{
        try {
            await assetService.getActivityLogs(page.value, limit.value, sortValue.value, sortKey.value).then((response) =>{
                logs.value = response.data.logs
                totalNum.value = response.data.count
                totalPages.value = totalNum.value / limit.value
            })

            console.log(logs.value);
        }catch(error){
            console.log('Error podczas ładowania danych', error);
        }
    })

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
        <PhoneCreate
         @showCreate="disableShowCreateForm('create')" 
         v-if="showCreateForm">
         </PhoneCreate>
    </transition>

    <div class="containerBox">
        
        <div class="filterBar">
            <button class="navbtn createBtn" @click="enableShowCreateForm('create')">Utworz</button>
            <button class="navbtn" @click="enableShowCreateForm('filter')" >Filtr</button>
        </div>

        <transition name="slide-down">
             <PhoneFilters 
             @showCreate="disableShowCreateForm('filter')" 
             @filterApply="filterAssets" 
             v-if="showFilterForm"
             v-model="filters">
            </PhoneFilters>
        </transition>

        <table id="mainTable" class="mainTable">
            <tr class="tableHeader">
                <th>ID <button class="sortBtn" @click="toggleSort('id')" ><ArrowIcons :column="sortKey" :value="sortValue" :current="'id'"></ArrowIcons></button> </th>
                <th>OperationNumber<button class="sortBtn" @click="toggleSort('operationNumber')"><ArrowIcons :column="sortKey" :value="sortValue" :current="'operationNumber'"></ArrowIcons></button></th>
                <th>Asset It Num <button class="sortBtn" @click="toggleSort('it_number')"><ArrowIcons :column="sortKey" :value="sortValue" :current="'it_number'"></ArrowIcons></button></th>
                <th>Action <button class="sortBtn" @click="toggleSort('action')"><ArrowIcons :column="sortKey" :value="sortValue" :current="'action'"></ArrowIcons></button></th>
                <th>Device ID <button class="sortBtn" @click="toggleSort('deviceId')"><ArrowIcons :column="sortKey" :value="sortValue" :current="'deviceId'"></ArrowIcons></button></th>
                <th>User <button class="sortBtn" @click="toggleSort('user')"><ArrowIcons :column="sortKey" :value="sortValue" :current="'user'"></ArrowIcons></button></th>
                <th>Target User <button class="sortBtn" @click="toggleSort('targetUser')"><ArrowIcons :column="sortKey" :value="sortValue" :current="'targetUser'"></ArrowIcons></button></th>
                <th>Description <button class="sortBtn" @click="toggleSort('description')"><ArrowIcons :column="sortKey" :value="sortValue" :current="'description'"></ArrowIcons></button></th>
                <th>Utworzono <button class="sortBtn" @click="toggleSort('createdAt')"><ArrowIcons :column="sortKey" :value="sortValue" :current="'createdAt'"></ArrowIcons></button></th>
            </tr>
            <tr v-for="log in logs" >
                <td>{{ log.id }}</td>
                <td>{{ log.operationNumber }}</td>
                <td>{{ log.it_number }}</td>
                <td>{{ log.action }}</td>
                <td>{{ log.deviceId }}</td>
                <td>{{ log.user }}</td>
                <td>{{ log.targetUser }}</td>
                <td>{{ log.description }}</td>
                <td>{{ formatDate(log.createdAt)}}</td>
                <!-- <td><PhoneActionData :phone="phone"></PhoneActionData></td> -->
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

<style scoped>

th{
        text-align: center;
        background-color: #fdf9f9;
        padding: 10px 0px;
    }
    td{
        text-align: center;
        padding-bottom: 5px;
        border-bottom: 1px solid #dedede;
    }
    .containerBox{
        margin-left: 10%;
        margin-right: 10%;
        width: 80%;
    }
    .mainTable{
        width: 100%;
        margin-top: 1%;
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