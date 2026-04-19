<script setup>
import { ref } from 'vue'

const activeTab = ref('home')


</script>

<template>
    <aside class="hidden lg:block pt-2 px-4 max-w-47.5">
        <div class="flex flex-col gap-3 w-full mt-10">

            <button @click="activeTab = 'home'"
                class="flex items-center gap-3 px-5 py-3 rounded-full transition-all duration-300 w-full cursor-pointer" :class="activeTab === 'home'
                    ? 'bg-orange-gradient text-white shadow-md'
                    : 'text-gray-700 hover:bg-white/30'">
                <i class="fa-regular fa-house"></i>
                <span class="text-sm font-medium">Home</span>
            </button>

            <button v-if="isAdmin" @click="activeTab = 'create'"
                class="flex items-center gap-3 px-5 py-3 rounded-full transition-all duration-300 w-full cursor-pointer group" 
                :class="activeTab === 'create'
                    ? 'bg-orange-gradient text-white shadow-md shadow-orange-100'
                    : 'text-gray-700 hover:bg-white/50 hover:text-[#F27F21]'">
                
                <div class="w-5 h-5 border-2 rounded-full flex items-center justify-center transition-colors"
                    :class="activeTab === 'create' ? 'border-white' : 'border-gray-400 group-hover:border-[#F27F21]'">
                    <i class="fa-solid fa-plus text-[10px]"></i>
                </div>
                <span class="text-[14px] font-bold">Create New Job</span>
            </button>

            <button @click="activeTab = 'task'"
                class="flex items-center gap-3 px-5 py-3 rounded-full transition-all duration-300 w-full cursor-pointer" :class="activeTab === 'task'
                    ? 'bg-orange-gradient text-white shadow-md'
                    : 'text-gray-700 hover:bg-white/30'">
                <i class="fa-solid fa-list"></i>
                <span class="text-sm font-medium">Task Management</span>
            </button>

        </div>
    </aside>
    <!-- <aside
    class="fixed left-0 top-0 h-full w-64 flex-col items-start px-4 py-6 hidden md:flex"
  >
   
   
  </aside> -->
</template>

<style scoped>
/* optional: smooth font + icon */
i {
    font-size: 16px;
}
</style>