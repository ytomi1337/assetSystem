<script setup>
    import assetService from '@/services/assetService';
    import { ref, onMounted, computed } from 'vue';
    import BarcodePrint from '../BarcodePrint.vue';
    
    const assets = ref([])
    const minQuery = ref(null)
    const maxQuery = ref(null)

    const min = ref(null)
    const max = ref(null)

    const isLoading = ref(false)

    const printTemplateRef = ref(null);
   
    onMounted( async ()=>{
        try{
            await assetService.getItNum().then((response)=>{
                minQuery.value = response.data.min
                maxQuery.value = response.data.max
            })
        }catch(error){
            console.error('Bład podczas zaczytawania numerow IT', error)
        }
    })

    const printForm = async (event) => {

        event.preventDefault()
        isLoading.value = true
        try{
            await assetService.getItNum(min.value, max.value).then((response) => {
                assets.value = response.data.assets
            })

        }catch(error){
            console.error('Bład podczas ładowania danych z zakresu: ', error)
        }

        const { default: html2pdf } = await import('html2pdf.js');
        const element = printTemplateRef.value.printContent;
        html2pdf()
            .from(element)
            .set({
                margin: 0,
                filename: 'barcode-labels.pdf',
                html2canvas: { scale: 3 },
                jsPDF: {
                unit: 'mm',
                format: [17, 105], // Wymiary jednej strony
                orientation: 'landscape',
                },
            })
            .toPdf()
            .get('pdf')
            .then(pdf => {
            pdf.autoPrint();
            window.open(pdf.output('bloburl'), '_blank'); 
            });

        isLoading.value = false
    };
</script>

<template>
    
    <div class="box-overlay">
        <div class="box">
            <form @submit="printForm">

                <h4>Drukowanie kodów kreskowych dla sprzętu IT</h4>
                <hr>
                <h6>Wybierz Zakres numerów działu IT:</h6>
                <p>Dostępny zakres:  {{ minQuery }} - {{ maxQuery }}</p>

                <div class="inputSection">
                    <label for="min"> Od ITBI_: </label>
                    <input type="number" min="00000" name="min" v-model="min">

                    <label for="max">Do ITBI_:</label>
                    <input type="number" min="00000" name="max" v-model="max">
                </div>

                <p v-if="isLoading" class="infoSectio">
                <span class="spinner"></span> Generowanie Kodów...
                </p>
                
                <div class="btnSection">
                    <button type="submit"><i class="fa-solid fa-print icon"></i>Drukuj</button>
                </div>
            
            </form>
        </div>

        <div class="hidden-print" style="display: none;">
        <BarcodePrint 
        ref="printTemplateRef"
        :assets="assets"
        />
     </div>
    </div>
</template>

<style scoped>
    @keyframes spin {
    to {
        transform: rotate(360deg);
    }
    }
    .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border-left-color: #09f;
    animation: spin 1s linear infinite;
    display: inline-block;
    vertical-align: middle;
    margin-right: 8px;
    }

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

        .btnSection{
            margin-top: 2%;

            button{
            background-color: transparent;
            border: none;
            color: rgb(84, 84, 84);

            }      
        }

        .icon{
            font-size: 1.3rem;
            margin-right: 5px;
        }
    }
</style>