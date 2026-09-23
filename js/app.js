/**
 * QuizOtón · Sitio web
 * Lee la configuración de js/config.js y la escribe en la página.
 * Todo el HTML ya trae un valor real escrito, así que la página también
 * funciona si este archivo no carga (solo se pierden los mensajes prellenados).
 */
(function () {
  'use strict';

  var C = window.QUIZOTON || {};

  /* ── Enlaces de WhatsApp ──────────────────────────────────────────────── */
  // Uso en HTML: data-whatsapp="general" | "colegio" | "demo" | "ayudaInstalacion" | "feedback"
  document.querySelectorAll('[data-whatsapp]').forEach(function (a) {
    var texto = (C.mensajes && C.mensajes[a.getAttribute('data-whatsapp')]) || '';
    a.href = 'https://wa.me/' + (C.whatsapp || '573134528352') + (texto ? '?text=' + encodeURIComponent(texto) : '');
    a.target = '_blank';
    a.rel = 'noopener';
  });

  /* ── Enlaces de correo ────────────────────────────────────────────────── */
  // Uso en HTML: data-correo="general" | "feedback"
  document.querySelectorAll('[data-correo]').forEach(function (a) {
    var correo = C.correo || 'info@quizoton.online';
    var esFeedback = a.getAttribute('data-correo') === 'feedback';
    a.href = 'mailto:' + correo + (esFeedback
      ? '?subject=' + encodeURIComponent(C.asuntoFeedback || '') + '&body=' + encodeURIComponent(C.cuerpoFeedback || '')
      : '');
  });

  /* ── Enlaces de descarga del demo ─────────────────────────────────────── */
  document.querySelectorAll('[data-descarga]').forEach(function (a) {
    if (C.descargaInstalador && C.descargaInstalador !== '#') {
      a.href = C.descargaInstalador;
      if (C.nombreInstalador) a.setAttribute('download', C.nombreInstalador);
    }
  });

  /* ── Textos que vienen de la configuración ────────────────────────────── */
  // Uso en HTML: data-config="pruebaDias" | "versionBeta" | "pesoInstalador" | "nombreInstalador" | "correo"
  document.querySelectorAll('[data-config]').forEach(function (el) {
    var v = C[el.getAttribute('data-config')];
    if (v !== undefined) el.textContent = v;
  });

  /* ── Video de YouTube (se carga solo al hacer clic) ───────────────────── */
  // Hasta que el usuario pulsa el botón, no se contacta a YouTube.
  var caja = document.querySelector('[data-video]');
  if (caja) {
    var id = String(C.videoYoutubeId || '').trim();
    var vacio = caja.querySelector('[data-video-vacio]');
    var boton = caja.querySelector('[data-video-boton]');
    if (/^[A-Za-z0-9_-]{11}$/.test(id) && boton) {
      if (vacio) vacio.hidden = true;
      boton.hidden = false;
      boton.addEventListener('click', function () {
        var f = document.createElement('iframe');
        f.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
        f.title = 'Video de presentación de QuizOtón';
        f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        f.allowFullscreen = true;
        f.referrerPolicy = 'strict-origin-when-cross-origin';
        caja.innerHTML = '';
        caja.appendChild(f);
      });
    }
  }

  /* ── Año del pie ──────────────────────────────────────────────────────── */
  document.querySelectorAll('[data-anio]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
