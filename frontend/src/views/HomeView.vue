<script setup>
  import { ref,onMounted, computed } from 'vue';
  import AutoComplete from '@/components/AutoComplete.vue';
  import assetService from '@/services/assetService';
  import { utilsStore } from '@/stores/mainStorege';


  const useUtilsStore = utilsStore()
  const reminders = ref([])
  const newReminder = ref({
    title: '',
    author: '',
    content: '',
    expiryDate: '',
    createdAt: ''
  })

  const localDate = ref({
    time: '',
    date: '',
  });

  const updateTime = () => {
        localDate.value.time = new Date().toLocaleTimeString();
        localDate.value.date = new Date().toLocaleDateString();
      };

  onMounted(()=>{

    updateTime();
    setInterval(updateTime, 60000);

    assetService.getReminder()
    .then((response)=>{
      reminders.value = response.data
    }).catch((error) =>{
      console.log(error);
    })
  })

  const crtReminder = () =>{

    assetService.createReminder(newReminder.value)
      .then(() =>{
      }).catch((error)=>{
        console.log(error);
      })
  }

  const updateUser = (receivedName) => {
    newReminder.value.author = receivedName;
  }
  const deleteReminder = (id) =>{
    if(confirm('Napewno chcesz usunać przypomnienie?')){
      assetService.deleteReminder(id)
      .then((response) => {
        console.log('succses', response);
      }).catch((error)=>{
        console.log(error);
      })
    }else{
      return false
    }
  }

</script>

<template>
  <div class="mainbox">
      <div class="reminderContainer">
        <div class="accordion">

          <div 
          class="accordion-item" 
          v-for="(reminder, index) in reminders"
          :key="index"
          >
            <form @submit="deleteReminder(reminder.id)">
              <h2 class="accordion-header">
                <button 
                class="accordion-button collapsed" 
                type="button" 
                data-bs-toggle="collapse" 
                :data-bs-target="'#collapse' + index" 
                :aria-controls="'collapse' + index">
                {{reminder.title}} 
                </button>
              </h2>

              <div 
              :id="'collapse' + index" 
              class="accordion-collapse collapse" 
              data-bs-parent="#reminderAccordion"
              >
                <div class="accordion-body">
                  <p><b>Osoba Zgłaszająca:</b> {{ reminder.author }}, 
                  <br><b>Data Zgłoszenia:</b> {{ useUtilsStore.formatDate(reminder.createdAt) }}
                  <br><b>Data Końca:</b> {{ useUtilsStore.formatDate(reminder.expiryDate) }}</p>

                  <p>{{ reminder.content }}</p>

                  <button type="submit" 
                  class="deleteReminderBtn">Usun</button>
                </div>
              </div>
           </form>
       </div>

      <div class="accordion-item">

          <h2 class="accordion-header">
            <button 
            class="accordion-button collapsed createReminder" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#collapse" 
            aria-controls="collapse"
            style="font-size: 1.2rem;">
            <b>Dodaj Przypomnienie</b>
            </button>
          </h2>

          <div 
          id="collapse" 
          class="accordion-collapse collapse" 
          data-bs-parent="#reminderAccordion"
          >
            <div class="accordion-body">
              <form @submit="crtReminder">
                <div class="mb-3">
                  <label for="userAutoComplete" class="form-label">Użytkownik:</label>
                  <AutoComplete id="userAutoComplete" @update-name="updateUser"></AutoComplete>
                </div>

                <div class="mb-3">
                  <label for="author"class="form-label">Temat:</label>
                  <input type="text" 
                  class="form-control"
                  id="author" 
                  rows="3"
                  v-model="newReminder.title"
                  required>
                </div>

                <div class="mb-3">
                  <label for="content"class="form-label">Treść Przypomnienia:</label>
                  <textarea class="form-control"
                  id="content" 
                  rows="2"
                  v-model="newReminder.content"></textarea>
                </div>

                <div class="mb-3">
                  <label for="dateTicekt" class="form-label">Data zakończenia: </label>
                  <input type="date" 
                  class="form-control" 
                  id="dateTicekt"
                  v-model="newReminder.expiryDate"
                  required>
                </div>

                <div class="mb-3">
                  <button type="submit" class="addReminderBtn">Dodaj</button>
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
p{
    margin: 0;
    padding: 0;
  }

.mainbox{
  width: 100%;
  height: 82vh;
  background-image: linear-gradient(rgba(244, 253, 252, 0.068), rgba(18, 19, 19, 0.658)), url(../assets/BG.jpg);
  background-position: center 50%;
  background-size: cover;
  position: relative;
  transition: 0.5s;
  display: flex;
  justify-content: flex-end;
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
#dateTicekt:hover{
  cursor: pointer;
}
.createReminder:not(.collapsed) {
  background-color: #8dd66c;
}

.addReminderBtn{
  padding: 5px 20px;
  border-radius: 5px;
  border: 1px solid rgb(209, 207, 207);
  background-color: #8dd66c;
  transition: 0.2s;
  display: flex;
  justify-self: flex-end;
}
.addReminderBtn:hover{
  scale: 1.1;
  background-color: #a5e986;
}
.deleteReminderBtn{
  padding: 5px 20px;
  border-radius: 5px;
  border: 1px solid rgb(209, 207, 207);
  background-color: #eb1414d7;
  color: #fff;
  transition: 0.2s;
  display: flex;
  justify-self: flex-end;
}
.deleteReminderBtn:hover{
  scale: 1.1;
  background-color: #e92b24d7;
}

@media only screen and (max-width: 600px) {
  .reminderContainer{
    margin-right: 0;
    width: 100%;
  }
  .timeContainer{
  display: none;
  }
  .accordion-button{
    font-size: 0.7rem;
    height: 40px;
  }
}
</style>