/* =========================================================
   HISYAM · Interaksi website
   Data konten ada di js/data.js. File ini hanya logika.
   ========================================================= */
(() => {
  'use strict';

  const S = window.SITE;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  document.documentElement.classList.add('js');

  /* ---------- Toast ---------- */
  const toastEl = $('#toast');
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3400);
  }

  /* ---------- Tahun otomatis ---------- */
  const yr = new Date().getFullYear();
  $('#year').textContent = yr;
  $('#yearHero').textContent = yr;

  /* ---------- Navigasi ---------- */
  const nav = $('#nav');
  const burger = $('#burger');
  const navLinks = $('#navLinks');

  function setMenu(open) {
    navLinks.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
    document.body.classList.toggle('no-scroll', open);
  }
  burger.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
  $$('a', navLinks).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && navLinks.classList.contains('open')) setMenu(false); });
  window.addEventListener('resize', () => { if (window.innerWidth > 900) setMenu(false); });

  /* Smooth scroll dengan kompensasi tinggi navbar (juga jalan jika CSS smooth tidak aktif) */
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = $(id);
      if (!target) return;
      e.preventDefault();
      const top = id === '#home' ? 0 : target.getBoundingClientRect().top + window.scrollY - 56;
      window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
      history.replaceState(null, '', id);
    });
  });

  /* ---------- Scroll: navbar, progress bar, back-to-top ---------- */
  const progress = $('#progress');
  const toTop = $('#toTop');
  let ticking = false;
  function onScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    nav.classList.toggle('scrolled', y > 24);
    progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';
    toTop.classList.toggle('show', y > 650);
    ticking = false;
  }
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));

  /* ---------- Link aktif sesuai section ---------- */
  const linkMap = {};
  $$('a[href^="#"]', navLinks).forEach((a) => { linkMap[a.getAttribute('href').slice(1)] = a; });
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting && linkMap[en.target.id]) {
        Object.values(linkMap).forEach((l) => l.classList.remove('active'));
        linkMap[en.target.id].classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  Object.keys(linkMap).forEach((id) => { const s = document.getElementById(id); if (s) spy.observe(s); });

  /* ---------- Reveal saat scroll ---------- */
  let revealIO = null;
  function observeReveals(root = document) {
    const els = $$('.reveal:not(.in)', root);
    if (!('IntersectionObserver' in window) || reduce) { els.forEach((el) => el.classList.add('in')); return; }
    if (!revealIO) {
      revealIO = new IntersectionObserver((entries) => {
        entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); revealIO.unobserve(en.target); } });
      }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    }
    els.forEach((el) => revealIO.observe(el));
  }

  /* ---------- Spotlight kursor pada kartu ---------- */
  document.addEventListener('pointermove', (e) => {
    const card = e.target.closest && e.target.closest('.glow, .work');
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    card.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }, { passive: true });

  /* ---------- Parallax orb di hero ---------- */
  const hero = $('#home');
  if (!reduce && window.matchMedia('(pointer: fine)').matches) {
    hero.addEventListener('pointermove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5);
      const y = (e.clientY / window.innerHeight - 0.5);
      $$('.orb', hero).forEach((o) => {
        const d = Number(o.dataset.depth || 20);
        o.style.transform = 'translate(' + (x * d * 2).toFixed(1) + 'px,' + (y * d * 2).toFixed(1) + 'px)';
      });
    });
  }

  /* =========================================================
     PORTOFOLIO — folder Google Drive
     ========================================================= */
  (function initDrive() {
    const id = (S.portfolio && S.portfolio.folderId) || '';
    const section = $('#portfolio');
    if (!id) {
      if (section) section.remove();
      const l = $('a[href="#portfolio"]', navLinks); if (l) l.remove();
      $$('.sec-no').forEach((el, i) => { el.textContent = String(i + 1).padStart(2, '0'); });
      return;
    }
    $('#driveOpen').href = 'https://drive.google.com/drive/folders/' + encodeURIComponent(id) + '?usp=drive_link';
    const btn = $('#drivePreviewBtn');
    const box = $('#drivePreview');
    const frame = $('#driveFrame');
    btn.addEventListener('click', () => {
      const open = box.hidden;
      box.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
      $('span', btn).textContent = open ? 'Sembunyikan pratinjau' : 'Pratinjau di sini';
      if (open && !frame.firstChild) {
        const f = document.createElement('iframe');
        f.src = 'https://drive.google.com/embeddedfolderview?id=' + encodeURIComponent(id) + '#grid';
        f.title = 'Pratinjau folder portofolio Google Drive';
        f.loading = 'lazy';
        f.referrerPolicy = 'no-referrer';
        frame.appendChild(f);
      }
    });
  })();

  /* =========================================================
     EXPERIENCE (dari data.js; kosong = kotak placeholder)
     ========================================================= */
  const EXP_GROUPS = [
    { key: 'education', title: 'Pendidikan', hint: 'pendidikan' },
    { key: 'work', title: 'Pengalaman Kerja', hint: 'pengalaman kerja' },
    { key: 'organization', title: 'Organisasi', hint: 'pengalaman organisasi' },
    { key: 'committee', title: 'Kepanitiaan', hint: 'kepanitiaan' },
    { key: 'awards', title: 'Sertifikat & Penghargaan', hint: 'sertifikat atau penghargaan' }
  ];
  function renderExperience() {
    const data = S.experience || {};
    $('#exp').innerHTML = EXP_GROUPS.filter((g) => (data[g.key] || []).length).map((g, i) => {
      const items = data[g.key] || [];
      const body = items.length
        ? `<div class="exp__list">${items.map((it) => `<div class="exp__item">${it.period ? `<small>${esc(it.period)}</small>` : ''}<h4>${esc(it.title || '')}</h4>${it.org ? `<em>${esc(it.org)}</em>` : ''}${it.desc ? `<p>${esc(it.desc)}</p>` : ''}</div>`).join('')}</div>`
        : `<div class="exp__empty">Belum ada data ${g.hint}. Tambahkan di <code>js/data.js</code> pada bagian <code>experience.${g.key}</code> — hanya isi data yang benar-benar ada.</div>`;
      return `<article class="exp__group glass reveal" style="--d:${(i % 2) * 0.08}s"><h3>${g.title}<span>${String(items.length).padStart(2, '0')}</span></h3>${body}</article>`;
    }).join('');
    observeReveals($('#exp'));
  }

  /* =========================================================
     KONTAK
     ========================================================= */
  const ICONS = {
    email: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24"><path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.7-5.4A8.4 8.4 0 1 1 21 11.5z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="#fff"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24"><path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/></svg>',
    behance: 'Bē',
    linkedin: 'in'
  };
  const CONTACTS = [
    { key: 'email', label: 'Email', ph: 'nama@email.com', href: (v) => 'mailto:' + v },
    { key: 'whatsapp', label: 'WhatsApp', ph: '+62 8xx-xxxx-xxxx', href: (v) => 'https://wa.me/' + v.replace(/\D/g, '') },
    { key: 'instagram', label: 'Instagram', ph: '@username', href: (v) => v },
    { key: 'tiktok', label: 'TikTok', ph: '@username', href: (v) => v },
    { key: 'behance', label: 'Behance', ph: 'behance.net/username', href: (v) => v },
    { key: 'linkedin', label: 'LinkedIn', ph: 'linkedin.com/in/username', href: (v) => v }
  ];
  const cfg = S.contact || {};
  const pretty = (v) => v.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

  function renderContacts() {
    $('#contactLinks').innerHTML = CONTACTS.filter((c) => (cfg[c.key] || '').trim()).map((c) => {
      const v = (cfg[c.key] || '').trim();
      const empty = !v;
      return `<a class="clink glass glow${empty ? ' is-empty' : ''}" data-key="${c.key}" href="${empty ? '#contact' : esc(c.href(v))}"${!empty && c.key !== 'email' ? ' target="_blank" rel="noopener"' : ''}>
        <span class="clink__ico" aria-hidden="true">${ICONS[c.key].startsWith('<svg') ? ICONS[c.key] : ICONS[c.key]}</span>
        <span><b>${c.label}</b><small>${empty ? c.ph + ' (belum diisi)' : esc(c.key === 'whatsapp' ? '+' + v.replace(/\D/g, '') : pretty(v))}</small></span>
      </a>`;
    }).join('');
    $('#contactLinks').addEventListener('click', (e) => {
      const a = e.target.closest('.clink.is-empty');
      if (a) {
        e.preventDefault();
        toast('Tautan ' + CONTACTS.find((c) => c.key === a.dataset.key).label + ' belum diisi. Edit di js/data.js → contact.');
      }
    });
  }


  /* ---------- Init ---------- */
  renderExperience();
  renderContacts();
  observeReveals();
})();
