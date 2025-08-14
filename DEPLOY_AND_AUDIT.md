# Deploy & Audit Guide

## Lighthouse (lokal cepat)
1. Jalankan dev/preview:
   - Dev: `npm run dev` lalu buka http://localhost:5173
   - Preview build: `npm run build && npm run preview` (http://localhost:4173)
2. Jalankan audit CLI (desktop):
   `npx -y lighthouse http://localhost:4173 --only-categories=performance,accessibility,best-practices,seo --preset=desktop --view`
   (Untuk mobile ganti `--preset=mobile`)

## Lighthouse CI (GitHub Actions)
- File `.github/workflows/lhci.yml` sudah disiapkan.
- Cukup push ke `main`/`master`—workflow akan membangun dan menjalankan Lighthouse CI otomatis.

## Deploy ke Vercel (CLI)
1. `npm i -g vercel` (opsional, bisa via `npx vercel` juga)
2. `npx vercel login` (sekali saja)
3. `npm run build`
4. `npx vercel link` (pilih project lama agar overwrite, atau pilih existing project saat prompt)
5. `npx vercel --prod`

> `vercel.json` men-setup cache static (immutable, 1 tahun) dan folder output `dist`.

## Push ke GitHub (overwrite update)
1. `git add -A`
2. `git commit -m "perf: golden threads backdrop + perf tweaks"`
3. `git push origin main`

> Jika ingin force overwrite (hati-hati): `git push --force-with-lease origin main`

