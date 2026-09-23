/**
 * QuizOton · Sitio web
 * Lee la configuración de js/config.js y la escribe en la página.
 * Todo el HTML ya trae un valor real escrito, así que la página también
 * funciona si este archivo no carga (solo se pierden los mensajes prellenados).
 */
(function () {
  'use strict';

  var C = window.QUIZOTON || {};

  /* ── ¿El visitante está en un computador con Windows? ─────────────────── */
  // El instalador solo sirve en Windows 10/11. En celulares, tabletas o Mac no
  // se descarga directo: se lleva a la sección del demo, donde se explica.
  var ua = navigator.userAgent || '';
  var plataforma = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || '';
  var esWindows = /^Win/i.test(plataforma) || (/Windows NT/i.test(ua) && !/Windows Phone|Mobile/i.test(ua));

  /* ── Enlaces de WhatsApp ──────────────────────────────────────────────── */
  // Uso en HTML: data-whatsapp="general" | "colegio" | "licencia" | "ayudaInstalacion" | "feedback"
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

  /* ── Enlaces de descarga del demo (siempre descargan) ─────────────────── */
  document.querySelectorAll('[data-descarga]').forEach(function (a) {
    if (C.descargaInstalador && C.descargaInstalador !== '#') {
      a.href = C.descargaInstalador;
      if (C.nombreInstalador) a.setAttribute('download', C.nombreInstalador);
    }
  });

  /* ── Botones «Quiero probar» ──────────────────────────────────────────── */
  // En el HTML apuntan a #demo. En Windows se convierten en descarga directa.
  if (esWindows && C.descargaInstalador && C.descargaInstalador !== '#') {
    document.querySelectorAll('[data-probar]').forEach(function (a) {
      a.href = C.descargaInstalador;
      if (C.nombreInstalador) a.setAttribute('download', C.nombreInstalador);
    });
  }

  /* ── Avisos para quien no está en Windows ─────────────────────────────── */
  if (!esWindows) {
    document.querySelectorAll('[data-solo-no-windows]').forEach(function (el) { el.hidden = false; });
  }

  /* ── Textos que vienen de la configuración ────────────────────────────── */
  // Uso en HTML: data-config="pruebaDias" | "versionBeta" | "pesoInstalador" | "nombreInstalador" | "correo" | "hashInstalador"
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
        f.title = 'Video de presentación de QuizOton';
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
