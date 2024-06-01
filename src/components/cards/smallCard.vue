<template>
  <div
    class="w-full flex px-8 py-6 sm:px-12 sm:py-8 items-center shadow-sm rounded-3xl gap-4"
  >
    <div class="flex flex-col justify-around gap-4 flex-1">
      <div class="font-semibold text-sm sm:text-3xl">{{ mainText }}</div>
      <div class="sm:text-xl text-sm" v-if="secondaryText">
        {{ secondaryText }}
      </div>
    </div>
    <img
      :src="getIconComponent(icon)"
      class="max-w-32 h-auto hidden sm:block"
    />
  </div>
</template>

<script setup lang="ts">
import Watching from "../../assets/watchingIcon.png";
import tvShow from "../../assets/tvShow.png";
import movieIcon from "../../assets/movie.png";

defineProps<{
  mainText: string;
  secondaryText?: string;
  icon: "watchingIcon" | "tvIcon" | "movieIcon";
}>();

const iconComponents: Record<string, typeof Watching> = {
  watchingIcon: Watching,
  tvIcon: tvShow,
  movieIcon: movieIcon,
};
const getIconComponent = (icon: string) => {
  return iconComponents[icon];
};
</script>
