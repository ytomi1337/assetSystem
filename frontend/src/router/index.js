import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AssetsListView from '@/views/AssetsListView.vue'
import PhoneListView from '@/views/PhoneListView.vue'
import AssetDetalisView from '@/views/AssetDetalisView.vue'
import ActivityLogsView from '@/views/AvtivityLogsView.vue'
import PhoneDetalisView from '@/views/PhoneDetalisView.vue'
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
    },
    {
      path: '/phones/:id',
      name: 'phone-detalis',
      props: true,
      component: PhoneDetalisView
    },
    {
      path: '/logs',
      name: 'activity-logs',
      props: true,
      component: ActivityLogsView
    },
    
  ],
  scrollBehavior() {
    return { top: 0 };
  }

})

export default router
