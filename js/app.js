/**
 * QuizOton · Landing v1.2
 * Lee la configuración de js/config.js y controla la interfaz.
 */
(function () {
  'use strict';

  var C = window.QUIZOTON || {};
  var fmt = new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 });
  var dinero = function (n) { return '$' + fmt.format(n); };

  /* ── Enlaces de WhatsApp ──────────────────────────────────────────────── */
  // Uso en HTML: data-whatsapp="general" | "activacion" | "ayudaInstalacion"
  //              data-whatsapp="plan:anual" | "plan:vitalicio" | "plan:institucional"
  function mensajeDe(clave) {
    if (!clave) return '';
    if (clave.indexOf('plan:') === 0) {
      var p = C.planes && C.planes[clave.slice(5)];
      return p ? p.mensajeWhatsapp : '';
    }
    return (C.mensajes && C.mensajes[clave]) || '';
  }
  document.querySelectorAll('[data-whatsapp]').forEach(function (a) {
    var texto = mensajeDe(a.getAttribute('data-whatsapp'));
    a.href = 'https://wa.me/' + (C.whatsapp || '') + (texto ? '?text=' + encodeURIComponent(texto) : '');
    a.target = '_blank';
    a.rel = 'noopener';
  });

  /* ── Textos que vienen de la configuración ────────────────────────────── */
  // Uso en HTML: data-config="pruebaDias" | "pesoInstalador" | "nombreInstalador"
  document.querySelectorAll('[data-config]').forEach(function (el) {
    var v = C[el.getAttribute('data-config')];
    if (v !== undefined) el.textContent = v;
  });

  /* ── Precios ──────────────────────────────────────────────────────────── */
  if (C.planes) {
    ['anual', 'vitalicio'].forEach(function (id) {
      var plan = C.planes[id];
      if (!plan) return;
      document.querySelectorAll('[data-precio="' + id + '"]').forEach(function (el) { el.textContent = dinero(plan.precio); });
      document.querySelectorAll('[data-periodo="' + id + '"]').forEach(function (el) { el.textContent = C.moneda + ' ' + plan.periodo; });
      document.querySelectorAll('[data-nombre-plan="' + id + '"]').forEach(function (el) { el.textContent = plan.nombre; });
    });

    var anual = C.planes.anual;
    document.querySelectorAll('[data-equivale="anual"]').forEach(function (el) {
      el.textContent = 'Unos ' + dinero(Math.round(anual.precio / 12 / 100) * 100) + ' al mes';
    });

    var vit = C.planes.vitalicio;
    document.querySelectorAll('[data-equivale="vitalicio"]').forEach(function (el) {
      el.textContent = 'Equivale a ' + (vit.precio / anual.precio).toLocaleString('es-CO', { maximumFractionDigits: 1 }) + ' años del plan anual';
    });

    var inst = C.planes.institucional;
    if (inst && inst.paquetes && inst.paquetes.length) {
      var menor = inst.paquetes.reduce(function (a, b) { return a.precio < b.precio ? a : b; });
      document.querySelectorAll('[data-precio="institucional"]').forEach(function (el) { el.textContent = dinero(menor.precio); });
      document.querySelectorAll('[data-nombre-plan="institucional"]').forEach(function (el) { el.textContent = inst.nombre; });
      document.querySelectorAll('[data-paquetes]').forEach(function (ul) {
        ul.innerHTML = '';
        inst.paquetes.forEach(function (p) {
          var li = document.createElement('li');
          li.innerHTML = '<span>' + p.docentes + ' docentes<small>' + dinero(Math.round(p.precio / p.docentes)) + ' por docente</small></span><b>' + dinero(p.precio) + '</b>';
          ul.appendChild(li);
        });
      });
    }
  }

  /* ── Menú móvil ───────────────────────────────────────────────────────── */
  var menuBtn = document.querySelector('.menu-boton');
  var nav = document.getElementById('nav-principal');
  if (menuBtn && nav) {
    var cerrarMenu = function () {
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.setAttribute('aria-label', 'Abrir menú');
      nav.classList.remove('abierto');
    };
    menuBtn.addEventListener('click', function () {
      var abierto = menuBtn.getAttribute('aria-expanded') === 'true';
      if (abierto) { cerrarMenu(); return; }
      menuBtn.setAttribute('aria-expanded', 'true');
      menuBtn.setAttribute('aria-label', 'Cerrar menú');
      nav.classList.add('abierto');
    });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) cerrarMenu(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') cerrarMenu(); });
    window.matchMedia('(min-width: 1061px)').addEventListener('change', function (m) { if (m.matches) cerrarMenu(); });
  }

  /* ── Pestañas accesibles ──────────────────────────────────────────────── */
  document.querySelectorAll('[role="tablist"]').forEach(function (lista) {
    var tabs = Array.prototype.slice.call(lista.querySelectorAll('[role="tab"]'));
    function activar(tab, enfocar) {
      tabs.forEach(function (t) {
        var sel = t === tab;
        t.setAttribute('aria-selected', sel ? 'true' : 'false');
        t.tabIndex = sel ? 0 : -1;
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.hidden = !sel;
      });
      if (enfocar) tab.focus();
    }
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { activar(tab, false); });
      tab.addEventListener('keydown', function (e) {
        var n = null;
        if (e.key === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
        if (e.key === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
        if (e.key === 'Home') n = tabs[0];
        if (e.key === 'End') n = tabs[tabs.length - 1];
        if (n) { e.preventDefault(); activar(n, true); }
      });
    });
  });

  /* ── Ventana de descarga ──────────────────────────────────────────────── */
  var dialogo = document.getElementById('dialogo-descarga');
  var enlaceDescarga = document.getElementById('enlace-descarga');
  var avisoEnlace = document.getElementById('aviso-enlace');
  var disponible = C.descargaInstalador && C.descargaInstalador !== '#';

  if (enlaceDescarga) {
    if (disponible) {
      enlaceDescarga.href = C.descargaInstalador;
    } else {
      enlaceDescarga.href = '#';
      enlaceDescarga.addEventListener('click', function (e) {
        e.preventDefault();
        if (avisoEnlace) avisoEnlace.classList.add('visible');
      });
    }
  }

  document.querySelectorAll('[data-abrir-descarga]').forEach(function (b) {
    b.addEventListener('click', function (e) {
      if (!dialogo || typeof dialogo.showModal !== 'function') return; // sin soporte: sigue el enlace #descargar
      e.preventDefault();
      if (avisoEnlace) avisoEnlace.classList.remove('visible');
      dialogo.showModal();
    });
  });
  if (dialogo) {
    dialogo.querySelectorAll('[data-cerrar]').forEach(function (b) {
      b.addEventListener('click', function () { dialogo.close(); });
    });
    dialogo.addEventListener('click', function (e) { if (e.target === dialogo) dialogo.close(); });
  }

  /* ── Momento del hero: el código del curso "se sortea" una vez ────────── */
  var pantalla = document.querySelector('.pantalla');
  var codigo = document.querySelector('[data-codigo]');
  var reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (pantalla && codigo && !reducir) {
    var final = codigo.textContent.trim();
    var abc = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    codigo.setAttribute('aria-label', final);
    var pasos = 0;
    var t = setInterval(function () {
      pasos++;
      codigo.textContent = final.split('').map(function (ch, i) {
        return pasos > 6 + i * 3 ? ch : abc[Math.floor(Math.random() * abc.length)];
      }).join('');
      if (pasos > 6 + final.length * 3) { clearInterval(t); codigo.textContent = final; }
    }, 70);
  }

  /* ── Año del pie ──────────────────────────────────────────────────────── */
  document.querySelectorAll('[data-anio]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
