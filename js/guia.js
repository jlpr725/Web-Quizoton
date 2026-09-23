/**
 * QuizOton · Guía docente
 * Descarga en PDF (con el diálogo de impresión del navegador) e índice activo.
 */
(function () {
  'use strict';

  function prepararImagenes() {
    document.querySelectorAll('img[loading="lazy"]').forEach(function (img) { img.loading = 'eager'; });
    var pendientes = Array.prototype.filter.call(document.images, function (img) { return !img.complete; });
    return Promise.all(pendientes.map(function (img) {
      return new Promise(function (ok) { img.addEventListener('load', ok, { once: true }); img.addEventListener('error', ok, { once: true }); });
    }));
  }

  function imprimir() {
    var titulo = document.title;
    document.title = 'Guia-docente-QuizOton'; // nombre sugerido del PDF
    prepararImagenes().then(function () {
      window.print();
      setTimeout(function () { document.title = titulo; }, 500);
    });
  }

  document.querySelectorAll('[data-imprimir]').forEach(function (b) {
    b.addEventListener('click', imprimir);
    b.setAttribute('title', 'En la ventana de impresión elige «Guardar como PDF»');
  });

  // Desde la landing: guia/?imprimir=1 abre directamente el diálogo
  if (/[?&]imprimir=1/.test(location.search)) {
    window.addEventListener('load', function () { setTimeout(imprimir, 400); });
  }

  // Índice activo según la sección visible
  var enlaces = Array.prototype.slice.call(document.querySelectorAll('.indice ol a'));
  if ('IntersectionObserver' in window && enlaces.length) {
    var mapa = {};
    enlaces.forEach(function (a) { mapa[a.getAttribute('href').slice(1)] = a; });
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        enlaces.forEach(function (a) { a.removeAttribute('aria-current'); });
        var a = mapa[e.target.id];
        if (a) a.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    document.querySelectorAll('.capitulo').forEach(function (c) { obs.observe(c); });
  }
})();
