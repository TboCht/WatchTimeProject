<template>
  <div class="shadow-xl border p-8 rounded-3xl">
    <div
      class="flex justify-between cursor-pointer items-center gap-4"
      @click="showProfileData = !showProfileData"
    >
      <div class="space-y-2">
        <h1 class="sm:text-4xl text-xl font-semibold">{{ data.userName }}</h1>
        <p class="sm:text-base text-xs">
          First activity : {{ firstActivityString }} ago
        </p>
      </div>

      <img
        src="../../assets/navArrow.png"
        class="sm:w-20 sm:h-20 sm:mr-18 transition-all ease-in-out scale-50 w-12 h-12"
        :class="showProfileData ? 'rotate-0' : 'rotate-180'"
      />
    </div>

    <div
      class="flex flex-col gap-8 transition-all"
      :class="
        showProfileData
          ? 'lg:h-[580px]  sm:h-[830px] sm:overflow-hidden overflow-auto'
          : 'h-0 overflow-hidden'
      "
    >
      <div class="space-y-4 sm:pt-12 pt-8">
        <h2 class="sm:text-2xl text-md">Total watch time</h2>
        <SmallCard
          :main-text="totalWatchTimeString"
          icon="watchingIcon"
          class="bg-orange-100"
        />
      </div>
      <div class="space-y-4">
        <h2 class="sm:text-2xl text-md">Most Watched</h2>
        <div class="flex gap-8 sm:gap-12 justify-between flex-col lg:flex-row">
          <SmallCard
            :main-text="data.mostWatched.tv_show.title"
            :secondary-text="mostWatchTvShowString"
            icon="tvIcon"
            class="bg-blue-100"
          />
          <SmallCard
            :main-text="data.mostWatched.movie.title"
            :secondary-text="mostWatchMovieString"
            icon="movieIcon"
            class="bg-purple-100"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { convertSecondsToHoursMinutes } from "../../hepler/conversion";
import { AnalyzedUserData } from "../../types/types";
import SmallCard from "./smallCard.vue";

const props = defineProps<{
  data: AnalyzedUserData;
}>();

const showProfileData = ref(false);

const firstActivityString = `${props.data.user_since.years} years ${props.data.user_since.days} days`;
const totalWatchTimeString = `${props.data.totalWatchTime.days} days ${props.data.totalWatchTime.hours} hours ${props.data.totalWatchTime.minutes} minutes ${props.data.totalWatchTime.seconds} seconds`;
const mostWatchTvShowString = `${
  convertSecondsToHoursMinutes(props.data.mostWatched.tv_show.watchTime).hours
} hours ${
  convertSecondsToHoursMinutes(props.data.mostWatched.tv_show.watchTime).minutes
} minutes`;

const mostWatchMovieString = `${
  convertSecondsToHoursMinutes(props.data.mostWatched.movie.watchTime).hours
} hours ${
  convertSecondsToHoursMinutes(props.data.mostWatched.movie.watchTime).minutes
} minutes`;
</script>
