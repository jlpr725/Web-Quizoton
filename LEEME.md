# Sitio web de QuizOtón

Landing informativa en construcción (HTML, CSS y JavaScript, sin dependencias). Publicada en Vercel: https://quizoton.online

**Qué es hoy:** una presentación básica de la app con la descarga del demo de 30 días, la guía docente y los canales de feedback (correo y WhatsApp). Cuando esté lista la versión final del sitio oficial, `index.html` se reemplazará.

**Datos oficiales (deben ser iguales en todo el sitio):** dominio `quizoton.online` · correo `info@quizoton.online` · WhatsApp `+57 313 452 8352` · nombre en textos `QuizOtón` (el logotipo y las capturas de la app conservan «QuizOton»; los archivos y direcciones van sin tilde).

## Páginas

| Archivo | Qué es |
| :--- | :--- |
| `index.html` | **Landing** corta y animada. Autocontenida (estilos en el propio archivo). Encabezado fijo (logo + WhatsApp), portada oscura con un solo botón principal («Quiero probar QuizOtón») y cinta de ventajas. Secciones en tarjetas con mascota: aviso de sitio en construcción, «¿Qué es QuizOtón?» (con las 4 tarjetas de modos: En vivo, Dominio, Duelo de saberes, Sin prisa), «Así funciona en tu salón» (3 pasos con iconos + video de YouTube), demo de 30 días, activación en 3 pasos (autoservicio, sin WhatsApp), guía docente, beta y versión final, feedback, preguntas frecuentes y pie. Se genera a mano; si se edita una pregunta frecuente hay que cambiarla también en el JSON-LD. |
| `guia/index.html` | Guía docente v1.1 con descarga en PDF. Página blanca (`body.pagina-blanca`). |
| `legal/privacidad.html` | Política de privacidad, aviso de tratamiento de datos y reportes de fallos. |
| `legal/terminos.html` | Términos de uso y licencia. |
| `.archivo/` | Borradores fuera del despliegue (`sitio-completo.html`). Se excluye con `.vercelignore` y `/sitio-completo` redirige a `/`. |

## Estructura

```
├── index.html
├── guia/index.html
├── legal/                 privacidad.html · terminos.html
├── beta/                  Instalar_QuizOton.exe   (lo genera y entrega el equipo de la app; solo se enlaza)
├── css/estilos.css        Estilos de legales
├── css/guia.css           Estilos de la guía y de su impresión a PDF
├── js/config.js           DATOS ÚNICOS: contacto, descarga, prueba, video (edita aquí)
├── js/app.js              Escribe los datos de config.js en la página y carga el video
├── js/inicio.js           Marca la página como «con JavaScript» (va en el head)
├── js/animaciones.js      Encabezado fijo, aparición al desplazar, brillo en tarjetas y mascota
├── js/guia.js             Descarga en PDF e índice de la guía
├── img/                   capturas/ · fotos/ · marca/ · mascota/ · og-quizoton.png
├── fuentes/               Tipografías locales (.woff2)
├── .archivo/              Borradores (no se publica)
├── .vercelignore · favicon.ico · robots.txt · sitemap.xml
└── vercel.json            Cabeceras de seguridad (CSP), caché y redirección
```

## Cambios rápidos

