import { createRouter, createWebHistory } from 'vue-router'

// pages
import MainLayout from '@/layouts/MainLayout.vue'
import Home from '@/views/Home.vue'
import TaskManagement from '@/views/TaskManagement.vue'
import Profile from '@/views/Profile.vue'


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
        component: TaskManagement
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile
      },

    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router