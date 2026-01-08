<template>
  <div class="mt-6" v-if="wizard">
    <div class="text-caption mb-2">{{ t.breadcrumbPrefix }} {{ wizard.title }}</div>

    <v-btn class="d4l-btn-secondary mb-4" variant="outlined" prepend-icon="mdi-arrow-left" @click="back">
      {{ common.backToCohorts }}
    </v-btn>
    
    <div class="d-flex align-start justify-space-between flex-wrap ga-4">
      <div style="min-width: 320px;">
        <div class="d-flex align-center ga-3">
          <v-avatar size="44" rounded="xl">
            <v-icon :icon="wizard.icon" />
          </v-avatar>
          <div class="text-h4 font-weight-bold">{{ wizard.title }}</div>
        </div>

        <div class="text-body-2 mt-3" style="max-width: 900px;">
          {{ wizard.description }}
        </div>
        
      </div>
      
      <div class="d-flex justify-end ga-3">
        <v-chip size="small" variant="tonal">{{ wizard.id }}</v-chip>  
        <v-btn class="d4l-btn-primary" variant="flat" @click="start">
          {{ common.openCohort }}
        </v-btn>
      </div>
      
    </div>

    <v-divider class="my-6" />

    <v-row dense>
      <v-col cols="12" md="4">
        <div class="text-h6 font-weight-bold mb-3">{{ t.cohortDemographicsTitle }}</div>

        <v-card rounded="xl" class="pa-4">
          <v-card variant="outlined" rounded="xl" class="pa-4 mb-4">
            <div class="text-caption">{{ t.ageRangeLabel }}</div>
            <div class="text-subtitle-2 font-weight-semibold mt-1">
              {{ wizard.demographics?.ageRange ?? "—" }}
            </div>

          </v-card>

          <v-card variant="outlined" rounded="xl" class="pa-4 mb-4">
            <div class="text-caption">{{ t.gendersLabel }}</div>

            <div class="d-flex flex-wrap ga-2 mt-2">
              <v-chip v-for="f in (wizard.demographics?.genders ?? [])" :key="f" size="small" variant="tonal">
                {{ f }}
              </v-chip>
            </div>
          </v-card>

          <v-card variant="outlined" rounded="xl" class="pa-4">
            <div class="text-caption">{{ t.additionalFiltersLabel }}</div>

            <div class="d-flex flex-wrap ga-2 mt-2">
              <v-chip v-for="f in (wizard.demographics?.filters ?? [])" :key="f" size="small" variant="tonal">
                {{ f }}
              </v-chip>
            </div>

            <div class="text-body-2 mt-2">
              {{ t.additionalFiltersDescription }}
            </div>
          </v-card>
        </v-card>
      </v-col>

      <v-col cols="12" md="8">
        <div class="text-h6 font-weight-bold mb-3">{{ t.medicalCodesTitle }}</div>

        <CodeList
          v-if="wizard.codes?.icdGroups?.length"
          :title="t.icdCodesTitle"
          icon="mdi-clipboard-text-outline"
          :subtitle="t.icdCodesSubtitle"
          :groups="wizard.codes.icdGroups"
        />

        <div class="my-4" />

        <CodeList
          v-if="wizard.codes?.procedureGroups?.length"
          :title="t.procedureCodesTitle"
          icon="mdi-bandage"
          :subtitle="t.procedureCodesSubtitle"
          :groups="wizard.codes.procedureGroups"
        />
      </v-col>
    </v-row>

    <v-divider class="my-6" />

    <div class="d-flex justify-end ga-3">
      <v-btn class="d4l-btn-secondary" variant="outlined" @click="back">{{ common.back }}</v-btn>
      <v-btn class="d4l-btn-primary" variant="flat" @click="start">
        {{ common.openCohort }}
      </v-btn>
    </div>
  </div>

  <div v-else class="mt-10">
    <v-alert type="warning" variant="tonal">{{ common.wizardNotFound }}</v-alert>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useWizardsStore } from "@/stores/wizards";
import CodeList from "@/components/CodeList.vue";
import translations from "@/static/translations.json";

const route = useRoute();
const router = useRouter();
const store = useWizardsStore();
const t = translations.wizardDetail;
const common = translations.common;

const wizard = computed(() => store.byId(String(route.params.id)));

function back() {
  router.push("/cohorts/wizards");
}
function start() {
  const target = wizard.value?.url?.trim();
  if (!target) {
    console.warn("Wizard URL is not defined for this cohort.");
    return;
  }

  const hasProtocol = /^https?:\/\//i.test(target);
  const href = hasProtocol ? target : `https://${target.replace(/^\/+/, "")}`;
  window.open(href, "_blank", "noopener");
}

</script>
