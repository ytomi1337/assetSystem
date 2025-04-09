<script setup>
import { defineProps } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
} from 'chart.js'

// Rejestracja modułów Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

// Definicja props
const props = defineProps({
  chartData: {
    type: Object,
    required: true
  },
  chartOptions: {
    type: Object,
    default: () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top'
        }
      }
    })
  }
})
</script>

<template>
  <div class="chart-container">
    <Bar :data="props.chartData" :options="props.chartOptions" />
  </div>
</template>

<style scoped>
.chart-container {
  display: flex;
  justify-content: center;
}
</style>