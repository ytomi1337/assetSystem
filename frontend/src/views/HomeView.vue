<script setup>
import { ref, } from 'vue';

const reminders = ref([])
</script>

<template>
  <div class="mainbox">
      <div class="someContainer ">
        <h1></h1>
      </div>

      <div class="reminderContainer">
        <h2 v-if="reminders.length == 0">Brak Przypomnień na dzisiaj</h2>
        <h2 v-else>Aktualne Przypomnienia</h2>
        <hr>

        
      </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: "Montserrat", sans-serif;
  box-sizing: border-box;
}

.mainbox{
  width: 100%;
  height: 80vh;
  background-image: linear-gradient(rgba(244, 253, 252, 0.068), rgba(18, 19, 19, 0.658)), url(../assets/BG.jpg);
  background-position: center 50%;
  background-size: cover;
  position: fixed;
  transition: 0.5s;
  display: flex;
  justify-content: space-between;
}
.someContainer{
  background-color: #fff;
  margin-left: 10%;
  width: 30%;
  height: 30%;
  border-radius: 20px 20px 0 0;
  align-self: flex-end;
}

.reminderContainer{
  background-color: rgba(248, 249, 250);
  margin-right: 10%;
  width: 30%;
  height: 30%;
  border-radius: 0 0 20px 20px;
  display: flex;
  flex-direction: column;
  text-align: center;

  hr{
    color: black;
    width: 100%;
  }
}

</style>