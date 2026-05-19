<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

import users from '@/data/users.json'

const auth = useAuthStore()
const errorMessage = ref('')


const router = useRouter()

const username = ref('')
const password = ref('')

onMounted(() => {
    if (
        sessionStorage.getItem("theme") === "dark" ||
        (!("theme" in sessionStorage) &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
        document.documentElement.classList.add("dark")
    } else {
        document.documentElement.classList.remove("dark")
    }
})



const handleLogin = () => {

    errorMessage.value = ''

    //  empty field
    if (!username.value || !password.value) {
        errorMessage.value = 'Please fill in username and password'
        return
    }

    //  wrong login
    const user = users.find(
        u => u.username === username.value.trim()
    )


    if (!user) {
        errorMessage.value = 'Incorrect username or password'
        return
    }

    // เช็ค password
    if (user.password !== password.value.trim()) {
        errorMessage.value = 'Incorrect username or password'

        return
    }

    const fakeToken = 'abc123' // ปกติได้จาก backend
    sessionStorage.setItem('token', fakeToken)
    sessionStorage.setItem('user', JSON.stringify(user))

    auth.login(user)

    if (user.role === 'admin') {
        router.push('/admin')
    } else {
        router.push('/')
    }


}
</script>

<template>
    <div class="min-h-screen flex flex-col md:flex-row relative">

        <!-- Left (Image) -->
        <div class="hidden md:flex md:w-3/4 h-screen relative overflow-hidden bg-gray-900">
            <img src="../assets/img/login-bg.png" class="w-full h-full object-cover dark:hidden transition-opacity duration-300" />
            <img src="../assets/img/logo-bg-darkmode.png" class="w-full h-full object-cover hidden dark:block transition-opacity duration-300" />
        </div>
        <!-- Right (Form) -->
        <div class="flex flex-col justify-center items-center w-full md:w-1/2 px-6 py-10 bg-white dark:bg-gray-900 transition-colors duration-300">

            <!-- Logo -->
            <div class="flex flex-col items-center mb-8">
                <img src="../assets/logo.png" class="w-35 mb-2 dark:hidden" />
                <img src="../assets/logo-dark.png" class="w-35 mb-2 hidden dark:block" />
            </div>

            <!-- mobile img -->
            <div class="-mx-6 mb-4 relative md:hidden">
                <img src="../assets/img/login-bg.png" class="w-full h-[260px] object-cover dark:hidden transition-opacity" />
                <img src="../assets/img/logo-bg-darkmode.png" class="w-full h-[260px] object-cover hidden dark:block transition-opacity" />

                <!-- Gradients for fading edges -->
                <div class="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white dark:from-gray-900 to-transparent transition-colors duration-300"></div>
                <div class="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white dark:from-gray-900 to-transparent transition-colors duration-300"></div>
                <div class="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white dark:from-gray-900 to-transparent transition-colors duration-300"></div>
                <div class="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white dark:from-gray-900 to-transparent transition-colors duration-300"></div>
            </div>

            <!-- Form -->
            <div class="w-full max-w-sm flex flex-col gap-4">

                <!-- Username -->
                <div>
                    <label class="text-sm text-gray-500 dark:text-gray-400">Username</label>
                    <div class="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 mt-1 shadow-inner transition-colors"
                        :class="errorMessage ? 'border border-red-400' : 'border border-transparent'">
                        <i class="fa-solid fa-user text-gray-400 dark:text-gray-500 mr-2"></i>
                        <input v-model="username" type="text" placeholder="Username" @keyup.enter="handleLogin" @input="errorMessage = ''"
                            class="bg-transparent outline-none w-full text-sm text-gray-900 dark:text-gray-100" />
                    </div>
                </div>

                <!-- Password -->
                <div>
                    <label class="text-sm text-gray-500 dark:text-gray-400">Password</label>
                    <div class="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 mt-1 shadow-inner transition-colors"
                        :class="errorMessage ? 'border border-red-400' : 'border border-transparent'">
                        <i class="fa-solid fa-lock text-gray-400 dark:text-gray-500 mr-2"></i>
                        <input v-model="password" type="password" placeholder="Password" @keyup.enter="handleLogin" @input="errorMessage = ''"
                            class="bg-transparent outline-none w-full text-sm text-gray-900 dark:text-gray-100" />
                    </div>
                </div>
                <p v-if="errorMessage" class="text-red-500 text-sm text-center mt-2">
                    {{ errorMessage }}
                </p>
                <!-- Button -->
                <button @click="handleLogin"
                    class="mt-4 bg-orange-gradient text-white py-2.5 rounded-full font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 shadow-md">
                    <i class="fa-solid fa-arrow-right-to-bracket"></i>
                    Login
                </button>

            </div>

        </div>

    </div>
</template>