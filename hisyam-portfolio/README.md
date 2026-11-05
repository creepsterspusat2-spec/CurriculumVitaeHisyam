# Mochammad Hisyam Aflahuddin · Curriculum Vitae

Website statis untuk melihat CV dan pengalaman (non-komersial) (HTML + CSS + JavaScript, tanpa build). Buka `index.html` di browser atau upload seluruh folder ke hosting statis (Netlify, Vercel, GitHub Pages, dll.).

## Struktur

```
index.html          Struktur halaman & SEO
css/style.css       Seluruh gaya (warna aksen di :root)
js/data.js          SEMUA konten yang perlu kamu isi (karya, kontak, pengalaman)
js/main.js          Logika interaksi (filter, lightbox, animasi, navigasi)
assets/img/         Foto & thumbnail karya
assets/video/       Video karya
```

## Yang perlu kamu ganti

| Apa | Di mana |
| --- | --- |
| File CV (tombol Unduh CV) | ganti `assets/cv/CV-Mochammad-Hisyam-Aflahuddin.pdf` (nama file sama) |
| Foto profil | simpan sebagai `assets/img/hisyam.jpg` (rasio 4:5) |
| Foto kedua (About) | `assets/img/about.jpg` (opsional) |
| Gambar share (OG) | `assets/img/og-cover.jpg` (1200×630) |
| Folder portofolio (Google Drive) | `js/data.js` → `portfolio.folderId` (folder harus dibagikan "Siapa saja yang memiliki link") |
| Kontak & sosial media | `js/data.js` → `contact` |
| Pengalaman / sertifikat | `js/data.js` → `experience` (kosong = tampil kotak placeholder) |
| Domain asli (SEO) | `index.html` → `<link rel="canonical">` |

## Catatan
- Tidak ada persentase skill, pengalaman, atau prestasi fiktif; semua pengisian bersifat opsional dan manual.
- Font dimuat dari Google Fonts; sisanya tanpa dependensi.
