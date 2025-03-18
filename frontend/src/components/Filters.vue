<script setup>

import { ref, defineEmits, defineProps, watch , onMounted, computed} from 'vue';
import { utilsStore } from '@/stores/mainStorege';

const useUtilsStore = utilsStore()
const emits = defineEmits(['showCreate', 'filterApply', 'update:modelValue'])
const props = defineProps(['modelValue',])

const filters = ref({
    name: props.modelValue?.name || '',
    it_num: props.modelValue?.it_num || '',
    serialnum: props.modelValue?.serialnum || '',
    user_new: props.modelValue?.user_new || '',
    localization: props.modelValue?.localization || '',
    category: props.modelValue?.category || '',
    status: props.modelValue?.status || '',
    isWarranty: props.modelValue?.isWarranty || '',
})


onMounted(() => {
    useUtilsStore.loadAllData()
})

const applyFilters = () =>{
    event.preventDefault();
    emits('filterApply', filters.value)
}

</script>

<template>
    <div class="filter-wrapper">
        <form @submit="applyFilters">
            <div class="filter-containter">
                <input type="text" class="filterItem" v-model="filters.it_num"  placeholder="Nr It:"/>
                <input type="text" class="filterItem" v-model="filters.name"  placeholder="Nazwa:"/>
                <input type="text" class="filterItem" v-model="filters.serialnum"  placeholder="Nr Seryjny:"/> 
                <v-select class="filterItem" multiple v-model="filters.user_new" :options="useUtilsStore.users" placeholder="Uzytkownik:"/>
                <v-select class="filterItem" multiple v-model="filters.category" :options="useUtilsStore.categories" placeholder="Kategoria:"/>
                <v-select class="filterItem" multiple v-model="filters.localization" :options="useUtilsStore.localizations" placeholder="Lokalizacja:"/>
                <v-select class="filterItem" multiple v-model="filters.status" :options="useUtilsStore.statuses" placeholder="Status:"/>
                <v-select class="filterItem" v-model="filters.isWarranty" :options="useUtilsStore.isWarranty" placeholder="Gwarancja:"/>   
            </div>
            <div class="button-container">
                <button type="submit" class="applyBtn">Zastosuj</button>
                <button type="button" class="leaveBtn" @click="emits('showCreate')">Zamknij</button>
            </div>
        </form>
    </div>
</template>

<style scoped> 

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