/**
 * ============================================================
 *  PROJECTS — semua isi kartu project & halaman case study ada di sini.
 *  - category "web"  → menampilkan fitur, arsitektur, galeri screenshot
 *  - category "data" → menampilkan pertanyaan bisnis, metode, chart interaktif, insight
 *  Screenshot: taruh di public/projects/ lalu isi `gallery: [{ src: "/projects/nama.png", alt: "..." }]`
 *  Angka chart bertanda DUMMY wajib diganti dengan data asli kamu.
 * ============================================================
 */

export type Accent = "sage" | "rose" | "lavender" | "powder";
export type Category = "web" | "data";

export type ChartSpec = {
  title: string;
  caption?: string;
  type: "bar" | "line" | "area";
  xKey: string;
  unit?: string;
  series: { key: string; label: string; color: Accent }[];
  data: Record<string, string | number>[];
  /** Optional filter chips — rows are filtered by `key` */
  filter?: { key: string; label: string; options: string[] };
};

export type Project = {
  slug: string;
  title: string;
  category: Category;
  year: string;
  role: string;
  summary: string;
  accent: Accent;
  stack: string[];
  links?: { demo?: string; repo?: string; dashboard?: string };
  metrics?: { value: string; label: string }[];
  problem: string;
  // web
  features?: { title: string; desc: string }[];
  architecture?: { layer: string; detail: string }[];
  gallery?: { src?: string; alt: string }[];
  // data
  question?: string;
  dataset?: string;
  method?: { step: string; detail: string }[];
  chart?: ChartSpec;
  insights?: string[];
  recommendation?: string;
};

