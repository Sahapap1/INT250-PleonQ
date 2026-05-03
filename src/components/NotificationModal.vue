<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close'])

// Static data 
const notifications = ref([
  {
    id: 1, date: '17 ก.พ', time: '12:02', ts: 5, unread: true,
    subject: 'Application for Frontend Developer Position',
    poster: 'Bualuang mBanking', posted: '17 / 2 / 69',
    body: 'My name is Wachitanan Supho, and I would like to apply for the Frontend Developer position at your company.\n\nI am currently a student in the field of Information Technology, and I have experience working with technologies such as HTML, CSS, JavaScript, Vue.js, and TailwindCSS.\n\nSincerely,\nWachitanan Supho\nEmail: wachitanan@example.com\nPhone: 08X-XXX-XXXX'
  },
  {
    id: 2, date: '17 ก.พ', time: '12:02', ts: 4, unread: false,
    subject: 'บริการแจ้งเตือน เข้าใช้งานในระบบโมบายแบงก์กิ้งธนาคารกรุงเทพ / Sign-on to Bangkok Bank Mobile Banking Notification',
    poster: 'Bangkok Bank', posted: '17 / 2 / 69',
    body: 'ท่านได้เข้าใช้งานระบบ Mobile Banking ของธนาคารกรุงเทพเมื่อวันที่ 17 กุมภาพันธ์ 2569 เวลา 12:02 น.\nหากท่านไม่ได้เป็นผู้ดำเนินการดังกล่าว กรุณาติดต่อธนาคารทันที'
  },
  {
    id: 3, date: '16 ก.พ', time: '12:02', ts: 3, unread: false,
    subject: 'Part-Time Graphic Designer Needed',
    poster: 'Creative Studio Co.', posted: '17 / 2 / 69',
    body: 'We are looking for a part-time Graphic Designer to join our creative team. The ideal candidate should have experience in Adobe Illustrator, Photoshop, and Figma. This is a remote-friendly position with flexible hours.'
  },
  {
    id: 4, date: '15 ก.พ', time: '12:02', ts: 2, unread: false,
    subject: 'Looking for a Frontend Developer to Help Build and Improve Our Company Website …',
    poster: 'Tech Solutions Ltd.', posted: '17 / 2 / 69',
    body: 'We are seeking a skilled Frontend Developer to help us redesign and improve our company website. The role involves working with React, TailwindCSS, and collaborating with our design team to create a modern, responsive site.'
  },
  {
    id: 5, date: '14 ก.พ', time: '12:02', ts: 1, unread: false,
    subject: 'Looking for Student Assistant',
    poster: 'Faculty of IT', posted: '17 / 2 / 69',
    body: 'The Faculty of Information Technology is looking for student assistants to help with administrative tasks, lab supervision, and student support activities.'
  },
  {
    id: 6, date: '13 ก.พ', time: '12:02', ts: 1, unread: false,
    subject: 'Looking for Student Assistant 2',
    poster: 'Faculty of IT', posted: '17 / 2 / 69',
    body: 'My name is [Your Name], and I am writing to express my strong interest in applying for a position within your organization. I recently came across your company and was impressed by its commitment to innovation, professionalism, and continuous growth. With a strong academic background in Information Technology and a passion for developing practical and efficient solutions, I am eager to contribute my skills and enthusiasm to your team.\n\n I am currently a student majoring in Information Technology, where I have developed a solid foundation in programming, problem-solving, and system design. Throughout my academic journey, I have worked on various projects that have strengthened my abilities in teamwork, critical thinking, and adaptability. I am particularly interested in roles that allow me to apply my knowledge while continuing to learn and grow in a real-world environment.\n\n In addition to my technical skills, I pride myself on being a responsible, detail-oriented, and motivated individual. I am capable of managing tasks effectively, working under pressure, and communicating clearly with team members. I am always open to learning new technologies and improving myself to meet the demands of the industry.\n\n I would greatly appreciate the opportunity to discuss how my background, skills, and enthusiasm align with your company’s needs. Please find my resume attached for your consideration. I am available for an interview at your convenience and look forward to the possibility of contributing to your team.\n\n Thank you very much for your time and consideration.\n\n Yours sincerely,[Your Name]\n[Your Phone Number]\n[Your Email Address]'
  },
  {
    id: 7, date: '13 ก.พ', time: '12:02', ts: 1, unread: false,
    subject: 'Looking for Student Assistant 3',
    poster: 'Faculty of IT', posted: '17 / 2 / 69',
    body: 'The Faculty of Information Technology is looking for student assistants to help with administrative tasks, lab supervision, and student support activities.'
  },
  {
    id: 8, date: '13 ก.พ', time: '12:02', ts: 1, unread: false,
    subject: 'Looking for Student Assistant 4',
    poster: 'Faculty of IT', posted: '17 / 2 / 69',
    body: 'The Faculty of Information Technology is looking for student assistants to help with administrative tasks, lab supervision, and student support activities.'
  },
  {
    id: 9, date: '13 ก.พ', time: '12:02', ts: 1, unread: false,
    subject: 'Looking for Student Assistant 5',
    poster: 'Faculty of IT', posted: '17 / 2 / 69',
    body: 'The Faculty of Information Technology is looking for student assistants to help with administrative tasks, lab supervision, and student support activities.'
  },
])

