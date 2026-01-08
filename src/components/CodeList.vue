<template>
  <v-card rounded="xl" class="pa-4">
    <div class="d-flex align-center ga-2 mb-2">
      <v-icon v-if="icon" :icon="icon" />
      <div class="text-subtitle-1 font-weight-semibold">{{ title }}</div>
    </div>

    <div v-if="subtitle" class="text-body-2 mb-4">
      {{ subtitle }}
    </div>

    <v-card variant="outlined" rounded="xl" class="pa-4">
      <div v-for="g in groups" :key="g.name" class="mb-4">
        <div class="d-flex align-center ga-2 font-weight-semibold">
          <v-icon icon="mdi-alert-circle-outline" size="18" />
          <div class="text-body-2 font-weight-semibold">{{ g.name }}</div>
        </div>

        <v-list density="compact" class="mt-2" bg-color="transparent">
          <v-list-item v-for="it in g.items" :key="it.code" class="px-0">
            <template #prepend>
              <v-icon icon="mdi-circle-small" />
            </template>

            <v-list-item-title class="text-body-2">
              <span class="font-weight-semibold">{{ it.code }}</span>: {{ it.label }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </div>
    </v-card>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
  icon?: string;
  groups: { name: string; items: { code: string; label: string }[] }[];
}>();
</script>
