


import { createApp, reactive, } from 'vue'
import { createPinia } from 'pinia'
import { bootstrap } from 'bootstrap/dist/js/bootstrap.bundle'

import 'bootstrap/dist/css/bootstrap.css'

import App from './App.vue'
import router from './router'



import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

const app = createApp(App)


app.use(createPinia())
app.use(router)

export const GStore = reactive({
    flashMessage: '',
    deleteMessage: '',
    editMessage: ''
})
app.provide('GStore', GStore)

app.component('v-select', vSelect);
app.mount('#app')