| Qué quieres cambiar | Dónde |
| :--- | :--- |
| Ruta, versión y peso del instalador | `js/config.js` → `descargaInstalador`, `versionBeta`, `pesoInstalador`, `hashInstalador` (los botones con `data-descarga` la leen de ahí). El `.exe` conserva el nombre `Instalar_QuizOton.exe`. |
| **Video de YouTube** | `js/config.js` → `videoYoutubeId`: pega solo el ID del video (11 caracteres, lo que va después de `v=`). Vacío = se muestra «Video próximamente». No hay que tocar el HTML. |
| Correo, WhatsApp y horario | `js/config.js` → `correo`, `whatsapp`, `horario`, `mensajes`. Además, el HTML trae los valores escritos por si el JavaScript no carga: si cambian, buscar y reemplazar en `index.html`, `guia/index.html` y `legal/`. |
| Días del demo | `js/config.js` → `pruebaDias` (`index.html`, la guía y los términos lo leen de ahí; la captura `img/capturas/activacion-licencia*.webp` lo tiene escrito). |
| Datos del titular y horarios legales | `legal/privacidad.html` y `legal/terminos.html`. |
<<<<<<< HEAD
<<<<<<< HEAD
| Colores de la landing | Bloque `<style>` de `index.html` (variables al inicio). Los 4 modos usan los mismos colores que la guía: En vivo menta, Dominio amarillo, Duelo lila, Sin prisa celeste. |
| Animaciones | CSS en el bloque `<style>` de `index.html` y `js/animaciones.js`. Todo se apaga si el sistema del visitante pide «reducir movimiento». |
| Mascota (Otto) | `img/mascota/` (copias optimizadas de `07_Media/mascota_colibri`; no editar aquí el original). Aparece **4 veces, cada una con un papel**: saludo (hero), guiño (se presenta: «¡Hola, soy Otto!»), soporte (sección «creciendo contigo») y mochila (pie, solo en pantallas anchas). Las tarjetas del demo y de la guía llevan un icono grande en lugar de mascota. La guía y los legales **no llevan mascota**. Tamaño común `.mcard>.m` = `clamp(88px,14vw,150px)`; solo la del hero es más grande. Las poses `idea`, `computador` y `lectura` quedan disponibles sin uso. |
| Logo | Un único archivo, `img/marca/logo.svg` (con «Aprende jugando»), en los encabezados y en el pie de las 4 páginas. Si se reemplaza, debe conservar `xmlns="http://www.w3.org/2000/svg"` en la etiqueta `<svg>` raíz, o no se ve como `<img>`. `logotipo-color.webp` **no se usa en la web, pero no se debe borrar ni mover**: lo usan `04_Recibos` y una prueba de `01_APP`. `logotipo-blanco.webp` quedó sin uso. |
| Pie de página | `css/pie.css` (clase `.pie-sitio`) y el mismo bloque `<footer class="pie-sitio">` en las 4 páginas. Si cambias un enlace del pie, cámbialo en las 4. El logo va sobre una tarjeta clara porque tiene placa negra (sobre el fondo oscuro se vería como una mancha). El resplandor verde solo aparece detrás de Otto, en la portada y en pantallas anchas. |
| Imagen al compartir (WhatsApp, redes) | `img/og-quizoton.png`, 1200×630 px, menos de 300 KB (límite de WhatsApp). Su texto repite el titular del hero: si cambia el titular, hay que rehacer la imagen. |
| Ancho del sitio | `main`, `.pie-in` y `.pie-copy` usan `max-width:1140px`. El hero (`.banda`) y la cinta (`.cinta`) van de borde a borde con `width:100vw;margin-left:calc(50% - 50vw)`, porque viven dentro de `<main>` (necesario para la región de accesibilidad). Además `main>.banda` y `main>.cinta` tienen margen superior negativo para anular el relleno y el espacio entre bloques de `<main>`: sin eso aparece una franja blanca arriba y otra entre el hero y la cinta. **Si se agrega otra franja de ancho completo dentro de `<main>`, necesita el mismo tratamiento.** |
=======
=======
>>>>>>> parent of 4affeb2 (update final)
| Colores de la landing | Bloque `<style>` de `index.html` (variables al inicio). |
| Animaciones | CSS en el bloque `<style>` de `index.html` (títulos que aparecen, aurora, cinta, botones) y `js/animaciones.js`. Todo se apaga si el sistema del visitante pide «reducir movimiento». |
| Mascota | `img/mascota/` (copias optimizadas y estáticas de `07_Media/mascota_colibri`; no editar aquí el original). Poses en uso: saludo (portada y pie), idea (aviso), computador (demo), mochila (beta), soporte (feedback) y guiño (pie). La guía docente **no lleva mascota**. Todas comparten el mismo tamaño (`.mcard>.m`, `clamp(88px,14vw,150px)`); **solo la del hero** tiene un tamaño propio, más grande. En el pie, la mascota se oculta en móvil (`max-width:860px`) y solo se ve en escritorio. |
| Logo | Un único archivo, `img/marca/logo.svg` (con el eslogan «Aprende jugando»), usado en el encabezado de `index.html`, la guía y las dos páginas legales. **No usar** `logotipo-color.webp` ni `logo v1.0.svg` — quedaron descartados. El pie oscuro usa aparte `logotipo-blanco.webp` (versión clara para fondo oscuro). Si `logo.svg` se reemplaza, debe conservar el atributo `xmlns="http://www.w3.org/2000/svg"` en la etiqueta `<svg>` raíz, o no se renderiza como `<img>`. |
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> parent of 631223d (update 22-09 1.3)
=======
>>>>>>> parent of 631223d (update 22-09 1.3)
=======
| Ancho del sitio | `main`, `.pie-in` y `.pie-copy` usan `max-width:1140px` (el «ancho general»). El hero (`.hero`, dentro de `.banda`) y la cinta de ventajas (`.cinta`) van de borde a borde con la técnica `width:100vw;margin-left:calc(50% - 50vw)`, porque ambos viven dentro de `<main>` (necesario para la región de accesibilidad) y si no, quedarían atrapados en los 1140px. **Si se agrega otra franja de ancho completo dentro de `<main>`, necesita el mismo truco** — no basta con quitarle `max-width`, porque el padre (`main`) igual la recorta. |
>>>>>>> parent of 4affeb2 (update final)

