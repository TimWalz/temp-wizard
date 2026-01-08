<template>
  <v-img :src="cohortImage" alt="D2E cohort view" class="cohort-fullsize" contain />
</template>

<script setup lang="ts">
import cohortImage from "@/static/d2e_view.png";
</script>

<style scoped>
.cohort-fullsize {
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
  background: #000000;
}
</style>
