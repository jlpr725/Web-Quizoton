/**
 * ============================================================================
 *  QUIZOTÓN · CONFIGURACIÓN CENTRAL DEL SITIO
 * ============================================================================
 *  Este es el ÚNICO archivo que necesitas editar para cambiar:
 *    - Enlace de descarga del demo (.exe)
 *    - Número de WhatsApp y correo de contacto
 *    - Días de la prueba y versión
 *    - Video de YouTube de la página principal
 *
 *  Los valores se escriben automáticamente en la página principal, en la guía
 *  docente y en las páginas legales (elementos con data-config, data-whatsapp,
 *  data-correo y data-descarga).
 *
 *  IMPORTANTE: el dominio para SEO (canonical, Open Graph, sitemap) no se
 *  puede leer desde JavaScript por los buscadores. Si algún día cambia el
 *  dominio, busca y reemplaza el texto  https://quizoton.online  en todos los
 *  archivos .html, en robots.txt y en sitemap.xml.
 * ============================================================================
 */
window.QUIZOTON = {

  /* ── Marca ─────────────────────────────────────────────────────────────── */
  nombre: 'QuizOtón',
  dominio: 'quizoton.online',

  /* ── Descarga del demo ─────────────────────────────────────────────────── */
  // Ruta del instalador. Puede ser relativa ('/beta/Instalar_QuizOton.exe') o una URL absoluta
  // de CDN (ej. GitHub Releases o Cloudflare R2) para no consumir ancho de banda de Vercel.
  descargaInstalador: '/beta/Instalar_QuizOton.exe',
  nombreInstalador: 'Instalar_QuizOton.exe',
  versionBeta: 'Beta 1.0',
  pesoInstalador: '71 MB',
  // Huella SHA-256 del instalador publicado (se actualiza cada vez que se reemplace el .exe).
  hashInstalador: 'C5428F7D7AF7EA66794605B4E08FAAE0D2670F39466BC3723A02AF7B38D1437C',

  /* ── Contacto ──────────────────────────────────────────────────────────── */
  // WhatsApp en formato internacional, sin "+", espacios ni guiones.
  whatsapp: '573134528352',
  correo: 'info@quizoton.online',
  horario: 'lunes a viernes, de 9:00 a. m. a 6:00 p. m. (hora de Colombia)',

  /* ── Prueba gratuita ───────────────────────────────────────────────────── */
  pruebaDias: 30,

  /* ── Video de YouTube ──────────────────────────────────────────────────── */
  // Pega aquí solo el ID del video (lo que va después de "v=" en la dirección
  // de YouTube, por ejemplo "dQw4w9WgXcQ"). Mientras esté vacío, la página
  // muestra el aviso "Video próximamente". No hace falta tocar el HTML.
  videoYoutubeId: '',

  /* ── Mensajes de WhatsApp ──────────────────────────────────────────────── */
  mensajes: {
    general: 'Hola, quiero conocer más sobre QuizOtón.',
    colegio: 'Hola, quiero conocer QuizOtón para mi colegio.',
    demo: 'Hola, descargué el demo de QuizOtón. Mi identificador de equipo es: QZ-',
    ayudaInstalacion: 'Hola, descargué QuizOtón y necesito ayuda para instalarlo.',
    feedback: 'Hola, quiero contarles mi experiencia con QuizOtón.\n\nQué pasó o qué opino:\n\nCuándo ocurrió:\n\nEquipo y versión de Windows:\n\nCelulares usados:\n'
  },

  /* ── Correo con el asunto ya escrito (feedback) ────────────────────────── */
  asuntoFeedback: 'Feedback de QuizOtón',
  cuerpoFeedback: 'Hola, quiero contarles mi experiencia con QuizOtón.\n\nQué pasó o qué opino:\n\nCuándo ocurrió:\n\nEquipo y versión de Windows:\n\nCelulares usados:\n\n(Puedo adjuntar una captura de pantalla. No incluyo nombres ni datos de estudiantes.)\n'
};
