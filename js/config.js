/**
 * ============================================================================
 *  QUIZOTON · CONFIGURACIÓN CENTRAL DE LA LANDING
 * ============================================================================
 *  Este es el ÚNICO archivo que necesitas editar para cambiar:
 *    - Precios y planes
 *    - Enlace de descarga del instalador (.exe)
 *    - Número de WhatsApp
 *    - Condiciones de la prueba gratuita
 *
 *  Los valores se escriben automáticamente en la página principal,
 *  en la guía docente y en las páginas legales.
 *
 *  IMPORTANTE: el dominio para SEO (canonical, Open Graph, sitemap) no se
 *  puede leer desde JavaScript por los buscadores. Cuando tengas dominio,
 *  busca y reemplaza el texto  https://TU-DOMINIO.com  en todos los archivos
 *  .html, en robots.txt y en sitemap.xml.
 * ============================================================================
 */
window.QUIZOTON = {

  /* ── Descarga ──────────────────────────────────────────────────────────── */
  // Pega aquí el enlace donde quede alojado el instalador.
  // Mientras sea "#", el botón muestra un aviso de "enlace próximamente".
  descargaInstalador: '#',
  nombreInstalador: 'QuizOton-Instalador.exe',
  pesoInstalador: '62 MB',

  /* ── Contacto ──────────────────────────────────────────────────────────── */
  // Número en formato internacional, sin "+", espacios ni guiones.
  whatsapp: '573134528352',

  /* ── Prueba gratuita ───────────────────────────────────────────────────── */
  pruebaDias: 15,
  pruebaPartidas: 12,

  /* ── Moneda ────────────────────────────────────────────────────────────── */
  moneda: 'COP',

  /* ── Planes ────────────────────────────────────────────────────────────── */
  // Los precios van como números enteros, sin puntos ni signos.
  planes: {
    anual: {
      nombre: 'Docente anual',
      precio: 89000,
      periodo: 'por año',
      mensajeWhatsapp: 'Hola, quiero adquirir el plan Docente anual de QuizOton.'
    },
    vitalicio: {
      nombre: 'Docente vitalicio',
      precio: 249000,
      periodo: 'pago único',
      mensajeWhatsapp: 'Hola, quiero adquirir la licencia Docente vitalicia de QuizOton.'
    },
    institucional: {
      nombre: 'Institucional',
      mensajeWhatsapp: 'Hola, represento a una institución educativa y quiero cotizar QuizOton para varios docentes.',
      // Paquetes por año. "docentes" = número de licencias.
      paquetes: [
        { docentes: 5,  precio: 390000 },
        { docentes: 10, precio: 690000 },
        { docentes: 25, precio: 1490000 }
      ]
    }
  },

  /* ── Mensajes genéricos de WhatsApp ────────────────────────────────────── */
  mensajes: {
    general: 'Hola, quiero conocer más sobre QuizOton.',
    activacion: 'Hola, ya probé QuizOton y quiero activar mi licencia.',
    ayudaInstalacion: 'Hola, descargué QuizOton y necesito ayuda para instalarlo.'
  }
};
