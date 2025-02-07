import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AssetsListView from '@/views/AssetsListView.vue'
import PhoneListView from '@/views/PhoneListView.vue'
import AssetDetalisView from '@/views/AssetDetalisView.vue'
import NotFound from '@/views/NotFound.vue'

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
    },
    {
      path: '/assets/:id',
      name: 'asset-detalis',
      props: true,
      component: AssetDetalisView
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound,
      props: {
        resource: ''
      }
    },
    {
      path: '/404/:resource',
      name: '404Resource',
      component: NotFound,
      props: true
    }
    
  ],

})

export default router