// State
const activeTab        = ref('notifications')
const currentSort      = ref('all')
const sortMenuOpen     = ref(false)
const refreshing       = ref(false)
const favorites        = ref(new Set())
const showDetailId     = ref(null)
const showFavoriteView = ref(false)
const searchQuery      = ref('')
const sortMenuRef      = ref(null)
const isBodyExpanded   = ref(false)
const displayedCount   = ref(5) // For list pagination
const showUnreadOnly   = ref(false)

// Config
const tabs = [
  { key: 'notifications', label: 'Notifications' },
  { key: 'events',        label: 'Events' },
  { key: 'jobs',          label: 'Jobs' }
]

const sortOptions = [
  { value: 'all',    label: 'All' },
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' }
]

// Computed
const sortedNotifications = computed(() => {
  const list = [...notifications.value]
  if (currentSort.value === 'newest') return list.sort((a, b) => b.ts - a.ts)
  if (currentSort.value === 'oldest') return list.sort((a, b) => a.ts - b.ts)
  return list.sort((a, b) => b.ts - a.ts)
})

const filteredNotifications = computed(() => {
  let list = sortedNotifications.value
  if (showUnreadOnly.value) {
    list = list.filter(n => n.unread)
  }
  const q = searchQuery.value.trim().toLowerCase()
  if (q) {
    list = list.filter(n => n.subject.toLowerCase().includes(q))
  }
  return list
})

const currentNotif = computed(() =>
  notifications.value.find(n => n.id === showDetailId.value) ?? null
)

const favoriteNotifs = computed(() =>
  notifications.value.filter(n => favorites.value.has(n.id))
)

// Methods 
function setTab(tab) {
  activeTab.value        = tab
  showDetailId.value     = null
  showFavoriteView.value = false
  displayedCount.value   = 5
  showUnreadOnly.value   = false
}

function setSort(mode) {
  currentSort.value  = mode
  sortMenuOpen.value = false
}

function refresh() {
  refreshing.value = true
  setTimeout(() => {
    refreshing.value = false
    displayedCount.value = 5
  }, 600)
}

function openDetail(id) {
  const notif = notifications.value.find(n => n.id === id)
  if (notif) notif.unread = false
  showDetailId.value = id
  isBodyExpanded.value = false
}

function toggleFavorite(id) {
  const next = new Set(favorites.value)
  next.has(id) ? next.delete(id) : next.add(id)
  favorites.value = next
}

function applyJob(id) {
  const notif = notifications.value.find(n => n.id === id)
  alert(`Applied to: ${notif?.subject}`)
  showDetailId.value = null
}

