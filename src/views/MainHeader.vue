<template>
  <div class="p-12 border-b flex justify-between items-center">
    <h1 class="text-4xl font-bold">Netflix WatchTime</h1>

    <nav>
      <ul class="flex gap-12 px-12">
        <li @click="$emit('home')">Home</li>
        <li @click="$emit('guide')">Guide</li>
        <li @click="$emit('info')">Info</li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
defineEmits(["home", "guide", "info"]);
</script>
