import { createRouter, createWebHistory } from "vue-router";
import WizardSelect from "@/pages/WizardSelect.vue";
import WizardDetail from "@/pages/WizardDetail.vue";
import CohortOpen from "@/pages/CohortOpen.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/cohorts/wizards" },
    { path: "/cohorts/wizards", component: WizardSelect },
    { path: "/cohorts/wizards/:id", component: WizardDetail, props: true },
    { path: "/cohorts/open", component: CohortOpen },
  ],
});
