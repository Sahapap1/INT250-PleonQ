import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/authStore'

// pages
import MainLayout from '@/layouts/MainLayout.vue'
import Home from '@/views/Home.vue'
import TaskManagement from '@/views/TaskManagement.vue'
import Profile from '@/views/Profile.vue'
import JobDetail from '@/views/JobDetail.vue'
import AdminDashboard from '@/views/AdminDashboard.vue'
import CreateJob from '@/views/CreateJob.vue'
import Login from '@/views/Login.vue'
import AdminProfile from '@/views/AdminProfile.vue'


const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
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
        path: 'admin',
        name: 'AdminDashboard',
        component: AdminDashboard
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile
      },
      {
        path: 'admin/profile',
        name: 'AdminProfile',
        component: AdminProfile
      },
      {
        path: 'admin/create-job',
        name: 'CreateJob',
        component: CreateJob
      },

      {
        path: 'job/:id',
        name: 'JobDetail',
        component: JobDetail
      }

    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  if (!auth.isAuth && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})

export default router