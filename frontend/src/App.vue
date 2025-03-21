<script setup>
import { RouterView } from 'vue-router'
import Navigation from './components/Navigation.vue'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'


</script>

<template>
  <Navigation />
  <!-- <NavBar /> -->
  <RouterView />
  <Footer>hi</Footer>
</template>

<style>

</style>

