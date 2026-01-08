<template>
  <div class="mt-6">
    <div class="d-flex align-center justify-space-between flex-wrap ga-3">
      <div>
        <div class="text-h4 font-weight-bold">{{ t.title }}</div>
        <div class="text-body-2 mt-2" style="max-width: 820px;">
          {{ t.subtitle }}
        </div>
      </div>

      <v-btn-toggle
        v-model="viewMode"
        mandatory
        class="d4l-view-toggle"
        density="comfortable"
        divided
      >
        <v-btn value="cards" prepend-icon="mdi-view-grid-outline">{{ t.viewCards }}</v-btn>
        <v-btn value="list" prepend-icon="mdi-view-list-outline">{{ t.viewList }}</v-btn>
      </v-btn-toggle>
    </div>

    <div class="mt-6">
      <FilterBar
        :disease-areas="store.diseaseAreas"
        :study-types="store.studyTypes"
        :phases="store.phases"
        @update:query="query = $event"
        @update:diseaseArea="diseaseArea = $event"
        @update:studyType="studyType = $event"
        @update:phase="phase = $event"
      />
    </div>

    <!-- Cards view -->
    <v-row v-if="viewMode === 'cards'" class="mt-4" dense>
      <v-col v-for="w in filtered" :key="w.id" cols="12" sm="6" md="4" lg="3">
        <WizardCard :wizard="w" @open="openWizard" />
      </v-col>

      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card
          class="h-100 d-flex align-center justify-center text-center"
          rounded="xl"
          variant="outlined"
          style="border-style: dashed;"
          @click="createCustom"
        >
          <v-card-text class="py-10">
            <v-avatar size="44" rounded="lg" class="mb-3">
              <v-icon icon="mdi-plus" />
            </v-avatar>
            <div class="text-subtitle-1 font-weight-semibold">{{ t.customScenarioTitle }}</div>
            <div class="text-body-2 mt-1">{{ t.customScenarioSubtitle }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- List view -->
    <v-card v-else class="mt-4" rounded="l">
      <v-data-table
        :items="filtered"
        :headers="headers"
        item-value="id"
        show-expand
        density="comfortable"
      >
        <template #item.primaryLabel="{ item }">
          <v-chip size="small" variant="tonal">{{ item.diseaseArea }}</v-chip>
        </template>

        <template #item.otherLabels="{ item }">
          <div class="d-flex flex-wrap ga-2">
            <v-chip v-for="l in item.otherLabels" :key="l" size="small" variant="tonal">
              {{ l }}
            </v-chip>
          </div>
        </template>

        <template #expanded-row="{ columns, item }">
          <tr>
            <td :colspan="columns.length" class="pa-0">
              <v-sheet class="pa-4">
                <div class="text-subtitle-2 font-weight-semibold">{{ item.title }}</div>
                <div class="text-body-2 mt-1">{{ item.description }}</div>

                <div class="d-flex align-center ga-2 mt-3">
                  <v-btn
                    size="small"
                    class="d4l-btn-secondary"
                    variant="outlined"
                    @click="openWizard(item.id)"
                  >
                    {{ t.listActions.viewDetails }}
                  </v-btn>
                  <v-btn
                    size="small"
                    class="d4l-btn-primary"
                    variant="flat"
                    @click="start"
                  >
                    {{ t.listActions.openCohort }}
                  </v-btn>
                </div>
              </v-sheet>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useWizardsStore } from "@/stores/wizards";
import FilterBar from "@/components/FilterBar.vue";
import WizardCard from "@/components/WizardCard.vue";
import translations from "@/static/translations.json";

const store = useWizardsStore();
const router = useRouter();
const t = translations.wizardSelect;

const query = ref("");
const diseaseArea = ref<string | null>(null);
const studyType = ref<string | null>(null);
const phase = ref<string | null>(null);

const viewMode = ref<"cards" | "list">("cards");

onMounted(() => {
  const saved = window.localStorage.getItem("d2e:viewMode");
  if (saved === "cards" || saved === "list") viewMode.value = saved;
});

watch(viewMode, (v) => window.localStorage.setItem("d2e:viewMode", v));

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  return store.wizards.filter((w) => {
    const matchesQ =
      !q ||
      w.title.toLowerCase().includes(q) ||
      w.id.toLowerCase().includes(q) ||
      w.diseaseArea.toLowerCase().includes(q) ||
      w.description.toLowerCase().includes(q);

    const matchesDisease = !diseaseArea.value || w.diseaseArea === diseaseArea.value;
    const matchesStudy = !studyType.value || w.studyType === studyType.value;
    const matchesPhase = !phase.value || w.phase === phase.value;

    return matchesQ && matchesDisease && matchesStudy && matchesPhase;
  });
});

const headers = [
  { title: t.listHeaders.id, key: "id", sortable: true, width: 120 },
  { title: t.listHeaders.title, key: "title", sortable: true },
  { title: t.listHeaders.primaryLabel, key: "primaryLabel", sortable: false, width: 220 },
  { title: t.listHeaders.otherLabels, key: "otherLabels", sortable: false },
];

function openWizard(id: string) {
  router.push(`/cohorts/wizards/${encodeURIComponent(id)}`);
}

function start() {
  const target = router.resolve("/cohorts/open");
  window.open(target.href, "_blank", "noopener");
}

function createCustom() {
  window.open("https://www.google.com", "_blank", "noopener");
}
</script>
