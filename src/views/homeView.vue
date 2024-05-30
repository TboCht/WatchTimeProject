<template>
  <div class="flex items-center justify-center">
    <div class="flex flex-col gap-8 items-center h-full py-20 max-w-4xl">
      <h2 class="text-4xl font-bold text-gray-800">
        Calculate your Netflix watch time in a few clicks.
      </h2>
      <div class="text-lg font-semibold text-gray-700 text-center">
        This is a free tool made as a side project. No data is collected or
        shared.
      </div>

      <div class="text-xl font-medium text-gray-800 mt-4">
        How does it work?
      </div>
      <div class="text-gray-700 space-y-4 w-full">
        <p>
          <span class="font-semibold text-xl"> First Step:</span> You will need
          to ask Netflix for your personal data.<br />
          This can be done from your Netflix "Account" > "SECURITY & PRIVACY" >
          "Download your personal information".
          <br />
          Netflix will then send you an email when your data is ready to
          download.
        </p>
        <p class="italic">
          Note: It can take a few days for Netflix to send you the data.
        </p>
      </div>
      <div class="text-gray-700 space-y-4 w-full">
        <p>
          <span class="font-semibold text-xl"> Second Step:</span> Once you have
          your "netflix-report", unzip it, then find the file:
          <span class="font-semibold text-gray-800">ViewingActivity.csv</span>
        </p>
        <p class="italic">
          Path: netflix-report > CONTENT_INTERACTION > ViewingActivity.csv
        </p>
      </div>
      <div class="text-gray-700 space-y-4 w-full">
        <p>
          <span class="font-semibold text-xl"> Third Step:</span> Upload the
          file and click on Analyze file
        </p>
      </div>

      <input
        type="file"
        id="input"
        @change="handleFileUpload"
        class="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded-lg border border-solid bg-transparent bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-lg file:border-0 file:border-e file:border-solid file:border-inherit file:bg-blue-100 file:hover:bg-blue-500 file:hover:text-white file:transition-all file:px-3 file:py-2 file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white file:dark:text-white"
      />
      <div class="flex flex-col items-center gap-2 mt-4">
        <button
          @click="handleAnalyzeClick"
          class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Analyze
        </button>
        <p class="text-red-600" v-if="noFileDetected">No file detected</p>
        <div v-if="errorAnalyse" class="text-red-600">
          <p>
            There was an error analysing your file. Check that you have
            correctly follow all the steps correctly
          </p>
          <p class="italic">
            NB: Dowloading your viewing activity directly from your profile
            won't give you the correct file.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { parseCSV } from "../composables/parseCSV";
import { analyzeData } from "../composables/analysis";
import { analyzedUserData } from "../types/types";

const fileUploaded = ref();

const noFileDetected = ref(false);
const errorAnalyse = ref(false);

const handleFileUpload = (event: Event) => {
  noFileDetected.value = false;
  errorAnalyse.value = false;
  const input = event.target as HTMLInputElement;
  fileUploaded.value = input.files ? input.files[0] : null;
};

const emits = defineEmits<{
  (e: "analysisSuccess", data: analyzedUserData[]): void;
}>();

const handleAnalyzeClick = async () => {
  if (fileUploaded.value) {
    try {
      const resultsParsed = await parseCSV(fileUploaded.value);
      const analyzedDataResults = await analyzeData(resultsParsed);
      if (analyzedDataResults.length > 0)
        emits("analysisSuccess", analyzedDataResults);
    } catch (error) {
      console.error("Error parsing CSV:", error);
      errorAnalyse.value = true;
    }
  } else {
    noFileDetected.value = true;
  }
};
</script>
