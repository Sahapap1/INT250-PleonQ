<script setup>
</script>

<template>
  <footer class="w-full bg-[#FFF8F1] border-t border-[#EBEBEB] py-6 mt-auto z-10 shadow-[0_-4px_25px_rgba(0,0,0,0.02)]">
    <div class="w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      
      <!-- Logo -->
      <div class="flex items-center gap-2">
        <span class="font-extrabold text-[#1F2937] tracking-tight text-lg">Pleon<span class="text-[#EF7722]">Q</span></span>
      </div>
      
      <!-- Copyright -->
      <p class="text-[13px] font-medium text-[#6B7280] text-center">
        &copy; {{ new Date().getFullYear() }} PleonQ Student Activities. INT250 CSS FRAMEWORK PROJECT.
      </p>
      
      <!-- Social Links / Extra Info -->
      <div class="flex items-center gap-5 text-[#6B7280]">
        <a href="#" class="w-8 h-8 rounded-full bg-white border border-[#EBEBEB] flex items-center justify-center hover:text-[#EF7722] hover:border-[#FAA533] hover:shadow-sm transition-all transform hover:-translate-y-0.5 active:scale-95">
          <i class="fa-solid fa-envelope text-[13px]"></i>
        </a>
        <a href="#" class="w-8 h-8 rounded-full bg-white border border-[#EBEBEB] flex items-center justify-center hover:text-[#EF7722] hover:border-[#FAA533] hover:shadow-sm transition-all transform hover:-translate-y-0.5 active:scale-95">
          <i class="fa-solid fa-circle-info text-[13px]"></i>
        </a>
      </div>

    </div>
  </footer>
</template>

<style scoped>
</style>
