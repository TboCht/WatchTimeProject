<template>
  <div class="shadow-xl border p-8 rounded-3xl">
    <div
      class="flex justify-between cursor-pointer"
      @click="showProfileData = !showProfileData"
    >
      <div class="space-y-2">
        <h1 class="text-4xl font-semibold">{{ data.userName }}</h1>
        <p>First activity : {{ firstActivityString }} ago</p>
      </div>

      <img
        src="../../assets/navArrow.png"
        class="w-20 h-auto sm:mr-18 transition-all ease-in-out scale-50"
        :class="showProfileData ? 'rotate-180' : 'rotate-0'"
      />
    </div>

    <transition name="expand">
      <div
        class="flex flex-col gap-8 transition-all"
        :class="
          showProfileData
            ? 'lg:h-[580px]  sm:h-[830px] sm:overflow-hidden overflow-auto'
            : 'h-0 overflow-hidden'
        "
      >
        <div class="space-y-4 pt-12">
          <h2 class="text-2xl">Total watch time</h2>
          <SmallCard
            :main-text="totalWatchTimeString"
            icon="watchingIcon"
            class="bg-orange-100"
          />
        </div>
        <div class="space-y-4">
          <h2 class="text-2xl">Most Watched</h2>
          <div class="flex gap-12 justify-between flex-col lg:flex-row">
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
    </transition>
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
