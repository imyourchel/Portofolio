# Portfolio — Hizkia

Next.js 16 · TypeScript · Tailwind CSS v4 · Framer Motion · Recharts

## Menjalankan di komputer (Windows)

Butuh **Node.js 20.9+** (cek dengan `node -v`). Buka terminal di folder ini lalu:

```bash
npm install
npm run dev
```

Buka http://localhost:3000. (Tidak perlu XAMPP/Apache — Next.js punya server sendiri.)

Build produksi: `npm run build` lalu `npm start`.

## Mengganti isi (tanpa menyentuh komponen)

| File | Isi |
|---|---|
| `src/content/site.ts` | Nama, tagline, email, LinkedIn, GitHub, about |
| `src/content/projects.ts` | Semua project + case study + data chart |
| `src/content/skills.ts` | Skill & project yang memakainya |
| `src/content/experience.ts` | Timeline journey |
| `src/app/globals.css` | Warna (bagian `:root` dan `.dark`) |

- **CV**: taruh file `cv.pdf` di folder `public/`.
- **Screenshot project**: taruh di `public/projects/`, lalu isi `gallery: [{ src: "/projects/nama.png", alt: "..." }]`.
- **Foto**: lihat komentar di `src/components/about-section.tsx`.
- Cari teks `TODO`, `[Replace]`, dan `DUMMY` — itu bagian yang wajib diganti.

## Fitur interaktif

- Command palette: `Ctrl + K` / `⌘ + K`
- Filter project All / Web / Data dengan animasi layout
- Hover skill → project terkait di-highlight
- Chart interaktif (filter, toggle series, tooltip) di case study data
- Galeri screenshot dengan lightbox (← → Esc)
- Dark mode, blob hero mengikuti kursor, tombol magnetic, kartu tilt 3D
- Menghormati `prefers-reduced-motion`

## Deploy

Push ke GitHub → import di https://vercel.com → Deploy. Setelah dapat domain, ganti `url` di `src/content/site.ts`.
# Portofolio
