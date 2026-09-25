/**
 * ============================================================================
 *  QUIZOTON · CONFIGURACIÓN CENTRAL DEL SITIO
 * ============================================================================
 *  Este es el ÚNICO archivo que necesitas editar para cambiar:
 *    - Enlace de descarga del demo (.exe) y su huella SHA-256
 *    - Número de WhatsApp y correo de contacto
 *    - Días de la prueba y versión
 *    - Video de YouTube de la página principal
 *
 *  Los valores se escriben automáticamente en la página principal, en la guía
 *  docente y en las páginas legales (elementos con data-config, data-whatsapp,
 *  data-correo, data-descarga y data-probar).
 *
 *  IMPORTANTE: el dominio para SEO (canonical, Open Graph, sitemap) no se
 *  puede leer desde JavaScript por los buscadores. Si algún día cambia el
 *  dominio, busca y reemplaza el texto  https://quizoton.online  en todos los
 *  archivos .html, en robots.txt y en sitemap.xml.
 *
 *  El nombre oficial es «QuizOton», sin tilde (la marca amarilla del logo es
 *  un adorno, no una tilde).
 * ============================================================================
 */
window.QUIZOTON = {

  /* ── Marca ─────────────────────────────────────────────────────────────── */
  nombre: 'QuizOton',
  dominio: 'quizoton.online',

  /* ── Descarga del demo ─────────────────────────────────────────────────── */
  // Enlace del instalador. Se descarga desde GitHub Releases (no desde Vercel) para no consumir
  // ancho de banda del sitio. Si sale una versión nueva, cambia la URL y la huella de abajo.
  descargaInstalador: 'https://github.com/jlpr725/Web-Quizoton/releases/download/v1.0.0/Instalar_QuizOton.exe',
  nombreInstalador: 'Instalar_QuizOton.exe',
  versionBeta: 'Beta 1.0',
  pesoInstalador: '40 MB',
  // Huella SHA-256 del instalador publicado. SE DEBE ACTUALIZAR cada vez que se
  // reemplace el .exe (y también el valor escrito en guia/index.html).
  hashInstalador: '5A923CF3169AFE1C0E3B505077ED8FE726557CE2FC1923B8435A5EEF50BB581A',

  /* ── Contacto ──────────────────────────────────────────────────────────── */
  // WhatsApp en formato internacional, sin "+", espacios ni guiones.
  whatsapp: '573134528352',
  correo: 'info@quizoton.online',
  horario: 'lunes a viernes, de 9:00 a. m. a 6:00 p. m. (hora de Colombia)',

  /* ── Prueba gratuita ───────────────────────────────────────────────────── */
  pruebaDias: 30,

  /* ── Video de YouTube ──────────────────────────────────────────────────── */
  // Pega aquí solo el ID del video (lo que va después de "youtu.be/" o de "v="
  // en la dirección de YouTube). Si queda vacío, no se muestra el recuadro del
  // video. Si cambias de video, cambia también el enlace del botón en index.html.
  videoYoutubeId: 'JdXDAb4uH9k',

  /* ── Mensajes de WhatsApp ──────────────────────────────────────────────── */
  mensajes: {
    general: 'Hola, quiero conocer más sobre QuizOton.',
    colegio: 'Hola, quiero conocer QuizOton para mi colegio.',
    licencia: 'Hola, quiero adquirir una licencia de QuizOton. Mi identificador de equipo es: QZ-',
    ayudaInstalacion: 'Hola, descargué QuizOton y necesito ayuda para instalarlo.',
    feedback: 'Hola, quiero contarles mi experiencia con QuizOton.\n\nQué pasó o qué opino:\n\nCuándo ocurrió:\n\nEquipo y versión de Windows:\n\nDispositivos que usaron los estudiantes:\n'
  },

  /* ── Correo con el asunto ya escrito (feedback) ────────────────────────── */
  asuntoFeedback: 'Feedback de QuizOton',
  cuerpoFeedback: 'Hola, quiero contarles mi experiencia con QuizOton.\n\nQué pasó o qué opino:\n\nCuándo ocurrió:\n\nEquipo y versión de Windows:\n\nDispositivos que usaron los estudiantes:\n\n(Puedo adjuntar una captura de pantalla. No incluyo nombres ni datos de estudiantes.)\n'
};
