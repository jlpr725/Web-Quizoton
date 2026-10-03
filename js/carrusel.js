/**
 * QuizOton · Carrusel del inicio
 *   1. Presentación (la única visible sin JavaScript; lleva el h1).
 *   2. Canal de WhatsApp (config.js → canalWhatsapp).
 *   3. Regalo de bancos (config.js → regalo). Solo aparece entre «inicio» e
 *      «inicio + horas» y mientras «quedan» sea mayor que 0; después se retira sola.
 * Avanza solo cada 8 s, se pausa al pasar el mouse, al enfocar con teclado y con
 * el botón de pausa. Si la persona pidió «reducir movimiento», empieza pausado.
 */
(function () {
  'use strict';

  var C = window.QUIZOTON || {};
  var raiz = document.querySelector('.carrusel');
  if (!raiz) return;

  var pista = raiz.querySelector('.diapos');
  var controles = raiz.querySelector('.carrusel-controles');
  var cajaPuntos = raiz.querySelector('[data-carrusel-puntos]');
  var botonPausa = raiz.querySelector('[data-carrusel-pausa]');
  var diapoRegalo = raiz.querySelector('[data-regalo]');
  var reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var INTERVALO = 8000;

  /* ── Canal de WhatsApp ────────────────────────────────────────────────── */
  var diapoCanal = raiz.querySelector('[data-canal]');
  if (diapoCanal) {
    if (C.canalWhatsapp) diapoCanal.href = C.canalWhatsapp;
    diapoCanal.closest('.diapo').hidden = false;
  }

  /* ── Regalo: ¿está vigente? ───────────────────────────────────────────── */
  var R = C.regalo || {};
  var inicio = Date.parse(R.inicio || '');
  var fin = inicio + (Number(R.horas) || 24) * 3600 * 1000;
  var total = Number(R.total) || 10;
  var quedan = Math.max(0, Math.min(total, Number(R.quedan) || 0));

  function regaloVigente() {
    var ahora = Date.now();
    return !isNaN(inicio) && ahora >= inicio && ahora < fin && quedan > 0;
  }

  function dos(n) { return (n < 10 ? '0' : '') + n; }

  function pintarRegalo() {
    var falta = Math.max(0, fin - Date.now());
    var h = Math.floor(falta / 3600000);
    var m = Math.floor((falta % 3600000) / 60000);
    var s = Math.floor((falta % 60000) / 1000);
    diapoRegalo.querySelector('[data-regalo-h]').textContent = dos(h);
    diapoRegalo.querySelector('[data-regalo-m]').textContent = dos(m);
    diapoRegalo.querySelector('[data-regalo-s]').textContent = dos(s);
  }

  if (diapoRegalo) {
    if (regaloVigente()) {
      diapoRegalo.querySelectorAll('[data-regalo-total]').forEach(function (e) { e.textContent = total; });
      diapoRegalo.querySelector('[data-regalo-quedan]').textContent = quedan;
      diapoRegalo.querySelector('[data-regalo-barra]').style.width = (quedan / total * 100) + '%';
      try {
        var cierre = new Intl.DateTimeFormat('es-CO', {
          timeZone: 'America/Bogota', day: 'numeric', month: 'long', hour: 'numeric', minute: '2-digit'
        }).format(new Date(fin));
        diapoRegalo.querySelector('[data-regalo-fin]').textContent = cierre.replace(',', ' a las') + ' (hora de Colombia)';
      } catch (e) { /* se queda el texto genérico */ }
      pintarRegalo();
      diapoRegalo.hidden = false;
    } else {
      diapoRegalo.remove();
      diapoRegalo = null;
    }
  }

  /* ── Carrusel ─────────────────────────────────────────────────────────── */
  var diapos = [];
  var actual = 0;
  var temporizador = null;
  var pausadoPorUsuario = reducir;
  var pausadoTemporal = false;

  function armar() {
    diapos = Array.prototype.slice.call(pista.querySelectorAll('.diapo:not([hidden])'));
    cajaPuntos.innerHTML = '';
    diapos.forEach(function (d, i) {
      d.setAttribute('aria-label', (i + 1) + ' de ' + diapos.length + ': ' + d.getAttribute('data-nombre'));
      var p = document.createElement('button');
      p.type = 'button';
      p.className = 'cc-punto';
      p.setAttribute('aria-label', 'Ir a la diapositiva ' + (i + 1) + ': ' + d.getAttribute('data-nombre'));
      p.addEventListener('click', function () { ir(i, true); });
      cajaPuntos.appendChild(p);
    });
  }

  function ir(i, porUsuario) {
    if (!diapos.length) return;
    actual = (i + diapos.length) % diapos.length;
    diapos.forEach(function (d, j) {
      d.classList.toggle('activa', j === actual);
      if (j === actual) d.removeAttribute('aria-hidden'); else d.setAttribute('aria-hidden', 'true');
    });
    cajaPuntos.querySelectorAll('.cc-punto').forEach(function (p, j) {
      p.setAttribute('aria-current', j === actual ? 'true' : 'false');
    });
    if (porUsuario) programar();
  }

  function programar() {
    clearTimeout(temporizador);
    var detenido = pausadoPorUsuario || pausadoTemporal || document.hidden;
    raiz.classList.toggle('carrusel--pausado', pausadoPorUsuario);
    pista.setAttribute('aria-live', detenido ? 'polite' : 'off');
    if (!detenido && diapos.length > 1) temporizador = setTimeout(function () { ir(actual + 1); programar(); }, INTERVALO);
  }

  armar();
  if (diapos.length < 2) return; // solo la presentación: no hace falta carrusel

  raiz.classList.add('carrusel--activo');
  controles.hidden = false;
  ir(0);

  raiz.querySelector('[data-carrusel-anterior]').addEventListener('click', function () { ir(actual - 1, true); });
  raiz.querySelector('[data-carrusel-siguiente]').addEventListener('click', function () { ir(actual + 1, true); });
  botonPausa.addEventListener('click', function () {
    pausadoPorUsuario = !pausadoPorUsuario;
    botonPausa.setAttribute('aria-label', pausadoPorUsuario ? 'Reanudar el carrusel' : 'Pausar el carrusel');
    programar();
  });
  botonPausa.setAttribute('aria-label', pausadoPorUsuario ? 'Reanudar el carrusel' : 'Pausar el carrusel');

  // Pausa mientras el mouse está encima o el foco del teclado está dentro.
  raiz.addEventListener('mouseenter', function () { pausadoTemporal = true; programar(); });
  raiz.addEventListener('mouseleave', function () { pausadoTemporal = raiz.contains(document.activeElement); programar(); });
  raiz.addEventListener('focusin', function () { pausadoTemporal = true; programar(); });
  raiz.addEventListener('focusout', function (e) { if (!raiz.contains(e.relatedTarget)) { pausadoTemporal = false; programar(); } });
  document.addEventListener('visibilitychange', programar);

  // Flechas del teclado sobre los controles.
  controles.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { ir(actual + 1, true); e.preventDefault(); }
    if (e.key === 'ArrowLeft') { ir(actual - 1, true); e.preventDefault(); }
  });

  // Deslizar con el dedo en celulares y tabletas.
  var x0 = null, y0 = null;
  pista.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  pista.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) ir(actual + (dx < 0 ? 1 : -1), true);
    x0 = null;
  }, { passive: true });

  programar();

  // Reloj del regalo: se actualiza cada segundo y retira la diapositiva al terminar.
  if (diapoRegalo) {
    var reloj = setInterval(function () {
      if (regaloVigente()) { pintarRegalo(); return; }
      clearInterval(reloj);
      var eraActual = diapos[actual] === diapoRegalo;
      diapoRegalo.remove();
      diapoRegalo = null;
      armar();
      if (diapos.length < 2) {
        raiz.classList.remove('carrusel--activo');
        controles.hidden = true;
        clearTimeout(temporizador);
        diapos.forEach(function (d) { d.classList.add('activa'); d.removeAttribute('aria-hidden'); d.removeAttribute('aria-label'); });
        return;
      }
      ir(eraActual ? 0 : Math.min(actual, diapos.length - 1));
      programar();
    }, 1000);
  }
})();
