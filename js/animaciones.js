/**
 * QuizOton · Animaciones de la landing
 * Sin dependencias. Todo se desactiva si la persona pidió "reducir movimiento".
 *   - Encabezado fijo que se oscurece al bajar.
 *   - Aparición suave de las secciones ([data-reveal]).
 *   - Brillo que sigue al cursor en las tarjetas (.spot).
 */
(function () {
  'use strict';

  var reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Encabezado fijo ──────────────────────────────────────────────────── */
  var barra = document.querySelector('.topbar');
  function alBajar() { if (barra) barra.classList.toggle('scrolled', window.scrollY > 8); }
  alBajar();
  window.addEventListener('scroll', alBajar, { passive: true });

  /* ── Aparición al desplazarse ─────────────────────────────────────────── */
  var items = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
  if (reducir || !('IntersectionObserver' in window)) {
    items.forEach(function (e) { e.classList.add('in'); });
  } else {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (x) {
        if (x.isIntersecting) { x.target.classList.add('in'); obs.unobserve(x.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    items.forEach(function (e) { obs.observe(e); });
  }

  if (reducir) return;

  /* ── Tarjetas con brillo que sigue al cursor ──────────────────────────── */
  document.querySelectorAll('.spot').forEach(function (c) {
    c.addEventListener('pointermove', function (e) {
      var r = c.getBoundingClientRect();
      c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      c.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });
})();
