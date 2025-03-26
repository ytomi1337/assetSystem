<script setup>
import { RouterView } from 'vue-router'
import Navigation from './components/Navigation.vue'
import Footer from './components/Footer.vue'
import { GStore } from '@/main';


</script>

<template>
  <Navigation />
  <div id="flashMessage" v-if="GStore.flashMessage">{{ GStore.flashMessage }}</div>
  <div id="deletedMessage" v-if="GStore.deleteMessage">{{ GStore.deleteMessage }}</div>
  <RouterView />
  <Footer>hi</Footer>
</template>

<style>
@keyframes yellowfade{
        from{
            background: rgb(144, 238, 144);
        }
        to{
            background: rgba(144, 238, 144, 0.185);
        }
    }

    @keyframes redFade{
        from{
            background: red;
        }
        to{
            background: rgba(245, 214, 214, 0.993);
        }
    }
    #flashMessage{
        animation-name: yellowfade;
        text-align: center;
        animation-duration: 7s;
    }

    #deletedMessage{
        color: #fff;
        animation-name: redFade;
        text-align: center;
        animation-duration: 7s;
    }
</style>

