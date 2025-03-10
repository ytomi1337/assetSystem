<script setup>
import { ref, } from 'vue'
import UserToUser from '@/components/actions/UserToUser.vue';
import TransferProtocol from './protocols/TransferProtocol.vue';
import ReturnProtocol from './protocols/ReturnProtocol.vue';

const showActionForm = ref(false)
const activeForm = ref(null);

const disableActiveform = () =>{
  activeForm.value = null
}

const toggleForm = (formName) => {
  activeForm.value = activeForm.value === formName ? null : formName;
};

</script>
<template>
<nav class="navbar navbar-expand-lg bg-body-tertiary fixed-nav">
  <div class="container-fluid">
    <RouterLink :to="{ name: 'home' }" class="navbar-brand me-5 ms-5" href="#"><img src="../assets/Boerner-Insulation-Logo-2.png" width="180px"></RouterLink>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav  mb-lg-0">
        <li class="nav-item me-3">
          <RouterLink :to="{ name: 'asset-list' }" class="nav-link active" aria-current="page" href="#">Sprzęt IT</RouterLink>
        </li>
        <li class="nav-item me-3">
            <RouterLink :to="{ name: 'phone-list' }" class="nav-link" href="#">Telefony</RouterLink>
        </li>

        <li class="nav-item dropdown me-3">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Akcje
          </a>
          <ul class="dropdown-menu">
            <button class="dropdown-item" @click="toggleForm('userToUser')" >Przekazanie sprzetu miedzy uzytkownikami</button>
          </ul>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Protokoły
          </a>
          <ul class="dropdown-menu">
            
            <li><a class="dropdown-item" href="#" @click="toggleForm('przekazanie')">Protokol Przekazania</a></li>
            <li><a class="dropdown-item" href="#" @click="toggleForm('zwrot')">Protokol Zwrotu</a></li>
          </ul>
        </li>

      </ul>
    </div>
  </div>
</nav>


        <UserToUser 
        @disableWindow="disableActiveform" 
        v-if="activeForm === 'userToUser'">
        </UserToUser>

        <TransferProtocol
        @disableWindow="disableActiveform"
       
        v-if="activeForm === 'przekazanie'">
        </TransferProtocol>

        <ReturnProtocol
        @disableWindow="disableActiveform"
       
        v-if="activeForm === 'zwrot'">
        </ReturnProtocol>
   


</template>
<style>


</style>