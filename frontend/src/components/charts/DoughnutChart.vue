<script setup>
import { defineProps } from 'vue'
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
} from 'chart.js'


ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)


const props = defineProps({
  chartData: Object,
  titleText: {
    type: String,
    default: 'Wykres'
  }
})


const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: props.titleText,
      font: {
        size: 18
      },
    }
  }
}
</script>

<template>
  <div class="chart-container">
    <Doughnut :data="props.chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>

</style>
