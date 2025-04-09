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
    <Doughnut :data="props.chartData" :options="props.chartOptions" />
  </div>
</template>

<style scoped>
.chart-container {
  display: flex;
  justify-content: center;
}
</style>