<script setup>

</script>

<template>
    <div class="box-overlay">
        <div class="box">
            <h4>Drukowanie kodów kreskowych dla sprzętu IT</h4>
            <hr>
            <h6>Wybierz Zakres:</h6>

            <div class="inputSection">
                <label for="min"> Od: </label>
                <input type="number" min="00000" name="min">

                <label for="max">Do :</label>
                <input type="number" min="00000" name="max">
            </div>
        </div>
    </div>
</template>

<style scoped>
    .box-overlay {
    z-index: 3;
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
    display: flex;
    flex-direction: column;
    text-align: left;
    background: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 600px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);

        .inputSection{
            display: flex;
            justify-content: space-around;
            margin-top: 2%;
        }
    }
</style>