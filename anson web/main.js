/* ============================================================
   script.js — 展彥發展中心
   1. 依網址自動高亮導覽列
   2. 平滑滾動（錨點）
   3. 內容淡入
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. 依網址高亮目前分頁 ---------- */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(function (link) {
    const href = link.getAttribute('href').split('#')[0];
    if (href && href === path) {
      link.classList.add('is-active');
    }
  });

  /* ---------- 2. 平滑滾動（只處理頁內錨點） ---------- */
  const header = document.querySelector('.site-header');
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const headerHeight = header ? header.offsetHeight : 0;
      const top = target.getBoundingClientRect().top
                + window.pageYOffset - headerHeight - 12;
      window.scrollTo({ top: top, behavior: 'smooth' });
      history.replaceState(null, '', targetId);
    });
  });

  /* ---------- 3. 內容淡入 ---------- */
  const revealTargets = document.querySelectorAll(
    '.hero .eyebrow, .hero h1, .hero .intro, ' +
    '.page-hero .eyebrow, .page-hero h1, .page-hero .page-intro, ' +
    '.section-title, .card, .btn-row, .tile, ' +
    '.gallery-item, .contact-list, .copy'
  );

  if ('IntersectionObserver' in window) {
    revealTargets.forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = (i % 4) * 0.08 + 's';
    });

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(function (el) { observer.observe(el); });
  }
});