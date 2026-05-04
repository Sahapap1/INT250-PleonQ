<script setup>
import { computed } from 'vue'
import { useNotificationStore } from '@/stores/notificationStore'

const notificationStore = useNotificationStore()
const toast = computed(() => notificationStore.toast)

const dismiss = () => {
  notificationStore.dismissToast()
}
</script>

<template>
  <Teleport to="body">
    <transition name="toast">
      <div v-if="toast" 
           class="fixed top-6 right-4 sm:right-6 z-[200] max-w-sm w-full pointer-events-auto animate-[slideIn_0.4s_ease-out]">
        <div class="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-gray-100 p-4 flex items-start gap-3 overflow-hidden relative group">
          
          <!-- Accent line -->
          <div class="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#EF7722] to-[#FAA533] rounded-l-2xl"></div>
          
          <!-- Icon -->
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EF7722] to-[#FAA533] flex items-center justify-center shrink-0 shadow-sm">
            <i class="fa-solid text-white text-sm" :class="toast.icon || 'fa-bell'"></i>
          </div>
          
          <!-- Content -->
          <div class="flex-1 min-w-0 pr-6">
            <p class="text-[13px] font-bold text-[#1F2937] truncate">{{ toast.subject }}</p>
            <p class="text-[11px] text-gray-500 font-medium mt-0.5 truncate">{{ toast.poster || 'PleonQ System' }}</p>
          </div>
          
          <!-- Close -->
          <button @click="dismiss" 
                  class="absolute top-3 right-3 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          
          <!-- Progress bar -->
          <div class="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[#EF7722] to-[#FAA533] rounded-b-2xl animate-[shrink_3s_linear_forwards]"></div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
@keyframes slideIn {
  from { opacity: 0; transform: translateX(100px) scale(0.95); }
  to { opacity: 1; transform: translateX(0) scale(1); }
}

@keyframes shrink {
  from { width: 100%; }
  to { width: 0%; }
}

.toast-enter-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.toast-leave-active {
  transition: all 0.3s ease-in;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(100px) scale(0.95);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(100px) scale(0.95);
}
</style>
