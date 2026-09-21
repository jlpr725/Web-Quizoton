# Landing QuizOton v1.2

Sitio estático (HTML, CSS y JavaScript, sin dependencias). Se puede subir tal cual a Netlify, Vercel, GitHub Pages, Cloudflare Pages o cualquier hosting.

## Estructura

```
landing-v1.2/
├── index.html            Página principal
├── guia/index.html       Guía docente (en línea y descarga en PDF)
├── legal/                Privacidad y términos (BORRADORES)
├── css/estilos.css       Estilos generales
├── css/guia.css          Estilos de la guía y de la impresión a PDF
├── js/config.js          PRECIOS, ENLACES Y CONTACTO (edita aquí)
├── js/app.js             Comportamiento de la página
├── js/guia.js            Descarga en PDF e índice de la guía
├── img/capturas/         Capturas de la aplicación (WebP)
├── img/fotos/            Fotografías (WebP)
├── img/marca/            Logotipos, favicon e ícono
├── fuentes/              Tipografías locales
├── favicon.ico
├── robots.txt
└── sitemap.xml
```

## Cambios rápidos

| Qué quieres cambiar | Dónde |
| :--- | :--- |
| Precios, paquetes institucionales | `js/config.js` → `planes` |
| Enlace de descarga del .exe | `js/config.js` → `descargaInstalador` |
| Número de WhatsApp y mensajes | `js/config.js` → `whatsapp`, `mensajes` |
| Días de la prueba | `js/config.js` → `pruebaDias` |
| Precio en los datos para Google | `index.html`, bloque `application/ld+json` (`"price"`) |

## Cuando tengas dominio

Busca y reemplaza `https://web-quizoton.vercel.app` en: `index.html`, `guia/index.html`, `legal/privacidad.html`, `legal/terminos.html`, `robots.txt` y `sitemap.xml`.

## Imágenes y video pendientes

Cada espacio pendiente se ve en la página como un recuadro rayado con el tamaño y la descripción. En el código, justo encima de cada recuadro, hay un comentario con el HTML exacto que lo reemplaza.

| Recurso | Archivo sugerido | Tamaño |
| :--- | :--- | :--- |
| Video de demostración | `video/quizoton-demo.mp4` + portada `img/fotos/video-portada.webp` | 1920 × 1080 / 1600 × 900 |
| Modo Dominio (celular) | `img/capturas/modo-dominio.webp` | 620 × 1342 |
| Duelo de saberes (proyección) | `img/capturas/modo-duelo.webp` | 1600 × 900 |
| Modo Sin prisa (celular) | `img/capturas/modo-sin-prisa.webp` | 620 × 1342 |
| Informe de cierre | `img/capturas/informe-cierre.webp` | 1440 × 900 |
| Foto de clase con celulares | `img/fotos/clase-celulares.webp` y `-800.webp` | 1600 × 900 y 800 × 450 |
| Imagen para compartir | `img/og-quizoton.jpg` (no se ve en la página) | 1200 × 630 |

Recomendaciones: exporta en WebP con calidad 75–80, respeta las proporciones y usa nombres sin espacios ni tildes. Si un video pesa más de 25 MB, súbelo a YouTube y usa un `<iframe>`.

## Antes de publicar

- Completa los datos entre corchetes en `legal/` y hazlos revisar por un abogado. Borra el recuadro amarillo de borrador.
- Revisa la captura `estudiante-pregunta.webp`: se tomó de un mockup porque la captura real de la pregunta en el celular era un duplicado de la de ingreso.
- Si abres `index.html` con doble clic desde el explorador, las fuentes pueden verse distintas: el navegador bloquea fuentes locales en ese modo. En un hosting o con un servidor local se ven bien.

## Descarga de la guía en PDF

El botón **Descargar PDF** abre el diálogo de impresión del navegador con un diseño preparado para hoja carta. Hay que elegir **Guardar como PDF** y activar **Gráficos de fondo** para conservar los colores.
