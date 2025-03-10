<script setup>

import { ref, defineEmits, defineProps, watch , onMounted, computed} from 'vue';
import assetService from '@/services/assetService';

const emits = defineEmits(['showCreate', 'filterApply', 'update:modelValue'])
const props = defineProps(['modelValue',])

const phoneFilters = ref({
    name: props.modelValue?.name || '',
    category: props.modelValue?.category || '',
    user: props.modelValue?.user || '',
    nr_tel: props.modelValue?.nr_tel || '',
    imei: props.modelValue?.imei || '',
    puk: props.modelValue?.puk || '',
    pin: props.modelValue?.pin || '',
    status: props.modelValue?.status || '',
})

const applyFilters = () =>{
    event.preventDefault();
    emits('filterApply', phoneFilters.value)
}

</script>

<template>
    <div class="filter-wrapper">
        <form @submit="applyFilters">
            <div class="filter-containter">
                <input type="text" class="filterItem" v-model="phoneFilters.name"  placeholder="Nazwa:"/>
                <v-select class="filterItem" multiple v-model="phoneFilters.category" placeholder="Kategoria:"/>
                <v-select class="filterItem" multiple v-model="phoneFilters.user" placeholder="Uzytkownik:"/>
                <input type="text" class="filterItem" v-model="phoneFilters.nr_tel"  placeholder="Nr Tel:"/>
                <input type="text" class="filterItem" v-model="phoneFilters.imei"  placeholder="IMEI:"/>
                <input type="text" class="filterItem" v-model="phoneFilters.puk"  placeholder="PUK:"/>
                <input type="text" class="filterItem" v-model="phoneFilters.pin"  placeholder="PIN:"/>
                <v-select class="filterItem" multiple v-model="phoneFilters.status" placeholder="Status:"/> 
            </div>
            <div class="button-container">
                <button type="submit" class="applyBtn">Zastosuj</button>
                <button type="button" class="leaveBtn" @click="leaveComponent1">Zamknij</button>
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