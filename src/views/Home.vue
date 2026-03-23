<template>
  <div >
    <!-- class="min-h-screen bg-gradient-to-b from-orange-100 to-orange-300 p-4" -->
    <!-- 🔹 Header
    <div class="flex justify-between items-center mb-4">
      <div class="flex items-center gap-2">
        <div class="text-orange-500 text-2xl font-bold">Q</div>
        <div class="text-sm font-medium">PleonQ</div>
      </div>

      <div class="flex gap-2">
        <div class="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center">🔔</div>
        <div class="w-10 h-10 bg-orange-300 rounded-full flex items-center justify-center">👤</div>
      </div>
    </div> -->

    <!-- 🔹 Tabs -->
    <div class="flex bg-gray-200 rounded-full p-1 mb-4">
      <button class="flex-1 bg-orange-500 text-white rounded-full py-2 flex items-center justify-center gap-2">
        🏠 Home
      </button>
      <button class="flex-1 text-gray-600 flex items-center justify-center gap-2">
        📋 Task Management
      </button>
    </div>

    <!-- 🔹 Search -->
    <div class="bg-white rounded-2xl p-3 shadow mb-4 flex items-center">
      <input
        type="text"
        placeholder="Search..."
        class="flex-1 outline-none px-2"
      />
      🔍
    </div>

    <!-- 🔹 Card List -->
    <div class="space-y-4">
      <div
        v-for="i in 4"
        :key="i"
        class="bg-white rounded-2xl shadow flex overflow-hidden"
      >
        <!-- Image -->
        <div class="w-24 bg-orange-200 flex items-center justify-center">
          🎒
        </div>

        <!-- Content -->
        <div class="flex-1 p-3">
          <div class="flex justify-between items-start">
            <h2 class="font-semibold">Project Title</h2>
            <span class="text-orange-400">🧭</span>
          </div>

          <p class="text-xs text-gray-500 mt-1">
            This is a brief description of the project. Lorem Ipsum is simply dummy text.
          </p>

          <div class="flex justify-between items-center mt-3">
            <span class="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
              UI/UX
            </span>

            <button class="bg-orange-400 text-white text-xs px-3 py-1 rounded-full">
              View
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
// mock data (ถ้าจะใช้จริงค่อยเปลี่ยน)
</script>