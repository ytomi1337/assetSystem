<script setup>
import AutoComplete from '../AutoComplete.vue'
import { ref } from 'vue';
</script>

<template>
 <div class="box-overlay">
    <div class="box">
        <h3>Przekazanie między użytkownikami</h3>
        <AutoComplete > </AutoComplete>
        <AutoComplete > </AutoComplete>
        <hr>
        </div>
        </div>
</template>

<style scoped> 
.box-overlay {
  transition: 0.5s;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

</style>