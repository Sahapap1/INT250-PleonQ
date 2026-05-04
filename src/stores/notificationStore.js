import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import notificationsData from '../data/notifications.json'

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref([])
  const currentUserId = ref(null)
  const toast = ref(null)
  let toastTimer = null

  // Getters
  const unreadCount = computed(() =>
    notifications.value.filter(n => n.unread).length
  )

  const allNotifications = computed(() => notifications.value)

  const getByType = (type) => {
    return notifications.value.filter(n => n.type === type)
  }

  // LocalStorage key per user
  const getStorageKey = (userId) => `pleonq_notif_${userId}`

  // Actions
  function fetchNotifications(userId) {
    if (!userId) return
    currentUserId.value = userId

    // Check localStorage first (persisted state)
    const localData = localStorage.getItem(getStorageKey(userId))
    if (localData) {
      notifications.value = JSON.parse(localData)
    } else {
      // Load initial data from JSON, fallback to empty array
      const userNotifs = notificationsData[String(userId)]
      notifications.value = userNotifs
        ? JSON.parse(JSON.stringify(userNotifs))
        : []
      saveToLocalStorage()
    }
  }

  function saveToLocalStorage() {
    if (currentUserId.value) {
      localStorage.setItem(
        getStorageKey(currentUserId.value),
        JSON.stringify(notifications.value)
      )
    }
  }

  function addNotification(notif) {
    const newId = notifications.value.length > 0
      ? Math.max(...notifications.value.map(n => n.id)) + 1
      : 1

    const now = new Date()
    const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })

    notifications.value.unshift({
      id: newId,
      type: notif.type || 'jobs',
      jobId: notif.jobId || null,
      unread: true,
      subject: notif.subject,
      poster: notif.poster || 'PleonQ System',
      time: timeStr,
      date: 'Today',
      icon: notif.icon || 'fa-briefcase',
      body: notif.body || ''
    })
    saveToLocalStorage()
    
    // Show toast popup
    showToast({
      subject: notif.subject,
      poster: notif.poster || 'PleonQ System',
      icon: notif.icon || 'fa-briefcase'
    })
  }

  function showToast(data) {
    toast.value = data
    if (toastTimer) clearTimeout(toastTimer)
    toastTimer = setTimeout(() => {
      toast.value = null
    }, 3000)
  }

  function dismissToast() {
    toast.value = null
    if (toastTimer) clearTimeout(toastTimer)
  }

  function markAsRead(id) {
    const notif = notifications.value.find(n => n.id === id)
    if (notif) {
      notif.unread = false
      saveToLocalStorage()
    }
  }

  function markAllAsRead() {
    notifications.value.forEach(n => { n.unread = false })
    saveToLocalStorage()
  }

  return {
    notifications,
    currentUserId,
    toast,
    unreadCount,
    allNotifications,
    getByType,
    fetchNotifications,
    addNotification,
    showToast,
    dismissToast,
    markAsRead,
    markAllAsRead
  }
})
