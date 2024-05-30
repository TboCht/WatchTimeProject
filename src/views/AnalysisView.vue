<template>
  <div class="flex items-center justify-center p-12 flex-col gap-16">
    <div class="flex flex-col gap-16 w-full px-14">
      <div
        v-for="user in userData"
        class="flex flex-col"
        @click="profileClicked = user.userName"
      >
        <div class="flex gap-6 justify-center items-center">
          <div class="text-6xl font-bold">{{ user.userName }} :</div>

          <div class="flex gap-4 px-12">
            <div>
              <span class="text-4xl font-bold">{{
                user.totalWatchTime.days
              }}</span>
              days
            </div>
            <div>
              <span class="text-4xl font-bold">{{
                user.totalWatchTime.hours
              }}</span>
              hours
            </div>
            <div>
              <span class="text-4xl font-bold">{{
                user.totalWatchTime.minutes
              }}</span>
              minutes
            </div>
            <div>
              <span class="text-4xl font-bold">{{
                user.totalWatchTime.seconds
              }}</span>
              seconds
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { analyzedUserData } from "../types/types";

defineProps<{
  userData: analyzedUserData[];
}>();

const profileClicked = ref();
</script>
