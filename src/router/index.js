import { createRouter, createWebHistory } from 'vue-router'

// pages
import MainLayout from '@/layouts/MainLayout.vue'
import Home from '@/views/Home.vue'
import About from '@/views/TaskManagement.vue'
import ProfileView from '@/views/ProfileView.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: 'taskManagement',
        name: 'TaskManagement',
        component: About
      },
      {
        path: 'profile',
        name: 'Profile',
        component: ProfileView
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router