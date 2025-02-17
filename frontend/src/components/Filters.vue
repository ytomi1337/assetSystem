<script>

export default {
    emits: ['showCreate'],

    methods:{
            leaveComponent1(){
               this.$emit('showCreate')
            }
        },
    data(){
        return{
            selected: ''
        }
    }
}
</script>

<template>
    <div class="filter-wrapper">
        
        <div class="filter-containter">
            <v-select class="filterItem" multiple v-model="selected" :options="['Canada','United States']" placeholder="Nr It:"/>
            <v-select class="filterItem" multiple v-model="selected" :options="['Canada','United States']" placeholder="Nr Seryjny:"/>
            <v-select class="filterItem" multiple v-model="selected" :options="['Canada','United States']" placeholder="Uzytkownik:"/>
            <v-select class="filterItem" multiple v-model="selected" :options="['Canada','United States']" placeholder="Kategoria:"/>
            <v-select class="filterItem" multiple v-model="selected" :options="['Canada','United States']" placeholder="Lokalizacja:"/>
            <v-select class="filterItem" multiple v-model="selected" :options="['Canada','United States']" placeholder="Status:"/>
            <v-select class="filterItem" multiple v-model="selected" :options="['Canada','United States']" placeholder="Wydano:"/>
            <v-select class="filterItem" multiple v-model="selected" :options="['Canada','United States']" placeholder="Gwarancja:"/>   
         </div>
         <div class="button-container">
            <button type="button" class="applyBtn" @click="leaveComponent1">Zastosuj</button>
            <button type="button" class="leaveBtn" @click="leaveComponent1">Zamknij</button>
         </div>
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

.filterItem{
    width: calc(25% - 10px)
}

</style>