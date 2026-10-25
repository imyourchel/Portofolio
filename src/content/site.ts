/**
 * ============================================================
 *  DATA PRIBADI — edit file ini untuk mengganti nama, kontak, dll.
 * ============================================================
 */
export const site = {
  name: "Hizkia",
  fullName: "Hizkia", // TODO: ganti dengan nama lengkap
  role: "Software Engineer & Data Analyst",
  tagline:
    "I build business systems that people actually use, and turn the data they produce into decisions.",
  location: "Indonesia",
  email: "hizkiarigel.business@gmail.com",
  url: "https://your-domain.dev", // TODO: ganti setelah deploy (dipakai untuk SEO & sitemap)
  cvPath: "/cv.pdf", // taruh file CV kamu di folder public/ dengan nama cv.pdf
  available: true,
  socials: {
    github: "https://github.com/your-username", // TODO
    linkedin: "https://www.linkedin.com/in/your-handle", // TODO
  },
  about: [
    "I'm an Informatics student at Universitas Ciputra who works where software meets operations — ERP modules, management information systems, and the dashboards that sit on top of them.",
    "My data side was sharpened at RevoU's Full-Stack Data Analytics program: SQL, BigQuery, Python and Tableau, always starting from the business question rather than the chart.",
    "I care about systems that are boring in the best way: predictable, well-modelled, and easy for non-technical teams to trust.",
  ],
  facts: [
    { label: "Based in", value: "Indonesia" },
    { label: "Focus", value: "Web systems · Analytics" },
    { label: "Languages", value: "Indonesian · English" },
    { label: "Open to", value: "Full-time · Internship" },
  ],
} as const;
