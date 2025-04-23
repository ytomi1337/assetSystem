<script setup>
    import { ref, defineProps, onMounted, watch } from 'vue';

    const props = defineProps({
        asset: {
            type: Object,
            required: true,
        }
    })

    const barcode = ref(null)
    const printContent = ref(null)

    defineExpose({ printContent })

    const generateDataString = (asset) => {
     return `${asset.it_num} | ${asset.name} | ${asset.serialnum} `
    }
    const renderBarcode = (value) => {
        if (barcode.value) {
        JsBarcode(barcode.value, value, {
            format: 'CODE128',
            lineColor: '#000',
            width: 1,
            height: 70,
            displayValue: true,
            text: props.asset.it_num
        })
        }
    }
    
    onMounted(() => {
    renderBarcode(generateDataString(props.asset))
    })
    
    watch(() => props.asset, (newDevice) => {
        renderBarcode(generateDataString(newDevice))
    }, { deep: true })
        
</script>

<template>
    <div ref="printContent" class="barcode-wrapper">
        <svg ref="barcode"></svg>
    </div>
</template>