<template>
  <MainHeader />
  <HomeView
    v-show="showHomeView"
    @analysis-success="(data) => handleAnalysisSuccess(data)"
  />
  <AnalysisView v-if="showAnalysisView" :user-data="userData" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import HomeView from "./homeView.vue";
import MainHeader from "./MainHeader.vue";
import AnalysisView from "./AnalysisView.vue";
import { analyzedUserData } from "../types/types";

const showHomeView = ref(true);
const showAnalysisView = ref(false);
const userData = ref();

const handleAnalysisSuccess = (data: analyzedUserData[]) => {
  console.log("success");
  userData.value = data;
  showHomeView.value = false;
  showAnalysisView.value = true;
};
</script>
