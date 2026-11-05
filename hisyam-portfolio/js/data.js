/* =========================================================
   DATA SITUS — EDIT FILE INI UNTUK MENGGANTI ISI WEBSITE
   Semua yang berupa placeholder ditandai jelas. Tidak ada data
   pengalaman / prestasi fiktif: kosongkan = tampil sebagai kotak kosong.
   ========================================================= */
window.SITE = {
  name: "Mochammad Hisyam Aflahuddin",

  /* ---------- KONTAK ----------
     Isi nilai asli. Kosong ("") = tombol menampilkan pemberitahuan "belum diisi".
     email     : "nama@domain.com"
     whatsapp  : nomor format internasional tanpa + / spasi, contoh "6281234567890"
     lainnya   : URL profil lengkap, contoh "https://instagram.com/akunmu"        */
  contact: {
    email: "mochammadhisyamaflah@students.undip.ac.id",
    whatsapp: "628989319303",
    instagram: "",
    tiktok: "",
    behance: "",
    linkedin: ""
  },

  /* ---------- PORTOFOLIO KARYA ----------
     Karya disimpan di folder Google Drive. folderId = bagian setelah /folders/ pada link.
     Agar bisa dilihat pengunjung, folder harus dibagikan "Siapa saja yang memiliki link" (Viewer). */
  portfolio: {
    folderId: "19O0M2JwpRQaEJZiHT9zyfpTA8C9CH1XI"
  },

  /* ---------- EXPERIENCE & ACHIEVEMENT ----------
     Biarkan array kosong [] jika belum ada; grup yang kosong tidak ditampilkan. Isi hanya data yang benar-benar nyata.
     Format item: { title: "Jabatan / Nama", org: "Instansi / Penyelenggara", period: "2024 — 2025", desc: "Deskripsi singkat" }  */
  experience: {
    education: [
      { title: "S-1 Sejarah", org: "Universitas Diponegoro, Semarang", period: "2025 — Sekarang", desc: "" },
      { title: "Matematika dan IPA", org: "SMA Islam Tahfidzul Qur'an Raudlatul Falah", period: "2021 — 2024", desc: "" },
      { title: "Santri", org: "Pondok Pesantren Remaja Tahfidzul Qur'an Raudlatul Falah", period: "2018 — 2025", desc: "" }
    ],
    work: [
      { title: "Tim Media dan Dokumentasi", org: "Pondok Pesantren Remaja Tahfidzul Qur'an Raudlatul Falah", period: "2024 — 2025", desc: "" },
      { title: "Pengurus Harian (Murroby)", org: "Pondok Pesantren Remaja Tahfidzul Qur'an Raudlatul Falah", period: "2024 — 2025", desc: "" },
      { title: "Asisten Bendahara 3", org: "Pondok Pesantren Remaja Tahfidzul Qur'an Raudlatul Falah", period: "2024 — 2025", desc: "" }
    ],
    organization: [
      { title: "Pelatih Internal", org: "UKM Rebana Universitas Diponegoro", period: "2026 — Sekarang", desc: "" },
      { title: "Staff Muda Kantor Media dan Informasi", org: "UKM Rebana Universitas Diponegoro", period: "2025 — Sekarang", desc: "" },
      { title: "Pelatih Rebana", org: "Pondok Pesantren Remaja Tahfidzul Qur'an Raudlatul Falah", period: "2024 — 2025", desc: "" },
      { title: "Anggota Rebana", org: "Pondok Pesantren Remaja Tahfidzul Qur'an Raudlatul Falah", period: "2018 — 2024", desc: "" }
    ],
    committee: [
      { title: "Wakil Ketua Pelaksana", org: "Panitia Malam Cinta Rasul Universitas Diponegoro", period: "2026", desc: "Mendampingi dan membantu kinerja Ketua Pelaksana; ikut memonitor kinerja tiap divisi acara." },
      { title: "Divisi PDD", org: "Panitia Serah Terima Jabatan UKM READY 2025 Undip", period: "2025", desc: "Membuat desain Q card untuk MC dan desain backdrop; mengabadikan foto selama acara." },
      { title: "Panitia", org: "PPRTQ Raudlatul Falah Bersholawat dan Harlah Assyrof serta Rebana Al-Falah", period: "2024", desc: "Mendesain konten poster acara, MMT, dan backdrop untuk promosi; menjadi penghubung antara pengurus pusat pondok pesantren dan panitia antar divisi." },
      { title: "Staff Divisi Dokumentasi dan Publikasi", org: "Kemah Santri PPRTQ Raudlatul Falah", period: "2024", desc: "Membuat video dokumentasi dan mengabadikan foto kegiatan selama perkemahan." },
      { title: "Divisi Pendataan dan Pengarsipan", org: "Panitia Penerimaan Santri Baru", period: "2024", desc: "Mengarsipkan dan merekap dokumen fisik calon santri, serta mendigitalisasinya." },
      { title: "Penanggung Jawab Santri Kelas 9 SMP", org: "Panitia Ziarah dan Rekreasi Yayasan Raudlatul Falah", period: "2024", desc: "" }
    ],
    awards:       []    // Sertifikat & penghargaan (kosong = bagian disembunyikan)
  }
};
