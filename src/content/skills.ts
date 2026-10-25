/**
 * SKILLS — `projects` berisi slug project yang memakai skill tersebut.
 * Saat skill di-hover, project terkait akan di-highlight.
 */
export type SkillGroup = {
  group: "Web" | "Data" | "Tools";
  blurb: string;
  accent: "sage" | "rose" | "lavender" | "powder";
  skills: { name: string; projects: string[] }[];
};

export const skillGroups: SkillGroup[] = [
  {
    group: "Web",
    blurb: "Business systems, from schema to screen.",
    accent: "sage",
    skills: [
      { name: "Laravel", projects: ["sim-wisma-trans"] },
      { name: "PHP", projects: ["sim-wisma-trans"] },
      { name: "React", projects: ["corners"] },
      { name: "Next.js", projects: ["corners"] },
      { name: "TypeScript", projects: ["corners"] },
      { name: "Tailwind CSS", projects: ["sim-wisma-trans", "corners"] },
      { name: "Livewire", projects: ["sim-wisma-trans"] },
      { name: "REST API", projects: ["hk-group-erp", "corners"] },
      { name: "MySQL / MariaDB", projects: ["sim-wisma-trans", "hk-group-erp"] },
      { name: "Firebase", projects: ["corners"] },
    ],
  },
  {
    group: "Data",
    blurb: "Questions first, charts second.",
    accent: "rose",
    skills: [
      { name: "SQL", projects: ["ecommerce-sales-analysis", "sim-wisma-trans"] },
      { name: "BigQuery", projects: ["ecommerce-sales-analysis"] },
      { name: "Python", projects: ["cafe-menu-optimization", "low-light-object-detection"] },
      { name: "Pandas", projects: ["cafe-menu-optimization"] },
      { name: "Excel", projects: ["cafe-menu-optimization"] },
      { name: "Statistics", projects: ["ecommerce-sales-analysis"] },
      { name: "Looker Studio", projects: ["ecommerce-sales-analysis"] },
      { name: "Tableau", projects: [] },
      { name: "PyTorch / YOLOv8", projects: ["low-light-object-detection"] },
    ],
  },
  {
    group: "Tools",
    blurb: "How the work gets designed and shipped.",
    accent: "lavender",
    skills: [
      { name: "Git & GitHub", projects: ["sim-wisma-trans", "corners", "hk-group-erp"] },
      { name: "Figma", projects: ["sim-wisma-trans", "corners"] },
      { name: "BPMN / draw.io", projects: ["sim-wisma-trans"] },
      { name: "Google Colab", projects: ["low-light-object-detection"] },
      { name: "Midtrans", projects: ["sim-wisma-trans", "corners"] },
      { name: "Vercel", projects: ["corners"] },
    ],
  },
];