export const projects: Project[] = [
  /* ----------------------------------------------------------- WEB */
  {
    slug: "sim-wisma-trans",
    title: "SIM Wisma Trans",
    category: "web",
    year: "2026",
    role: "Full-stack developer · Thesis",
    summary:
      "A management information system for a 32-room guesthouse — reservations, housekeeping, payments and reporting in one place.",
    accent: "sage",
    stack: ["Laravel", "PHP 8.3", "MariaDB", "Tailwind CSS", "Livewire", "Midtrans"],
    links: { repo: "https://github.com/imyourchel/Wisma-Trans" },
    metrics: [
      { value: "8", label: "modules" },
      { value: "36", label: "database tables" },
      { value: "6", label: "user roles" },
    ],
    problem:
      "Wisma Trans ran bookings, room status and cleaning schedules on paper and chat groups. Double bookings, unclear room readiness and uneven housekeeping workloads were daily friction.",
    features: [
      {
        title: "Reservation & booking",
        desc: "Walk-in, online and B2B bookings with live room availability and Midtrans payment.",
      },
      {
        title: "Smart cleaning priority",
        desc: "AHP-SAW ranks rooms to clean first based on check-in time, room status and guest type.",
      },
      {
        title: "Workload balancing",
        desc: "A greedy algorithm distributes cleaning tasks evenly across housekeeping staff.",
      },
      {
        title: "Multi-role access",
        desc: "Six roles with multi-role support and custom middleware per module.",
      },
    ],
    architecture: [
      { layer: "Blade + Livewire", detail: "Server-rendered UI, 5 reactive screens" },
      { layer: "Laravel 13", detail: "Controllers, services, role middleware" },
      { layer: "Decision engine", detail: "AHP-SAW + greedy scheduler" },
      { layer: "MariaDB", detail: "36 normalised tables" },
      { layer: "Midtrans", detail: "Payment gateway & webhooks" },
    ],
    gallery: [
      { alt: "Dashboard overview" },
      { alt: "Room status board" },
      { alt: "Cleaning priority list" },
    ],
  },
  {
    slug: "hk-group-erp",
    title: "HK Group ERP — Payroll",
    category: "web",
    year: "2026",
    role: "Frontend developer",
    summary:
      "Redesigning the payroll module of an in-house ERP: seven scattered sub-modules consolidated into two clear workflows.",
    accent: "lavender",
    stack: ["ERP", "Web frontend", "REST API", "MySQL"], // TODO: sesuaikan dengan stack asli
    metrics: [
      { value: "7 → 2", label: "sub-modules" },
      { value: "Tabbed", label: "workflow layout" },
    ],
    problem:
      "HR staff had to jump between seven payroll screens to prepare a single pay run, and inconsistent period records made totals hard to trust.",
    features: [
      {
        title: "Payroll Setup",
        desc: "Components, periods and employee rules managed in one tabbed workspace.",
      },
      {
        title: "Payroll Run",
        desc: "Generate, review and finalise pay slips with clear status tracking.",
      },
      {
        title: "Safe route migration",
        desc: "Old URLs redirect to the new screens instead of breaking bookmarks.",
      },
      {
        title: "Data consistency checks",
        desc: "Flagged and fixed inconsistent payroll period records.",
      },
    ],
    architecture: [
      { layer: "Frontend", detail: "Tabbed module screens" },
      { layer: "API layer", detail: "Payroll setup & run endpoints" },
      { layer: "Database", detail: "Periods, components, slips" },
    ],
    gallery: [{ alt: "Payroll Setup tabs" }, { alt: "Payroll Run review" }],
  },
  {
    slug: "corners",
    title: "CORNERS",
    category: "web",
    year: "2026",
    role: "Solo builder",
    summary:
      "A football & futsal matchmaking platform that helps teams across Indonesia find opponents, schedule matches and split the bill.",
    accent: "powder",
    stack: ["Next.js", "React", "Firebase", "Midtrans"],
    links: { demo: "https://football-matchmaking-app.vercel.app" },
    metrics: [
      { value: "Jakarta", label: "launch market" },
      { value: "10 wk", label: "build plan" },
    ],
    problem:
      "Amateur teams find opponents through scattered WhatsApp groups. Scheduling is slow, results are never recorded, and someone always ends up paying the whole pitch fee.",
    features: [
      { title: "Team profiles", desc: "Create a team, set availability and show match history." },
      { title: "Direct challenges", desc: "Browse teams and send a match challenge in two taps." },
      { title: "Split bill", desc: "Organiser fronts the venue; others pay their share in-app or by transfer." },
      { title: "Admin dashboard", desc: "Moderate teams, matches and recorded results." },
    ],
    architecture: [
      { layer: "Next.js", detail: "SEO-friendly web app" },
      { layer: "Firebase", detail: "Auth, Firestore, functions" },
      { layer: "Midtrans", detail: "Optional in-app payment" },
    ],
    gallery: [{ alt: "Team discovery" }, { alt: "Challenge flow" }, { alt: "Split bill" }],
  },

  /* ---------------------------------------------------------- DATA */
  {
    slug: "cafe-menu-optimization",
    title: "Cafe Menu Optimization",
    category: "data",
    year: "2026",
    role: "Data analyst",
    summary:
      "Using order-share analysis per category to cut a bloated beverage menu without losing what customers actually buy.",
    accent: "rose",
    stack: ["Excel", "Python", "Pandas", "ERP data"],
    metrics: [
      { value: "10", label: "items removed" },
      { value: "4", label: "categories analysed" },
    ],
    problem:
      "The cafe's beverage menu had grown to many near-identical variants, increasing stock complexity and slowing down service.",
    question: "Which menu items can we remove while keeping every category healthy?",
    dataset: "Order transactions from April onward, exported from the cafe's ERP system.",
    method: [
      { step: "Clean & group", detail: "Normalised item names and grouped orders into juice, tea, coffee and non-caffeine." },
      { step: "Order share", detail: "Computed each item's share of orders within its own category, not globally." },
      { step: "Cut rule", detail: "Removed the weakest items per category, scaled by category volume." },
      { step: "Recost", detail: "Prepared HPP (COGS) recalculation for the remaining items." },
    ],
    chart: {
      title: "Order share within category",
      caption: "DUMMY numbers — replace with real order share.",
      type: "bar",
      xKey: "item",
      unit: "%",
      series: [{ key: "share", label: "Order share", color: "rose" }],
      filter: { key: "category", label: "Category", options: ["Coffee", "Tea", "Juice", "Non-caffeine"] },
      data: [
        { item: "Kopi Susu", category: "Coffee", share: 34 },
        { item: "Americano", category: "Coffee", share: 22 },
        { item: "Cappuccino", category: "Coffee", share: 18 },
        { item: "Kopi Vanila", category: "Coffee", share: 6 },
        { item: "Kopi Milo", category: "Coffee", share: 5 },
        { item: "Mochaccino", category: "Coffee", share: 4 },
        { item: "Teh Tarik", category: "Tea", share: 38 },
        { item: "Lemon Tea", category: "Tea", share: 31 },
        { item: "Teh Rimpang", category: "Tea", share: 7 },
        { item: "Teh Herbal", category: "Tea", share: 5 },
        { item: "Jus Alpukat", category: "Juice", share: 29 },
        { item: "Jus Mangga", category: "Juice", share: 24 },
        { item: "Jus Melon", category: "Juice", share: 6 },
        { item: "Jus Leci", category: "Juice", share: 5 },
        { item: "Chocolate Ice", category: "Non-caffeine", share: 36 },
        { item: "Matcha Milk", category: "Non-caffeine", share: 27 },
        { item: "Lemonade Ice", category: "Non-caffeine", share: 8 },
        { item: "Blue Mix Berry", category: "Non-caffeine", share: 6 },
        { item: "Mix Berry Milk", category: "Non-caffeine", share: 5 },
      ],
    },
    insights: [
      "Ranking items globally would have wiped out whole categories with many similar variants — juice especially — so the cut was done per category.",
      "Non-caffeine has the lowest total order volume, so it received a proportionally larger cut (3 of 7 items).",
      "Ten items were removed in total, from Teh Rimpang to Jus Leci, all sitting at the bottom of their category's order share.",
    ],
    recommendation:
      "Remove the 10 low-share items, then recalculate HPP using manual costs first and switch to inventory valuation once stock data is reliable.",
  },
  {
    slug: "ecommerce-sales-analysis",
    title: "E-commerce Sales Analysis",
    category: "data",
    year: "2026",
    role: "Data analyst · RevoU",
    summary:
      "Querying a marketplace dataset in BigQuery to explain where revenue comes from and which customer segments are slipping.",
    accent: "sage",
    stack: ["BigQuery", "SQL", "Statistics", "Looker Studio"],
    links: { dashboard: "#" }, // TODO: link dashboard
    metrics: [
      { value: "SQL", label: "BigQuery" },
      { value: "12 mo", label: "time window" },
    ],
    problem:
      "The business saw revenue flattening but could not tell whether it came from fewer customers, smaller baskets or a single weak category.",
    question: "What is driving the revenue slowdown, and where should marketing focus next quarter?",
    dataset: "Orders, customers and product tables from a marketplace sample dataset (RevoU project).",
    method: [
      { step: "Model", detail: "Joined orders, items and customers into one analysis table in BigQuery." },
      { step: "Decompose", detail: "Split revenue into customers × orders per customer × average order value." },
      { step: "Test", detail: "Checked segment differences with basic statistical tests." },
      { step: "Visualise", detail: "Built an interactive dashboard for the marketing team." },
    ],
    chart: {
      title: "Monthly revenue by segment",
      caption: "DUMMY numbers — replace with your query results.",
      type: "area",
      xKey: "month",
      unit: "M",
      series: [
        { key: "new", label: "New customers", color: "sage" },
        { key: "returning", label: "Returning", color: "lavender" },
      ],
      data: [
        { month: "Jan", new: 42, returning: 61 },
        { month: "Feb", new: 45, returning: 63 },
        { month: "Mar", new: 51, returning: 66 },
        { month: "Apr", new: 49, returning: 70 },
        { month: "May", new: 47, returning: 72 },
        { month: "Jun", new: 44, returning: 75 },
        { month: "Jul", new: 40, returning: 77 },
        { month: "Aug", new: 38, returning: 79 },
        { month: "Sep", new: 36, returning: 80 },
        { month: "Oct", new: 35, returning: 82 },
        { month: "Nov", new: 39, returning: 88 },
        { month: "Dec", new: 41, returning: 93 },
      ],
    },
    insights: [
      "[Replace] Your first key finding — e.g. which segment is shrinking and by how much.",
      "[Replace] Your second finding — e.g. the category that drives most of the gap.",
      "[Replace] Your third finding — e.g. a statistically significant difference you confirmed.",
    ],
    recommendation: "[Replace] The concrete action you recommended to the business.",
  },
  {
    slug: "low-light-object-detection",
    title: "Low-Light Object Detection",
    category: "data",
    year: "2026",
    role: "Researcher",
    summary:
      "Knowledge distillation to help a lightweight YOLOv8 model detect cars and pedestrians in night-time driving scenes.",
    accent: "lavender",
    stack: ["Python", "PyTorch", "YOLOv8", "BDD100K", "Google Colab"],
    metrics: [
      { value: "YOLOv8", label: "teacher → student" },
      { value: "3×", label: "repeated runs" },
    ],
    problem:
      "Small detection models are fast enough for edge devices but lose a lot of accuracy at night, exactly when driver assistance matters most.",
    question: "Can a large teacher model transfer its low-light robustness to a small student model?",
    dataset: "BDD100K driving-scene dataset, filtered to night and low-light frames.",
    method: [
      { step: "Baseline", detail: "Trained teacher and student YOLOv8 models on low-light frames." },
      { step: "Distil", detail: "Trained the student with knowledge distillation from the teacher." },
      { step: "Repeat", detail: "Ran training three times to check run-to-run consistency." },
      { step: "Ablate", detail: "Removed one loss component to measure its contribution." },
    ],
    chart: {
      title: "mAP@50 by model",
      caption: "DUMMY numbers — replace with your evaluation CSVs.",
      type: "bar",
      xKey: "model",
      unit: "%",
      series: [
        { key: "day", label: "Daytime", color: "powder" },
        { key: "night", label: "Night", color: "lavender" },
      ],
      data: [
        { model: "Teacher", day: 62, night: 51 },
        { model: "Student", day: 48, night: 34 },
        { model: "Student + KD", day: 51, night: 41 },
        { model: "KD (ablation)", day: 50, night: 38 },
      ],
    },
    insights: [
      "[Replace] How much the distilled student improved at night versus the plain student.",
      "[Replace] What the ablation run showed about the removed component.",
      "[Replace] How consistent the three runs were.",
    ],
    recommendation: "[Replace] Your conclusion and the next experiment you would run.",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
