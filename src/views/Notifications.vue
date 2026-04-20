<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

defineEmits(['create'])

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
    subject: 'Looking for Student Assistant',
    poster: 'Faculty of IT', posted: '17 / 2 / 69',
    body: 'My name is [Your Name], and I am writing to express my strong interest in applying for a position within your organization. I recently came across your company and was impressed by its commitment to innovation, professionalism, and continuous growth. With a strong academic background in Information Technology and a passion for developing practical and efficient solutions, I am eager to contribute my skills and enthusiasm to your team.\n\n I am currently a student majoring in Information Technology, where I have developed a solid foundation in programming, problem-solving, and system design. Throughout my academic journey, I have worked on various projects that have strengthened my abilities in teamwork, critical thinking, and adaptability. I am particularly interested in roles that allow me to apply my knowledge while continuing to learn and grow in a real-world environment.\n\n In addition to my technical skills, I pride myself on being a responsible, detail-oriented, and motivated individual. I am capable of managing tasks effectively, working under pressure, and communicating clearly with team members. I am always open to learning new technologies and improving myself to meet the demands of the industry.\n\n I would greatly appreciate the opportunity to discuss how my background, skills, and enthusiasm align with your company’s needs. Please find my resume attached for your consideration. I am available for an interview at your convenience and look forward to the possibility of contributing to your team.\n\n Thank you very much for your time and consideration.\n\n Yours sincerely,[Your Name]\n[Your Phone Number]\n[Your Email Address]'
  },
  {
    id: 7, date: '13 ก.พ', time: '12:02', ts: 1, unread: false,
    subject: 'Looking for Student Assistant',
    poster: 'Faculty of IT', posted: '17 / 2 / 69',
    body: 'The Faculty of Information Technology is looking for student assistants to help with administrative tasks, lab supervision, and student support activities.'
  },
  {
    id: 7, date: '13 ก.พ', time: '12:02', ts: 1, unread: false,
    subject: 'Looking for Student Assistant',
    poster: 'Faculty of IT', posted: '17 / 2 / 69',
    body: 'The Faculty of Information Technology is looking for student assistants to help with administrative tasks, lab supervision, and student support activities.'
  },
  {
    id: 7, date: '13 ก.พ', time: '12:02', ts: 1, unread: false,
    subject: 'Looking for Student Assistant',
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
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return sortedNotifications.value
  return sortedNotifications.value.filter(n => n.subject.toLowerCase().includes(q))
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
}

function setSort(mode) {
  currentSort.value  = mode
  sortMenuOpen.value = false
}

function refresh() {
  refreshing.value = true
  setTimeout(() => (refreshing.value = false), 600)
}

