<script setup>
import assetService from '@/services/assetService';
import PhoneActionData from '@/components/PhoneActionData.vue';
import PhoneCreate from '@/components/PhoneCreate.vue';
import PhoneFilters from '@/components/PhoneFilters.vue';
import ArrowIcons from '@/components/ArrowIcons.vue';
import { ref, onMounted, watchEffect,  } from 'vue'
import { GStore } from '@/main';

    const phones = ref([])
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
            GStore.wasChange
            if (Object.keys(filters.value).length == 0)
                assetService.getPhones(page.value, limit.value, sortValue.value, sortKey.value)
                .then((response)=>{
                    phones.value = response.data.phones
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
            assetService.applyPhoneFilters(page.value, limit.value, sortValue.value, sortKey.value, filters.value)
                .then((response)=>{
                    phones.value = response.data.phones
                    totalNum.value = response.data.count
                    totalPages.value = totalNum.value / limit.value
                    
                }).catch((error)=>{
                    console.log(error);
                    console.log('wyzej error');
                }) 
    }

    const formatDate = (isoDate) => {
        let date = new Date(isoDate);

        if(isoDate != null){
        return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
        }
        
    }

    const changeLimit = (limitNum) =>  {
        page.value = 1
        limit.value = limitNum
    }  

    const toggleSort = (column) => {
        if(column){
          sortValue.value = sortValue.value == 'asc' ? 'desc':'asc';
          sortSymbol.value = sortValue.value == 'asc' ? '&darr;': '&uarr;';
        }
        sortKey.value = column

    };

    const disableShowCreateForm = (form) =>{
        if(form == 'create'){
            showCreateForm.value = false
        }else{
            showFilterForm.value = false
        }

    }
    const enableShowCreateForm = (form) => {
        if(form == 'create'){
            showCreateForm.value = true
            showFilterForm.value = false
        }else{
            showFilterForm.value = !showFilterForm.value
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
                <th>Nazwa<button class="sortBtn" @click="toggleSort('name')"><ArrowIcons :column="sortKey" :value="sortValue" :current="'name'"></ArrowIcons></button></th>
                <th>Kategoria <button class="sortBtn" @click="toggleSort('category')"><ArrowIcons :column="sortKey" :value="sortValue" :current="'category'"></ArrowIcons></button></th>
                <th>Użytkownik <button class="sortBtn" @click="toggleSort('user')"><ArrowIcons :column="sortKey" :value="sortValue" :current="'user'"></ArrowIcons></button></th>
                <th>Nr Tel <button class="sortBtn" @click="toggleSort('nr_tel')"><ArrowIcons :column="sortKey" :value="sortValue" :current="'nr_tel'"></ArrowIcons></button></th>
                <th>IMEI <button class="sortBtn" @click="toggleSort('imei')"><ArrowIcons :column="sortKey" :value="sortValue" :current="'imei'"></ArrowIcons></button></th>
                <th>PUK <button class="sortBtn" @click="toggleSort('puk')"><ArrowIcons :column="sortKey" :value="sortValue" :current="'puk'"></ArrowIcons></button></th>
                <th>PIN <button class="sortBtn" @click="toggleSort('pin')"><ArrowIcons :column="sortKey" :value="sortValue" :current="'pin'"></ArrowIcons></button></th>
                <th>Status <button class="sortBtn" @click="toggleSort('status')"><ArrowIcons :column="sortKey" :value="sortValue" :current="'status'"></ArrowIcons></button></th>
                <th>Data Wydania <button class="sortBtn" @click="toggleSort('recipt_date')"><ArrowIcons :column="sortKey" :value="sortValue" :current="'recipt_date'"></ArrowIcons></button></th>
                <th>Akcje</th>
            </tr>
            <tr v-for="phone in phones" >
                <td>{{ phone.id }}</td>
                <td>{{ phone.name }}</td>
                <td>{{ phone.category }}</td>
                <td>{{ phone.user }}</td>
                <td>{{ phone.nr_tel }}</td>
                <td>{{ phone.imei }}</td>
                <td>{{ phone.puk }}</td>
                <td>{{ phone.pin }}</td>
                <td>{{ phone.status }}</td>
                <td>{{ formatDate(phone.recipt_date)}}</td>
                <td><PhoneActionData :phone="phone"></PhoneActionData></td>
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