<template>
  <MainHeader @home="handleHomeClick()" />
  <HomeView
    v-show="showHomeView"
    @analysis-success="(data) => handleAnalysisSuccess(data)"
  />
  <AnalysisView v-if="showAnalysisView" :users-data="userData" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import HomeView from "./homeView.vue";
import MainHeader from "./MainHeader.vue";
import AnalysisView from "./AnalysisView.vue";
import { AnalyzedUserData } from "../types/types";

const showHomeView = ref(true);
const showAnalysisView = ref(false);
const userData = ref();

const handleAnalysisSuccess = (data: AnalyzedUserData[]) => {
  console.log("success");
  userData.value = data;
  showHomeView.value = false;
  showAnalysisView.value = true;
};

const handleHomeClick = () => {
  showHomeView.value = true;
  showAnalysisView.value = false;
};
</script>
