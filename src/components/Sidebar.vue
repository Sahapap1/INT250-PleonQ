<script setup>
import { ref } from 'vue'

const activeTab = ref('home')


</script>

<template>
    <aside class="hidden md:block pt-2 absolute left-0 px-4">
        <div class="flex flex-col gap-3 w-full mt-10">

            <button @click="activeTab = 'home'"
                class="flex items-center gap-3 px-5 py-3 rounded-full transition-all duration-300 w-full" :class="activeTab === 'home'
                    ? 'bg-orange-gradient text-white shadow-md'
                    : 'text-gray-700 hover:bg-white/30'">
                <i class="fa-regular fa-house"></i>
                <span class="text-sm font-medium">Home</span>
            </button>

            <button @click="activeTab = 'task'"
                class="flex items-center gap-3 px-5 py-3 rounded-full transition-all duration-300 w-full" :class="activeTab === 'task'
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