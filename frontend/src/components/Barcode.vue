<template>
    <svg ref="barcode"></svg>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue'
  import JsBarcode from 'jsbarcode'
  
  const props = defineProps({
    asset: {
      type: Object,
      required: true
    }
  })
  
  const barcode = ref(null)
  
  const generateDataString = (asset) => {
     return `${asset.it_num} | ${asset.name} | ${asset.serialnum} | ${asset.user_new}`
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
  