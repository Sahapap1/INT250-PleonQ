<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

import users from '@/data/users.json'

const auth = useAuthStore()



const router = useRouter()

const username = ref('')
const password = ref('')

const handleLogin = () => {
    const user = users.find(
        u => u.username === username.value && u.password === password.value
    )

    if (user) {
        auth.login(user)
        if (user.role === 'admin') {
            router.push('/admin')
        } else {
            router.push('/')
        }
    }
}
</script>

<template>
    <div class="min-h-screen flex flex-col md:flex-row">

        <!-- Left (Image) -->
        <div class="hidden md:flex md:w-3/4 h-screen relative overflow-hidden">
            <img src="../assets/img/login-bg.png" class="w-full h-full object-cover" />
        </div>
        <!-- 🔐 Right (Form) -->
        <div class="flex flex-col justify-center items-center w-full md:w-1/2 px-6 py-10 bg-white">

            <!-- Logo -->
            <div class="flex flex-col items-center mb-8">
                <img src="../assets/logo.png" class="w-35 mb-2" />
            </div>

            <!-- mobile img -->
            <div class="-mx-6 mb-4 relative md:hidden">
                <img src="../assets/img/login-bg.png" class="w-full h-[260px] object-cover" />


                <div class="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent"></div>

                <div class="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent"></div>

                <div class="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white to-transparent"></div>

                <div class="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent"></div>
            </div>

            <!-- Form -->
            <div class="w-full max-w-sm flex flex-col gap-4">

                <!-- Username -->
                <div>
                    <label class="text-sm text-gray-500">Username</label>
                    <div class="flex items-center bg-gray-100 rounded-full px-4 py-2 mt-1 shadow-inner">
                        <i class="fa-solid fa-user text-gray-400 mr-2"></i>
                        <input v-model="username" type="text" placeholder="Username" @keyup.enter="handleLogin"
                            class="bg-transparent outline-none w-full text-sm" />
                    </div>
                </div>

                <!-- Password -->
                <div>
                    <label class="text-sm text-gray-500">Password</label>
                    <div class="flex items-center bg-gray-100 rounded-full px-4 py-2 mt-1 shadow-inner">
                        <i class="fa-solid fa-lock text-gray-400 mr-2"></i>
                        <input v-model="password" type="password" placeholder="Password" @keyup.enter="handleLogin"
                            class="bg-transparent outline-none w-full text-sm" />
                    </div>
                </div>

                <!-- Button -->
                <button @click="handleLogin"
                    class="mt-4 bg-orange-gradient text-white py-2.5 rounded-full font-semibold hover:opacity-90 transition flex items-center justify-center gap-2">
                    <i class="fa-solid fa-arrow-right-to-bracket"></i>
                    Login
                </button>

            </div>

        </div>

    </div>
</template>