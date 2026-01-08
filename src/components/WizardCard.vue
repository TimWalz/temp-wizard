<template>
  <v-card
    class="h-100 wizard-card"
    variant="tonal"
    @click="$emit('open', wizard.id)"
  >
    <v-card-text class="pa-5">
      <div class="d-flex align-start justify-space-between">
        <div class="d-flex align-center ga-3">
          <v-avatar size="36" rounded="lg" class="elevation-0">
            <v-icon :icon="wizard.icon" />
          </v-avatar>
          <div class="text-caption">{{ wizard.id }}</div>
        </div>

        <v-chip size="small" variant="flat" class="text-caption">
          {{ wizard.phase }}
        </v-chip>
      </div>

      <div class="text-subtitle-1 font-weight-semibold mt-3">
        {{ wizard.title }}
      </div>
      <div class="text-body-2 mt-2">
        {{ wizard.description }}
      </div>

      <div class="d-flex flex-wrap ga-2 mt-4">
        <v-chip size="small" variant="tonal">{{ wizard.diseaseArea }}</v-chip>
        <v-chip size="small" variant="tonal">{{ wizard.studyType }}</v-chip>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { Wizard } from "@/stores/wizards";
defineProps<{ wizard: Wizard }>();
defineEmits<{ (e: "open", id: string): void }>();
</script>