function openDetail(id) {
  const notif = notifications.value.find(n => n.id === id)
  if (notif) notif.unread = false
  showDetailId.value = id
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

  <main class="flex-1 min-h-0 flex flex-col overflow-hidden
               md:bg-white/90 md:backdrop-blur-sm md:rounded-2xl md:shadow-xl">

    <!-- desktop header: title + search -->
    <div class="hidden md:flex items-center justify-between px-7 pt-6 pb-4 flex-shrink-0">
      <h1 class="text-2xl font-semibold text-gray-800">Notifications</h1>
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="ค้นหา..."
          class="w-56 pl-4 pr-10 py-2 rounded-xl border border-orange-100 bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm transition"
        />
        <svg class="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
             fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      </div>
    </div>

    <!-- MOBILE ONLY — page title -->
    <div class="md:hidden px-5 pt-5 pb-2 bg-white border-b border-orange-50 flex-shrink-0">
      <h1 class="text-lg font-semibold text-gray-800">Notifications</h1>
    </div>

    <!-- BODY: desktop row | mobile column -->
        
    <div class="flex flex-1 min-h-0 overflow-hidden flex-col md:flex-row bg-[#FFF8F1]">

      <!-- Desktop inner sidebar -->
      <div class="hidden md:flex w-44 border-r border-orange-50 px-4 pb-6 pt-2 flex-col gap-2 flex-shrink-0">
        <button
          @click="$emit('create')"
          class="flex items-center gap-2 px-4 py-3 rounded-xl bg-orange-100 text-orange-600 font-medium text-sm hover:bg-orange-200 transition"
        >
          <span class="w-6 h-6 rounded-full bg-orange-gradient text-white flex justify-center text-xl font-bold leading-none">+</span>
          Create
        </button>

        <button
          @click="showFavoriteView = true; showDetailId = null"
          :class="showFavoriteView ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-orange-50'"
          class="flex items-center gap-2 px-4 py-3 rounded-xl transition text-sm font-medium"
        >
          <svg class="w-5 h-5 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01z"/>
          </svg>
          Favorite
        </button>
      </div>

      <!-- Notifications pane -->
           
      <div class="flex-1 min-h-0 flex flex-col min-w-0 overflow-hidden">

        <!-- Tabs — desktop: full bar | mobile: pill -->
        <div class="flex flex-shrink-0 gap-2 md:gap-0
                    px-4 pt-3 pb-2 md:px-2 md:pt-0 md:pb-0">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            @click="setTab(tab.key)"
            :class="[
              'flex-1 font-semibold tracking-wide transition text-sm',
              'py-2 rounded-2xl border md:rounded-none md:border-0 md:py-3',
              activeTab === tab.key
                ? 'bg-[#EF7722] text-white border-[#EF7722]'
                : 'bg-white md:bg-[#FAA533] border-orange-100 text-orange-400 md:text-orange-700 md:hover:bg-orange-300'
            ]"
          >{{ tab.label }}</button>
        </div>

        <!-- Filter bar -->
        <div class="flex flex-shrink-0 items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 border-b border-orange-50 relative">

          <!-- Sort -->
          <div class="relative" ref="sortMenuRef">
            <button
              @click.stop="sortMenuOpen = !sortMenuOpen"
              class="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-orange-600 hover:bg-orange-100 transition"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" d="M3 6h18M7 12h10M11 18h2"/>
              </svg>
              <span class="md:hidden text-[12px] font-medium">Sort</span>
            </button>

            <div
              v-if="sortMenuOpen"
              class="absolute top-9 left-0 z-50 bg-white border border-orange-100 rounded-xl shadow-lg min-w-[140px] overflow-hidden"
              @click.stop
            >
              <div class="px-1 py-1">
                <button
                  v-for="opt in sortOptions"
                  :key="opt.value"
                  @click="setSort(opt.value)"
                  :class="currentSort === opt.value ? 'text-orange-600 font-semibold bg-orange-50' : 'text-gray-600'"
                  class="w-full text-left px-3 py-2 text-sm hover:bg-orange-50 rounded-lg transition"
                >{{ opt.label }}</button>
              </div>
            </div>
          </div>

          <!-- ปุ่ม Refresh -->
          <button
            @click="refresh"
            class="p-1.5 rounded-lg text-orange-500 hover:bg-orange-100 transition"
            :class="refreshing ? 'rotate-180 duration-500' : 'duration-500'"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
          </button>

          <!-- Sort label desktop -->
          <span v-if="currentSort !== 'all'" class="hidden md:inline text-xs text-orange-400 font-medium">
            {{ sortOptions.find(o => o.value === currentSort)?.label }}
          </span>

          <!-- Favorite btn mobile only -->
          <button
            @click="showFavoriteView = true; showDetailId = null"
            :class="showFavoriteView ? 'bg-orange-100 text-orange-600' : 'text-gray-500'"
            class="md:hidden ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-medium border border-orange-100 transition"
          >
            <svg class="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01z"/>
            </svg>
            Favorite
          </button>
        </div>

        <!-- Notification list -->
             
        <div v-if="!showDetailId && !showFavoriteView"
             class="max-h-[60vh] flex-1 overflow-y-auto divide-y divide-orange-50 bg-[#FFF8F1] px-2">
          <template v-if="activeTab === 'notifications'">
            <div
              v-for="item in filteredNotifications"
              :key="item.id"
              @click="openDetail(item.id)"
              :class="['flex items-start md:items-center gap-3 px-5 py-3.5 md:py-4 cursor-pointer hover:bg-orange-100 active:bg-orange-50 transition',
                       item.unread ? 'bg-orange-50/40' : '']"
            >
              <span v-if="item.unread" class="w-2 h-2 rounded-full bg-orange-400 flex-shrink-0 mt-1 md:mt-0"></span>
              <div class="flex-shrink-0 w-14 md:w-16 text-right text-xs text-gray-400 leading-snug">
                <div>{{ item.date }}</div>
                <div>{{ item.time }}</div>
              </div>
              <p class="text-sm flex-1 min-w-0 md:truncate line-clamp-2 md:line-clamp-1 leading-snug"
                 :class="item.unread ? 'text-gray-800 font-medium' : 'text-gray-600'">
                {{ item.subject }}
              </p>
              <span v-if="favorites.has(item.id)" class="text-yellow-400 text-sm flex-shrink-0">★</span>
            </div>

            <div v-if="filteredNotifications.length === 0" class="py-12 text-center text-sm text-gray-400">
              ไม่พบการแจ้งเตือน
            </div>
          </template>

          <div v-else class="py-12 text-center text-sm text-gray-400">
            {{ activeTab === 'events' ? 'No events yet' : 'No jobs yet' }}
          </div>
        </div>

        <!-- Detail -->
        <div v-if="showDetailId && currentNotif"
             class="max-h-[60vh] flex-1 overflow-y-auto px-5 md:px-6 py-4 ">
          <div class="flex items-center justify-between mb-3">
            <button
              @click="showDetailId = null"
              class="flex items-center gap-1 text-sm text-orange-500 hover:text-orange-700 font-medium transition"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
              </svg>
              กลับ
            </button>
            <button
              @click="toggleFavorite(currentNotif.id)"
              :class="favorites.has(currentNotif.id) ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300'"
              class="text-2xl transition"
            >★</button>
          </div>

          <h2 class="text-base font-semibold text-gray-800 mb-1">{{ currentNotif.subject }}</h2>
          <p class="text-xs text-gray-400 mb-4">Posted: {{ currentNotif.posted }}</p>

          <div class="bg-orange-50 rounded-xl p-4 mb-4">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-9 h-9 rounded-full bg-orange-200 flex items-center justify-center text-xs font-bold text-orange-700">
                {{ currentNotif.poster.charAt(0) }}
              </div>
              <span class="text-sm font-medium text-gray-800">{{ currentNotif.poster }}</span>
            </div>
            <p class="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{{ currentNotif.body }}</p>
          </div>

          <div class="flex justify-end gap-2">
            <button @click="applyJob(currentNotif.id)"
              class="px-6 py-2 bg-orange-gradient text-white text-sm font-semibold rounded-xl hover:bg-orange-600 transition">
              Apply
            </button>
            <button @click="showDetailId = null"
              class="px-6 py-2 border border-gray-200 text-gray-600 text-sm rounded-xl hover:bg-gray-50 transition">
              Cancel
            </button>
          </div>
        </div>

        <!-- Favorite -->
        <div v-if="showFavoriteView && !showDetailId"
             class="flex-1 overflow-y-auto divide-y divide-orange-50">
          <div class="flex flex-shrink-0 items-center justify-between px-5 py-3">
            <span class="text-sm font-semibold text-gray-700">★ Favorites</span>
            <button @click="showFavoriteView = false" class="text-xs text-orange-500 hover:text-orange-700 font-medium">Back</button>
          </div>

          <div v-if="favoriteNotifs.length === 0" class="py-12 text-center text-sm text-gray-400">
            ยังไม่มี Favorite กดดาว ★ เพื่อบันทึกการแจ้งเตือน
          </div>

          <div
            v-for="item in favoriteNotifs"
            :key="item.id"
            @click="openDetail(item.id); showFavoriteView = false"
            class="flex items-center px-5 py-4 cursor-pointer gap-3 hover:bg-orange-50 active:bg-orange-50 transition"
          >
            <span class="text-yellow-400 flex-shrink-0">★</span>
            <div class="flex-shrink-0 w-14 text-right text-xs text-gray-400 leading-snug">
              <div>{{ item.date }}</div>
              <div>{{ item.time }}</div>
            </div>
            <p class="text-sm truncate text-gray-700 flex-1">{{ item.subject }}</p>
          </div>
        </div>

      </div>
    </div>

    <!-- MOBILE ONLY — FAB Create -->
    <div class="md:hidden relative h-20 flex-shrink-0 bg-white border-t border-orange-50">
      <button
        @click="$emit('create')"
        class="absolute bottom-4 right-4 flex items-center gap-2 bg-orange-gradient text-white px-5 py-3 rounded-2xl text-[14px] font-semibold shadow-lg shadow-orange-200 active:bg-orange-700 transition"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        Create
      </button>
    </div>

  </main>
</template>