function onClickOutside(e) {
  if (sortMenuRef.value && !sortMenuRef.value.contains(e.target)) {
    sortMenuOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', onClickOutside))
</script>

<template>
  <Teleport to="body">
    <transition name="modal">
      <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gray-900/60 backdrop-blur-sm shadow-2xl" @click.self="$emit('close')">
        
        <div class="relative w-full max-w-[850px] mx-auto z-10 transition-all flex flex-col pointer-events-auto max-h-[90vh]">
          
          <!-- Close Button Top Right -->
          <button @click="$emit('close')" class="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-10 h-10 rounded-full bg-white text-gray-500 shadow-xl flex items-center justify-center hover:bg-[#EF7722] hover:text-white border border-gray-100 z-50 transition-all">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>

          <!-- Orbs behind UI -->
          <div class="absolute -top-[5%] -left-[10%] w-80 h-80 bg-[#EF7722] rounded-full mix-blend-multiply filter blur-[100px] opacity-15 animate-pulse pointer-events-none z-0"></div>
          <div class="absolute -bottom-[5%] -right-[10%] w-80 h-80 bg-[#FAA533] rounded-full mix-blend-multiply filter blur-[100px] opacity-15 animate-[pulse_4s_ease-in-out_infinite] pointer-events-none z-0"></div>

          <div class="relative bg-white/80 backdrop-blur-3xl rounded-[20px] md:rounded-[28px] shadow-[0_15px_60px_rgba(0,0,0,0.1)] border border-white/50 p-4 sm:p-5 flex flex-col gap-3 md:gap-4 z-10 min-h-[400px] overflow-hidden max-h-full">
       
      <!-- Header -->
      <div class="flex justify-between items-center z-10 flex-wrap gap-4 px-2">
        <h2 class="text-[18px] sm:text-[20px] font-extrabold text-[#1F2937] tracking-tight flex items-center gap-3">
          Notifications
          <button @click="showUnreadOnly = !showUnreadOnly; showFavoriteView = false; showDetailId = null; displayedCount = 5"
                  class="px-2 py-0.5 rounded-md border text-[10px] font-bold drop-shadow-sm transition-all active:scale-95"
                  :class="showUnreadOnly ? 'bg-gradient-to-r from-[#EF7722] to-[#FAA533] border-transparent text-white shadow-sm' : 'bg-[#FFF8F1] border-[#FAA533]/50 text-[#EF7722] hover:bg-orange-100'">
            {{ sortedNotifications.filter(n => n.unread).length }} Unread
          </button>
        </h2>
        
        <div class="flex items-center gap-3">
          <div class="relative hidden sm:block">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search..."
              class="w-full sm:w-48 pl-9 pr-4 py-2 rounded-full border border-gray-200 bg-white/80 text-[12px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#FAA533]/30 focus:border-[#FAA533] shadow-sm transition-all"
            />
            <svg class="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
        </div>
      </div>

      <!-- Main Layout Body -->
      <div class="flex flex-col shrink min-h-0 gap-2 relative z-10 overflow-hidden">

        <!-- Top Navigation Tabs & Filter -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-orange-200/50 pb-2" v-if="!showDetailId">
          
          <div class="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
              v-for="tab in tabs"
              :key="tab.key"
              @click="setTab(tab.key)"
              class="flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-[12px] text-[12px] font-bold transition-all whitespace-nowrap"
              :class="activeTab === tab.key ? 'bg-gradient-to-r from-[#EF7722] to-[#FAA533] text-white shadow-sm' : 'bg-transparent text-[#6B7280] hover:bg-white hover:text-[#1F2937] hover:shadow-sm'"
            >
              {{ tab.label }}
            </button>
            <div class="w-[1px] h-4 bg-orange-200 mx-1 hidden sm:block"></div>
            <button
              @click="showFavoriteView = true; showDetailId = null; displayedCount = 5"
              class="flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-[12px] text-[12px] font-bold transition-all whitespace-nowrap"
              :class="showFavoriteView && !showDetailId ? 'bg-yellow-50 text-yellow-600 border border-yellow-200 shadow-sm' : 'bg-transparent text-[#6B7280] hover:bg-white hover:text-[#1F2937] hover:shadow-sm'"
            >
              <svg class="w-3.5 h-3.5" :class="showFavoriteView ? 'fill-yellow-500' : 'fill-none stroke-current'" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
              Favorites
            </button>
          </div>

          <div class="flex items-center gap-2 shrink-0">
             <div class="relative" ref="sortMenuRef">
               <button @click.stop="sortMenuOpen = !sortMenuOpen" class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-[10px] text-[11px] font-bold text-gray-500 hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-gray-200">
                 <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M3 6h18M7 12h10M11 18h2"/></svg>
                 <span class="hidden sm:inline">{{ sortOptions.find(o => o.value === currentSort)?.label || 'Sort' }}</span>
               </button>
               <transition name="fade">
                 <div v-if="sortMenuOpen" class="absolute top-8 right-0 sm:left-0 sm:right-auto z-50 bg-white border border-gray-200 rounded-[12px] shadow-lg min-w-[130px] overflow-hidden p-1" @click.stop>
                   <button v-for="opt in sortOptions" :key="opt.value" @click="setSort(opt.value)" class="w-full text-left px-3 py-1.5 text-[11px] font-bold rounded-[8px] transition-colors" :class="currentSort === opt.value ? 'bg-[#FFF8F1] text-[#EF7722]' : 'text-gray-600 hover:bg-gray-50'">
                     {{ opt.label }}
                   </button>
                 </div>
               </transition>
             </div>
             
             <button @click="refresh" class="p-1.5 rounded-[10px] text-gray-400 hover:text-[#EF7722] hover:bg-white hover:shadow-sm transition-all" :class="refreshing ? 'rotate-180 duration-500 text-[#FAA533]' : 'duration-500'">
               <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
             </button>
          </div>
        </div>

        <!-- Filter & List Area -->
        <div class="flex flex-col shrink min-w-0 min-h-0 relative" v-if="!showDetailId">

           <!-- List Base -->
           <div class="overflow-y-auto no-scrollbar scroll-smooth px-1 flex flex-col gap-2 relative pb-8 shrink">
             <template v-if="activeTab === 'notifications' && !showFavoriteView">
               <div v-if="filteredNotifications.length === 0" class="flex flex-col items-center justify-center py-16 opacity-60">
                 <div class="w-14 h-14 bg-white shadow-sm rounded-full flex items-center justify-center mb-3 text-gray-300">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                 </div>
                 <span class="text-[12px] font-bold text-gray-500">No new notifications.</span>
               </div>
               <div v-else class="flex flex-col gap-1.5 relative mt-1">
                 <div v-for="item in filteredNotifications.slice(0, displayedCount)" :key="item.id" @click="openDetail(item.id)"
                      class="group relative flex items-start sm:items-center gap-3 p-3 rounded-[14px] cursor-pointer transition-all duration-300 border border-transparent hover:shadow-sm overflow-hidden bg-white/70 backdrop-blur-sm hover:-translate-y-[1px]"
                      :class="item.unread ? 'bg-white shadow-[0_4px_20px_rgba(250,165,51,0.06)] border-[#FAA533]/20' : 'hover:border-gray-100 hover:bg-white'">
                   
                   <div class="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-0 bg-gradient-to-b from-[#EF7722] to-[#FAA533] rounded-r-full group-hover:h-2/3 transition-all duration-300"></div>

                   <div class="relative w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 group-hover:scale-105 transition-all duration-300"
                        :class="item.unread ? 'bg-gradient-to-br from-[#EF7722] to-[#FAA533] text-white shadow-[#EF7722]/20' : 'bg-gray-50 border border-gray-100 text-gray-400 group-hover:text-[#EF7722] group-hover:border-[#FAA533]/30'">
                     <span v-if="item.unread" class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse border-2 border-white"></span>
                     <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                     </svg>
                   </div>

                   <div class="flex-1 min-w-0 pr-4">
                     <h4 class="text-[13px] font-bold tracking-tight mb-0.5 truncate transition-colors"
                         :class="item.unread ? 'text-[#1F2937] group-hover:text-[#EF7722]' : 'text-gray-600 group-hover:text-[#1F2937]'">{{ item.subject }}</h4>
                     <p class="text-[11px] font-medium text-gray-500 flex items-center gap-1.5">
                       <span class="truncate max-w-[120px] sm:max-w-[200px]">{{ item.poster }}</span>
                       <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
                       <span class="text-gray-400">{{ item.date }} • {{ item.time }}</span>
                     </p>
                   </div>
                   
                   <button @click.stop="toggleFavorite(item.id)" class="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-gray-100 transition-colors z-10 hidden sm:block opacity-0 group-hover:opacity-100 sm:opacity-100">
                     <svg class="w-4 h-4 transition-transform hover:scale-110" :class="favorites.has(item.id) ? 'fill-yellow-400 text-yellow-400' : 'fill-none stroke-gray-300 hover:stroke-yellow-400'" viewBox="0 0 24 24" stroke-width="2">
                       <path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                     </svg>
                   </button>
                 </div>
                 
                 <!-- Pagination Buttons -->
                 <div class="flex justify-center items-center gap-2 mt-2 mb-4">
                   <button v-if="displayedCount > 5" @click="displayedCount = 5" class="px-4 py-1.5 rounded-full border border-gray-200 text-gray-500 text-[11px] font-bold bg-white hover:bg-gray-50 transition-all shadow-sm active:scale-95">
                     See Less
                   </button>
                   <button v-if="displayedCount < filteredNotifications.length" @click="displayedCount += 5" class="px-5 py-1.5 rounded-full border border-[#EF7722]/30 text-[#EF7722] text-[11px] font-bold bg-[#EF7722]/5 hover:bg-[#EF7722] hover:border-[#EF7722] hover:text-white transition-all shadow-sm active:scale-95">
                     See More
                   </button>
                 </div>
               </div>
             </template>

             <template v-else-if="showFavoriteView">
                <div v-if="favoriteNotifs.length === 0" class="flex flex-col items-center justify-center py-16 opacity-60">
                 <div class="w-14 h-14 bg-white shadow-sm rounded-full flex items-center justify-center mb-3 text-yellow-400">
                    <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path stroke-linejoin="round" stroke-linecap="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
                 </div>
                 <span class="text-[12px] font-bold text-gray-500">No favorite notifications.</span>
               </div>
               <div v-else class="flex flex-col gap-1.5 relative mt-1">
                 <div v-for="item in favoriteNotifs.slice(0, displayedCount)" :key="'fav'+item.id" @click="openDetail(item.id); showFavoriteView = false"
                      class="group relative flex items-center gap-3 p-3 rounded-[14px] cursor-pointer transition-all duration-300 border border-yellow-100 hover:shadow-sm bg-yellow-50/50 hover:bg-white hover:border-yellow-200 overflow-hidden hover:-translate-y-[1px]">
                   <div class="relative w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 group-hover:scale-105 transition-all duration-300 bg-white border border-yellow-200 text-yellow-500">
                     <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
                   </div>
                   <div class="flex-1 min-w-0 pr-4">
                     <h4 class="text-[13px] font-bold tracking-tight mb-0.5 text-gray-800 truncate group-hover:text-yellow-600 transition-colors">{{ item.subject }}</h4>
                     <p class="text-[11px] font-medium text-gray-500">{{ item.date }} • {{ item.time }}</p>
                   </div>
                 </div>

                 <!-- Pagination Buttons -->
                 <div class="flex justify-center items-center gap-2 mt-2 mb-4">
                   <button v-if="displayedCount > 5" @click="displayedCount = 5" class="px-4 py-1.5 rounded-full border border-gray-200 text-gray-500 text-[11px] font-bold bg-white hover:bg-gray-50 transition-all shadow-sm active:scale-95">
                     See Less
                   </button>
                   <button v-if="displayedCount < favoriteNotifs.length" @click="displayedCount += 5" class="px-5 py-1.5 rounded-full border border-yellow-300 text-yellow-600 text-[11px] font-bold bg-yellow-50 hover:bg-yellow-400 hover:border-yellow-400 hover:text-white transition-all shadow-sm active:scale-95">
                     See More
                   </button>
                 </div>
               </div>
             </template>

             <template v-else>
               <div class="flex flex-col items-center justify-center py-16 opacity-60">
                 <div class="w-14 h-14 bg-white shadow-sm rounded-full flex items-center justify-center mb-3 text-gray-300">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
                 </div>
                 <span class="text-[12px] font-bold text-gray-500">{{ activeTab === 'events' ? 'No events yet' : 'No jobs yet' }}</span>
               </div>
             </template>
           </div>
        </div>

        <!-- Detail View -->
        <div class="flex flex-col shrink min-w-0 min-h-0 relative p-1 overflow-y-auto no-scrollbar animate-[scaleIn_0.2s_ease-out]" v-if="showDetailId && currentNotif">
          
          <div class="flex items-center justify-between pb-2 border-b border-orange-200/40 mb-3 sticky top-0 bg-white/80 backdrop-blur-md z-10 pt-1 -mx-1 px-1">
            <button @click="showDetailId = null" class="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-[12px] font-bold text-gray-500 hover:text-[#1F2937] hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-gray-200">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
              Back
            </button>
            <button @click="toggleFavorite(currentNotif.id)" class="p-1.5 rounded-full hover:bg-white hover:shadow-sm transition-all hover:scale-110 group">
              <svg class="w-5 h-5" :class="favorites.has(currentNotif.id) ? 'fill-yellow-400 text-yellow-400' : 'fill-none stroke-gray-400 group-hover:stroke-yellow-400'" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
            </button>
          </div>

          <div class="px-1 pb-6">
            <div class="flex items-start gap-3 mb-4">
              <div class="w-10 h-10 rounded-[12px] bg-gradient-to-br from-white to-gray-50 flex items-center justify-center text-lg font-bold text-[#EF7722] shadow-sm border border-orange-100 shrink-0">
                {{ currentNotif.poster.charAt(0) }}
              </div>
              <div class="flex-1 mt-0.5">
                <h2 class="text-[15px] sm:text-[16px] font-extrabold text-[#1F2937] tracking-tight leading-snug">{{ currentNotif.subject }}</h2>
                <div class="flex items-center gap-1.5 mt-1 text-[11px] font-medium text-gray-500">
                  <span class="text-[#EF7722] font-bold">{{ currentNotif.poster }}</span>
                  <span class="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span>Posted {{ currentNotif.posted }}</span>
                </div>
              </div>
            </div>

            <!-- Body Area with See More logic -->
            <div class="relative bg-white/70 backdrop-blur-sm rounded-[16px] p-4 md:p-5 mb-5 border border-orange-100 shadow-sm leading-relaxed text-[12px] md:text-[13px]">
               <div class="text-gray-700 whitespace-pre-line font-medium overflow-hidden transition-all duration-500 relative"
                    :class="isBodyExpanded ? 'max-h-[2000px]' : 'max-h-[100px]'">
                 {{ currentNotif.body }}
                 <div v-if="!isBodyExpanded && currentNotif.body.length > 150" class="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white/90 to-transparent pointer-events-none"></div>
               </div>
               <button v-if="currentNotif.body.length > 150" @click="isBodyExpanded = !isBodyExpanded" class="text-[11px] font-bold text-[#EF7722] hover:text-[#FAA533] mt-1.5 underline transition-colors w-fit block focus:outline-none">
                 {{ isBodyExpanded ? 'See Less' : 'See More' }}
               </button>
            </div>

            <div class="flex flex-col sm:flex-row justify-end gap-2.5 mt-auto pb-2">
              <button @click="showDetailId = null" class="w-full sm:w-auto px-5 py-2 bg-white border border-gray-200 text-[#1F2937] text-[12px] font-bold rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95 shadow-sm">
                Cancel
              </button>
              <button @click="applyJob(currentNotif.id)" class="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-[#EF7722] to-[#FAA533] text-white text-[12px] font-bold rounded-full shadow-[0_4px_12px_rgba(239,119,34,0.3)] hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-95">
                Apply Action
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>


        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95) translateY(10px);
}
</style>