<template>
  <div class="flex w-full justify-center p-12 flex-col gap-16">
    <profileCard v-for="userdata in usersData" :data="userdata" />
  </div>
</template>

<script setup lang="ts">
import { AnalyzedUserData } from "../types/types";
import profileCard from "../components/cards/profileCard.vue";

defineProps<{
  usersData: AnalyzedUserData[];
}>();
</script>
