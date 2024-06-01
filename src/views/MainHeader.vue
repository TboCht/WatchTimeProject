<template>
  <div class="sm:p-10 px-6 py-8 border-b flex justify-between items-center">
    <div class="flex items-center gap-4">
      <img src="../assets/NetflixWatchtimeLogo.png" class="w-12 h-12" />
      <h1
        class="sm:text-3xl text-xl font-semibold cursor-pointer sm:block hidden"
        @click="$emit('home')"
      >
        Netflix WatchTime
      </h1>
    </div>
    <div
      class="flex sm:gap-4 items-center border rounded-full sm:px-4 sm:py-1 px-2 cursor-pointer hover:bg-violet-100 hover:shadow-md transition-all"
    >
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/TboCht/WatchTimeProject"
        class="whitespace-nowrap sm:text-base text-xs"
        >My github</a
      >
      <img
        src="../assets/github.png"
        alt="github"
        width="40"
        class="scale-75 sm:sc"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits(["home"]);
</script>
