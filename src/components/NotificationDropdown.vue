<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useNotificationStore } from '@/stores/notificationStore'

const router = useRouter()
const emit = defineEmits(['close', 'openFullModal'])
const notificationStore = useNotificationStore()

const activeTab = ref('all')
const showUnreadOnly = ref(false)
const tabs = [
  { key: 'all', label: 'All' },
  { key: 'notifications', label: 'Alerts' },
  { key: 'jobs', label: 'Jobs' },
  { key: 'events', label: 'Events' }
]

const filteredNotifications = computed(() => {
  let list = notificationStore.notifications
  if (showUnreadOnly.value) {
    list = list.filter(n => n.unread)
  }
  if (activeTab.value !== 'all') {
    list = list.filter(n => n.type === activeTab.value)
  }
  return list
})

const unreadCount = computed(() => notificationStore.unreadCount)

const markAsRead = (id) => {
  notificationStore.markAsRead(id)
}

const goToFullPage = () => {
  emit('close')
  emit('openFullModal')
}
</script>

<template>
  <div class="fixed sm:absolute top-[70px] sm:top-[60px] left-2 right-2 sm:left-auto sm:right-0 sm:w-[380px] bg-white rounded-[24px] shadow-[0_20px_70px_-15px_rgba(0,0,0,0.2)] border border-gray-100 overflow-hidden flex flex-col z-50 transform origin-top-right transition-all">
    
    <!-- Header -->
    <div class="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-br from-[#FFF8F1] to-white">
      <div class="flex items-center gap-2">
         <h3 class="font-extrabold text-[#1F2937] text-[16px]">Notifications</h3>
         <button v-if="unreadCount > 0" @click="showUnreadOnly = !showUnreadOnly" 
                 class="text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm transition-all active:scale-95"
                 :class="showUnreadOnly ? 'bg-white text-[#EF7722] border border-[#EF7722]/50' : 'bg-[#EF7722] text-white'">
           {{ unreadCount }} New
         </button>
      </div>
      <button @click="$emit('close')" class="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    </div>
    
    <!-- Mini Tabs -->
    <div class="flex items-center gap-1.5 px-4 pt-3 pb-2 bg-gray-50/50 overflow-x-auto no-scrollbar">
      <button v-for="tab in tabs" :key="tab.key" @click="activeTab = tab.key"
              class="px-3 py-1.5 rounded-full text-[11px] font-bold transition-all whitespace-nowrap"
              :class="activeTab === tab.key ? 'bg-gradient-to-r from-[#EF7722] to-[#FAA533] text-white shadow-sm' : 'bg-white text-gray-500 border border-gray-200 hover:border-[#FAA533]/50 hover:text-[#EF7722]'">
         {{ tab.label }}
      </button>
    </div>

    <!-- Notification List -->
    <div class="max-h-[340px] overflow-y-auto no-scrollbar flex flex-col bg-white">
      <div v-if="filteredNotifications.length === 0" class="py-10 flex flex-col items-center justify-center text-gray-400 gap-2">
         <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">
           <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
         </div>
         <span class="text-[12px] font-bold text-gray-400">All caught up!</span>
      </div>
      
      <div v-else v-for="notif in filteredNotifications" :key="notif.id" @click="markAsRead(notif.id)"
           class="relative flex items-start gap-3.5 p-4 border-b border-gray-50 cursor-pointer transition-all group overflow-hidden bg-white hover:bg-[#FFF8F1]/80"
           :class="notif.unread ? '' : 'opacity-80'">
        
        <div class="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-0 bg-gradient-to-b from-[#EF7722] to-[#FAA533] rounded-r-full group-hover:h-2/3 transition-all duration-300"></div>

        <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-transform group-hover:scale-105"
             :class="notif.unread ? 'bg-gradient-to-br from-[#EF7722] to-[#FAA533] text-white shadow-[#EF7722]/20 border-transparent' : 'bg-gray-50 text-gray-400 border-gray-200 group-hover:text-[#EF7722] group-hover:border-[#FAA533]/30'">
          <i class="fa-solid text-[14px]" :class="notif.icon"></i>
        </div>
        
        <div class="flex-1 min-w-0">
          <p class="text-[13px] font-bold truncate transition-colors leading-tight" 
             :class="notif.unread ? 'text-[#1F2937] group-hover:text-[#EF7722]' : 'text-gray-600'">{{ notif.subject }}</p>
          <div class="flex items-center gap-2 mt-1.5 text-[11px] font-medium text-gray-500">
            <span class="truncate max-w-[120px]">{{ notif.poster }}</span>
            <span class="w-1 h-1 rounded-full bg-gray-300"></span>
            <span>{{ notif.date }} • {{ notif.time }}</span>
          </div>
        </div>
        
        <div v-if="notif.unread" class="w-2 h-2 rounded-full bg-red-500 shrink-0 mt-1.5 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
      </div>
    </div>
    
    <!-- Footer -->
    <div class="p-3 border-t border-gray-100 bg-gray-50/50">
      <button @click="goToFullPage" class="w-full justify-center flex items-center gap-2 py-2.5 rounded-xl bg-white text-[#1F2937] hover:bg-gradient-to-r hover:from-[#EF7722] hover:to-[#FAA533] hover:text-white border border-gray-200 hover:border-transparent font-bold text-[12px] transition-all active:scale-95 shadow-sm group">
        View All Notifications
        <svg class="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
