/**
 * EXPERIENCE / JOURNEY — urutkan dari yang terbaru.
 * TODO: lengkapi tahun & detail yang masih umum.
 */
export type Milestone = {
  period: string;
  title: string;
  org: string;
  kind: "work" | "education" | "course";
  points: string[];
};

export const journey: Milestone[] = [
  {
    period: "2026 — Present",
    title: "ERP Developer",
    org: "HK Group",
    kind: "work",
    points: [
      "Restructured the payroll module from seven sub-modules into Payroll Setup and Payroll Run.",
      "Supported cafe menu recosting and HPP calculation inside the ERP.",
    ],
  },
  {
    period: "2026",
    title: "Full-Stack Data Analytics",
    org: "RevoU",
    kind: "course",
    points: [
      "Hands-on projects with SQL, BigQuery, Python and Tableau.",
      "Every project framed around a business question, method and recommendation.",
    ],
  },
  {
    period: "20XX — Present",
    title: "Informatics",
    org: "Universitas Ciputra",
    kind: "education",
    points: [
      "Thesis: SIM Wisma Trans, a guesthouse MIS with AHP-SAW and greedy scheduling.",
      "Coursework in Business Intelligence & Data Analytics.",
    ],
  },
];