## Proceso de activación (lo que explica la web) — verificado contra `01_APP`

**Demo (lo que describe la landing y la guía):** es autoservicio, sin enviar nada.
1. El docente instala y abre QuizOtón; ve la pantalla de activación.
2. Hace clic en la insignia «QUIZOTON-DEMO» (`panel.html`/`panel.js`): el campo de clave se completa solo.
3. Hace clic en «Activar QuizOtón en este equipo». Listo: 30 días completos, sin esperar respuesta ni internet.

**Licencia paga (solo se explica en la guía y en la FAQ «¿Qué pasa cuando termina el demo?», no en el flujo principal):**
1. El docente copia el identificador de su equipo (empieza por `QZ-`).
2. Lo envía por WhatsApp o a `info@quizoton.online`, con su nombre y colegio.
3. Se le responde con una clave única para ese computador, que pega y activa. Tampoco requiere internet.

Si `01_APP` cambia este flujo, hay que actualizar `index.html` (sección «Activar»), `guia/index.html» y `legal/terminos.html` §3 / `legal/privacidad.html` §3 a la vez — los tres quedaron corregidos el 22-sep-2026 tras verificar que antes describían mal la activación del demo.

## SEO (región principal: Neiva, Huila, sin limitarse a ella)

- Título, descripción, Open Graph y `geo.region` con Neiva, Huila; el contenido menciona «docentes de Neiva, Huila y toda Colombia».
- Datos estructurados (JSON-LD) en `index.html`: `Organization` (con dirección Neiva, Huila, correo y área de servicio), `WebSite`, `SoftwareApplication` (demo gratuito de 30 días) y `FAQPage` (mismas preguntas que la sección visible). La guía lleva `TechArticle` y `BreadcrumbList`.
- Si se cambia una pregunta frecuente, cambiarla también en el JSON-LD (deben coincidir).
- Pendiente fuera del código: verificar `quizoton.online` en Google Search Console y enviar `sitemap.xml`; crear el perfil de negocio en Google (Neiva); pedir enlaces desde sitios locales educativos.

## Cuando cambie el dominio

Reemplaza `https://quizoton.online` en: los `.html`, `robots.txt` y `sitemap.xml`.

## Antes de publicar cambios

- La política `Content-Security-Policy` de `vercel.json` solo permite recursos del propio sitio y, para el video, `youtube-nocookie.com`. Si agregas otro servicio externo hay que autorizarlo ahí y actualizar la política de privacidad.
- No hay scripts en línea: todo el JavaScript va en `js/`. Los estilos en línea sí están permitidos.
- Al cambiar el contenido de una página, actualiza su fecha en `sitemap.xml` (`lastmod`) y la fecha de «Última actualización» de los legales.
- `vercel.json` debe quedar en la raíz de lo que se despliega (junto a `index.html`).
- `robots.txt` bloquea `/beta/` y `/.archivo/`; el enlace de descarga sigue funcionando para quien lo tiene.
- Descarga de la guía en PDF: el botón abre el diálogo de impresión; hay que elegir **Guardar como PDF** y activar **Gráficos de fondo**. El PDF sale siempre en claro.
- El instalador lo compila otro equipo. Al recibir uno nuevo: reemplazar `beta/Instalar_QuizOton.exe` (mismo nombre) y revisar `pesoInstalador`, `versionBeta` y **`hashInstalador`** (SHA-256) en `js/config.js`, y el valor escrito dentro de `index.html`.
