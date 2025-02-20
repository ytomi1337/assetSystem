<script setup>

import { ref, defineEmits} from 'vue';

const emits = defineEmits(['showCreate', 'filterApply'])

const filters = ref({
    name: '',
    it_num: '',
    serialnum: '',
    user_new: '',
    localization:'' ,
    category:'' ,
    status: '',
    isWarranty: '',
})

const leaveComponent1 = () =>{
    emits('showCreate')
}

const applyFilters = () =>{
    event.preventDefault();
    emits('filterApply', filters.value)
}

</script>

<template>
    <div class="filter-wrapper">
        <form @submit="applyFilters">
            <div class="filter-containter">
                <input type="text" class="filterItem" v-model="filters.name"  placeholder="Nazwa:"/>
                <input type="text" class="filterItem" v-model="filters.it_num"  placeholder="Nr It:"/>
                <input type="text" class="filterItem" v-model="filters.serialnum"  placeholder="Nr Seryjny:"/> 
                <v-select class="filterItem" multiple v-model="filters.user_new" :options="['Canada','United States']" placeholder="Uzytkownik:"/>
                <v-select class="filterItem" multiple v-model="filters.localization" :options="['Canada','United States']" placeholder="Lokalizacja:"/>
                <v-select class="filterItem" multiple v-model="filters.category" :options="['Canada','United States']" placeholder="Kategoria:"/>
                <v-select class="filterItem" multiple v-model="filters.status" :options="['Canada','United States']" placeholder="Status:"/>
                <v-select class="filterItem" multiple v-model="filters.isWarranty" :options="['Canada','United States']" placeholder="Gwarancja:"/>   
            </div>
            <div class="button-container">
                <button type="submit" class="applyBtn">Zastosuj</button>
                <button type="button" class="leaveBtn" @click="leaveComponent1">Zamknij</button>
            </div>
        </form>
    </div>
</template>

<style > 

button{
    padding: 5px 15px;
    background: none;
    border: solid 1px rgba(180, 179, 179, 0.781);
    border-radius: 5px;
}
.button-container{
    display: flex;
    justify-content: end;
    gap: 10px;
    margin-right: 10px;
}
.filter-containter{
    margin: 10px 0;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}
input{
    border-radius: 5px;
    border: 1px solid rgba(60, 60, 60, .26);
    padding: 0 2px;
}
.filterItem{
    width: calc(25% - 10px)
}

</style>