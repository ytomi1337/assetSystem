<script setup>
import { ref, } from 'vue';
import AutoComplete from '@/components/AutoComplete.vue';

const reminders = ref([
        { title: "Przygotowanie sprzętu dla nowego pracownika", content: "Prośba o wydanie sprzęt Laptop stacja Dwa monitory dla użytkonika Tomasz Lubczyl", user: "Kinga Piróg", date: "10-05-2025" },
        { title: "Odebranie Sprzetu od Pracownika", content: "Don't forget to call John", user: "Kinga Piróg", date: "10-05-2025" },
      ])
</script>

<template>
  <div class="mainbox">
      <div class="someContainer ">
        <h1></h1>
      </div>

      <div class="reminderContainer">
        <div class="accordion " 
        id="reminderAccordion">

          <div class="accordion-item" 
          v-for="(reminder, index) in reminders"
          :key="index">

          <h2 class="accordion-header">
            <button class="accordion-button collapsed" 
            type="button" 
            data-bs-toggle="collapse" 
            :data-bs-target="'#collapse' + index" 
            :aria-controls="'collapse' + index">
            {{reminder.title}} 
            </button>
          </h2>

          <div :id="'collapse' + index" 
          class="accordion-collapse collapse" 
          data-bs-parent="#reminderAccordion">
          <div class="accordion-body">
          <p><b>Osoba Zgłaszająca:</b> {{ reminder.user }}, <br> <b>Data Zgłaszająca:</b> {{ reminder.date }}</p>

          {{ reminder.content }}
          </div>


        </div>
      </div>

      <div class="accordion-item">

          <h2 class="accordion-header">
            <button class="accordion-button collapsed createReminder" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#collapse" 
            aria-controls="collapse"
            style="font-size: 1.2rem;">
            <b>Dodaj Przypomnienie</b>
            </button>
          </h2>

          <div id="collapse" 
          class="accordion-collapse collapse" 
          data-bs-parent="#reminderAccordion">
          <div class="accordion-body">
            <form>
              <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Użytkownik:</label>
              <AutoComplete id="exampleFormControlInput1"></AutoComplete>
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">Treść Przypomnienia:</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>

            <div class="mb-3">
              <label for="exampleFormControlTextareaDate" class="form-label">Treść Przypomnienia:</label>
              <input type="date" class="form-label" id="exampleFormControlTextareaDate">
            </div>
            </form>
          </div>
        </div>
      </div>
        </div>

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
  border-top: 1px solid rgb(240, 235, 235);
  margin-right: 10%;
  width: 30%;
  height:min-content;
  border-radius: 0 0 20px 20px;
  display: flex;
  flex-direction: column;
}
.createReminder{
    background-color: #8dd66c;
  }

</style>