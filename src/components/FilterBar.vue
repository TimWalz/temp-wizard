<template>
  <v-card flat class="pa-4">
    <v-text-field
      v-model="localQuery"
      prepend-inner-icon="mdi-magnify"
      variant="solo-filled"
      density="comfortable"
      hide-details
      :placeholder="t.searchPlaceholder"
      rounded="l"
      @update:model-value="emit('update:query', localQuery)"
    />

    <div class="d-flex flex-wrap align-center ga-3 mt-4">
      <div class="text-caption">{{ t.filterBy }}</div>

      <v-select
        :items="diseaseAreas"
        v-model="localDisease"
        :label="t.diseaseAreaLabel"
        variant="solo-filled"
        density="compact"
        hide-details
        style="max-width: 220px"
        rounded="l"
        @update:model-value="emit('update:diseaseArea', localDisease)"
        clearable
      />

      <v-select
        :items="studyTypes"
        v-model="localStudy"
        :label="t.studyTypeLabel"
        variant="solo-filled"
        density="compact"
        hide-details
        style="max-width: 200px"
        rounded="l"
        @update:model-value="emit('update:studyType', localStudy)"
        clearable
      />

      <v-select
        :items="phases"
        v-model="localPhase"
        :label="t.phaseLabel"
        variant="solo-filled"
        density="compact"
        hide-details
        style="max-width: 160px"
        rounded="l"
        @update:model-value="emit('update:phase', localPhase)"
        clearable
      />

      <v-spacer />

      <v-btn class="d4l-btn-secondary" variant="outlined" density="comfortable" @click="reset">
        {{ t.resetFilters }}
      </v-btn>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import translations from "@/static/translations.json";

defineProps<{
  diseaseAreas: string[];
  studyTypes: string[];
  phases: string[];
}>();

const emit = defineEmits<{
  (e: "update:query", v: string): void;
  (e: "update:diseaseArea", v: string | null): void;
  (e: "update:studyType", v: string | null): void;
  (e: "update:phase", v: string | null): void;
  (e: "reset"): void;
}>();

const localQuery = ref("");
const localDisease = ref<string | null>(null);
const localStudy = ref<string | null>(null);
const localPhase = ref<string | null>(null);
const t = translations.filterBar;

function reset() {
  localQuery.value = "";
  localDisease.value = null;
  localStudy.value = null;
  localPhase.value = null;

  emit("update:query", "");
  emit("update:diseaseArea", null);
  emit("update:studyType", null);
  emit("update:phase", null);
  emit("reset");
}
</script>
