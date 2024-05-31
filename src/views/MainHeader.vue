<template>
  <div class="p-12 border-b flex justify-between items-center">
    <h1
      class="sm:text-4xl text-3xl font-bold cursor-pointer"
      @click="$emit('home')"
    >
      Netflix WatchTime
    </h1>
    <div
      class="flex gap-4 items-center border rounded-full px-4 py-1 cursor-pointer hover:bg-violet-100 hover:shadow-md transition-all"
    >
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/TboCht/WatchTimeProject"
        class="whitespace-nowrap"
        >My github</a
      >
      <img src="../assets/github.png" alt="github" width="40" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits(["home"]);
</script>
