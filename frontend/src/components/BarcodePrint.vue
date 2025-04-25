<script setup>
import { ref, defineProps, onMounted, watch, nextTick, computed } from 'vue';

const props = defineProps({
    assets: {
        type: Array,
        default: () => []
    },
    asset: {
        type: Object,
        default: null
    }
});


const assetsToUse = computed(() => {
    if (props.asset) {
        return [props.asset];
    }
    return props.assets;
});

const printContent = ref(null);
defineExpose({ printContent });

const barcodeRefs = ref([]);

const setBarcodeRef = (el, index) => {
    if (el) {
        barcodeRefs.value[index] = el;
    }
};

const generateDataString = (asset) => {
    return `${asset.it_num} | ${asset.name} | ${asset.serialnum}`;
};

const renderBarcodes = async () => {
    await nextTick();

    barcodeRefs.value.forEach((el, index) => {
        if (el) {
            const asset = assetsToUse.value[index];
            JsBarcode(el, generateDataString(asset), {
                format: 'CODE128',
                lineColor: '#000',
                width: 1,
                height: 30,
                displayValue: true,
                text: asset.it_num,
                fontSize: 10,
                fontOptions: 'bold'
            });
        }
    });
};

onMounted(() => {
    renderBarcodes();
});

watch(() => assetsToUse.value, () => {
    barcodeRefs.value = [];
    renderBarcodes();
}, { deep: true });

</script>

<template>
    <div ref="printContent" class="barcode-wrapper">
        <div v-for="(asset, index) in assetsToUse" :key="asset.it_num" class="page-break">
            <svg :ref="el => setBarcodeRef(el, index)" class="barcode"></svg>
        </div>
    </div>
</template>

<style scoped>
.page-break{
  page-break-after: always;
  break-after: page;
  display: flex;
  justify-content: center;
  align-items: center;
}

.barcode{
  transform: rotate(90deg);
}
</style>


