import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AssetsListView from '@/views/AssetsListView.vue'
import PhoneListView from '@/views/PhoneListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/phones',
      name: 'phone-list',
      component: PhoneListView,
    },
    {
      path: '/assets',
      name: 'asset-list',
      component: AssetsListView
    }
  ],
})

export default router
