import { defineStore } from "pinia";

export type CodeItem = { code: string; label: string };

export type Wizard = {
  id: string;
  url: string;
  title: string;
  description: string;
  diseaseArea: string;
  studyType: string;
  phase: string;
  otherLabels: string[];
  icon: string;
  colorHint: string;
  demographics?: {
    ageRange: string;
    genders: string[];
    filters: string[];
  };
  codes?: {
    icdGroups: { name: string; items: CodeItem[] }[];
    procedureGroups: { name: string; items: CodeItem[] }[];
  };
};

const seed: Wizard[] = [
  {
    id: "ID-1024",
    url: "https://www.google.com",
    title: "Type 2 Diabetes Longitudinal",
    description:
      "Analysis of long-term insulin efficacy across varying demographics and comorbidities.",
    diseaseArea: "Endocrinology",
    studyType: "Observational",
    phase: "Phase III",
    otherLabels: ["Endocrinology", "Phase III"],
    icon: "mdi-water",
    colorHint: "#5aa9ff",
    demographics: {
      ageRange: "45 - 85 years",
      genders: ["Male", "Female", "All Genders"],
      filters: ["BMI > 25", "No prior MI", "HbA1c > 6.5%"],
    },
    codes: {
      icdGroups: [
        {
          name: "Endocrine, Nutritional and Metabolic Diseases (E00–E89)",
          items: [
            { code: "E11.9", label: "Type 2 diabetes mellitus without complications" },
            { code: "E11.65", label: "Type 2 diabetes mellitus with hyperglycemia" },
            { code: "E11.40", label: "Type 2 diabetes mellitus with diabetic neuropathy, unspecified" },
          ],
        },
        {
          name: "Diseases of the Circulatory System (I00–I99)",
          items: [
            { code: "I10", label: "Essential (primary) hypertension" },
            { code: "I25.10", label: "Atherosclerotic heart disease of native coronary artery without angina pectoris" },
          ],
        },
        {
          name: "Diseases of the Eye and Adnexa (H00–H59)",
          items: [
            { code: "H36", label: "Retinal disorders in diseases classified elsewhere (e.g., diabetic retinopathy)" },
          ],
        },
      ],
      procedureGroups: [
        {
          name: "Diagnostic Procedures",
          items: [
            { code: "81000", label: "Urinalysis, by dip stick or tablet reagent" },
            { code: "82947", label: "Glucose; quantitative, blood (e.g., fasting blood glucose)" },
            { code: "83036", label: "Hemoglobin A1c (HbA1c)" },
          ],
        },
        {
          name: "Therapeutic & Monitoring Procedures",
          items: [
            { code: "99213", label: "Office/outpatient visit, established patient (follow-up for diabetes management)" },
            { code: "95250", label: "Continuous glucose monitoring (CGM) sensor insertion" },
          ],
        },
      ],
    },
  },
  {
    id: "ID-0892",
    url: "",
    title: "Alzheimer's Early Onset",
    description:
      "Genomic sequencing correlation with cognitive decline markers in early onset cases.",
    diseaseArea: "Neurology",
    studyType: "Observational",
    phase: "Phase II",
    otherLabels: ["Neurology", "Observational"],
    icon: "mdi-brain",
    colorHint: "#b48cff",
  },
  {
    id: "ID-3321",
    url: "",
    title: "Cardiovascular Risk Factors",
    description:
      "Assessment of hypertension and cholesterol levels in post-operative patients.",
    diseaseArea: "Cardiology",
    studyType: "Clinical",
    phase: "Phase IV",
    otherLabels: ["Cardiology", "Phase IV"],
    icon: "mdi-heart-pulse",
    colorHint: "#ff7a7a",
  },
  {
    id: "ID-4110",
    url: "",
    title: "Pediatric Asthma Control",
    description:
      "Environmental trigger analysis for urban pediatric cohorts aged 5-12.",
    diseaseArea: "Respiratory",
    studyType: "Pediatrics",
    phase: "Phase I",
    otherLabels: ["Respiratory", "Pediatrics"],
    icon: "mdi-medical-bag",
    colorHint: "#62ffbf",
  },
];

export const useWizardsStore = defineStore("wizards", {
  state: () => ({ wizards: seed as Wizard[] }),
  getters: {
    byId: (s) => (id: string) => s.wizards.find((w) => w.id === id),
    diseaseAreas: (s) => [...new Set(s.wizards.map((w) => w.diseaseArea))].sort(),
    studyTypes: (s) => [...new Set(s.wizards.map((w) => w.studyType))].sort(),
    phases: (s) => [...new Set(s.wizards.map((w) => w.phase))].sort(),
  },
});
