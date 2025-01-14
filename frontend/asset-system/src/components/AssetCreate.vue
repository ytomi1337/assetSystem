<script>

    
</script>

<template>
<div class="box-overlay">
  <div class="box">
    <h2 class="mb-4">Dodaj Urządzenie:</h2>

    <form>
      <div class="formRecord">
      <label for="it_num">Nr działu IT:</label>
      <input type="text" />
      </div>

      <div class="formRecord">
      <label for="name">Nazwa:</label>
      <input type="text" />
      </div>

      <div class="formRecord">
      <label for="serialnum">Nr Seryjny:</label>
      <input type="text" />
      </div>

      <div class="formRecord">
      <label for="user_new">Użytkownik:</label>
      <input type="text" />
      </div>

      <div class="formRecord">
      <label for="localization">localization:</label>
      <input type="text" />
      </div>

      <div class="formRecord">
      <label for="warranty_date">Data Gwarancji:</label>
      <input type="text" />
      </div>

      <div class="formRecord">
      <label for="recpit_date">Data Wydania:</label>
      <input type="text" />
      </div>

      <div class="buttonSection">
      <button class="formBtn">Utworz</button>
      <button class="formBtn">Zamknij</button>
      </div>
    </form>
  </div>
</div>

   
</template>

<style>
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
  max-width: 400px;
  width: 100%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.formRecord{
  display: flex;
  flex-direction: column;
  margin-top: 10px;

  label{
    font-weight: 500;
  }
}

.formBtn{
    margin-top: 13%;
    padding: 5px 15px;
    border: solid 1px rgba(180, 179, 179, 0.781);
    margin-right: 2%;
    border-radius: 5px;
    transition: 0.3s;
    background-color: #eb1414d7;
    color: #fff;
}

.formBtn:hover{
  background-color: #8a1515e6
}
.formBtn:first-child{
    background-color: #71cc5eda;
}
.formBtn:first-child:hover{
    background-color: #398d23c9;
    color: #fff;
}
</style>