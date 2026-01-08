<template>
  <v-app>
    <v-app-bar v-if="!isFullscreen" flat height="64" class="">
      <v-container class="d-flex align-center" style="max-width: 1280px;">
        <div class="d-flex align-center ga-3">
          <img :src="logo" alt="Data2Evidence" style="height: 25px;" />
        </div>

        <v-spacer />

        <v-tabs density="compact" align-tabs="center">
          <!--
          <v-tab to="/cohorts/wizards">Cohorts</v-tab>
          <v-tab disabled>Dashboard</v-tab>
          <v-tab disabled>Settings</v-tab>
          -->
        </v-tabs>

        <v-spacer />
      </v-container>
    </v-app-bar>

    <v-main :class="isFullscreen ? 'pa-0' : ''">
      <v-container
        :fluid="isFullscreen"
        :class="isFullscreen ? 'pa-0' : ''"
        :style="isFullscreen ? '' : 'max-width: 1280px;'"
      >
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import logo from "@/static/D2E_TxtData2Evidence_Logo.png";

const route = useRoute();
const isFullscreen = computed(() => route.path === "/cohorts/open");
</script>
