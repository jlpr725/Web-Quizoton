# Sitio web de QuizOton

Landing informativa en construcción (HTML, CSS y JavaScript, sin dependencias). Publicada en Vercel: https://quizoton.online

**Qué es hoy:** una presentación básica de la app con la descarga del demo de 30 días, la guía docente y los canales de feedback (correo y WhatsApp). Cuando esté lista la versión final del sitio oficial, `index.html` se reemplazará.

**Datos oficiales (deben ser iguales en todo el sitio):** dominio `quizoton.online` · correo `info@quizoton.online` · WhatsApp `+57 313 452 8352` · nombre **`QuizOton`, sin tilde** (decisión del 22-sep-2026: la marca amarilla del logo es un adorno, no una tilde). En los datos para buscadores (JSON-LD), «QuizOton» queda solo como nombre alternativo, para quien lo busque con tilde. Los archivos y direcciones van sin tilde. Al estudiante siempre se le dice **«dispositivo»** (celular, tablet o computador), no «celular».

## Páginas

| Archivo | Qué es |
| :--- | :--- |
| `index.html` | **Landing** corta y animada, con estilos en el propio archivo (salvo el pie, en `css/pie.css`). Recorrido: encabezado fijo (logo + WhatsApp) → hero («Haz que tu clase participe, incluso sin internet» + «Quiero probar QuizOton») → cinta de ventajas → **Otto se presenta** y avisa que el sitio está en construcción → «La clase no debería depender del Wi-Fi del colegio» (qué es, origen en Neiva y los 4 modos en colores) → «Así funciona en tu salón» (3 pasos + video) → demo de 30 días → activación en 3 pasos → guía docente → «QuizOton está creciendo contigo» (lo de hoy, lo que viene y el feedback, en una sola sección) → preguntas frecuentes → llamado final → pie. Si se edita una pregunta frecuente hay que cambiarla también en el JSON-LD. |
| `guia/index.html` | Guía docente v1.1. Página blanca (`body.pagina-blanca`). Incluye la huella SHA-256 del instalador (recuadro «Para el encargado de sistemas»). |
| `descargas/guia-docente-quizoton.pdf` | La guía en PDF, para descargar. **Es una copia**: se regenera cuando cambia la guía (ver «Antes de publicar»). |
| `legal/privacidad.html` | Política de privacidad, aviso de tratamiento de datos y reportes de fallos. |
| `legal/terminos.html` | Términos de uso y licencia. |
| `.archivo/` | Fuera del despliegue (`.vercelignore`): el borrador `sitio-completo.html` y `marca-duplicados/` (copias de logos retiradas el 22-sep-2026). `/sitio-completo` redirige a `/`. |

## Estructura

```
├── index.html
├── guia/index.html
├── legal/                 privacidad.html · terminos.html
├── descargas/             guia-docente-quizoton.pdf
├── beta/                  Ya no se usa ni se despliega (.vercelignore): el instalador se descarga desde GitHub Releases
├── css/estilos.css        Estilos de legales (y base de la guía)
├── css/guia.css           Estilos de la guía y de su impresión a PDF
├── css/pie.css            Pie de página común a las 4 páginas (clase .pie-sitio)
├── js/config.js           DATOS ÚNICOS: contacto, descarga, huella, prueba, video, mensajes (edita aquí)
├── js/app.js              Escribe los datos de config.js en la página, decide el botón «Quiero probar» y carga el video
├── js/inicio.js           Marca la página como «con JavaScript» (va en el head)
├── js/animaciones.js      Encabezado fijo, aparición al desplazar y brillo en tarjetas
├── js/guia.js             Índice activo de la guía
├── img/                   capturas/ · fotos/ · marca/ · mascota/ · og-quizoton.png
├── fuentes/               Tipografías locales (.woff2)
├── .archivo/              No se publica
├── .vercelignore · favicon.ico · robots.txt · sitemap.xml
└── vercel.json            Cabeceras de seguridad (CSP), caché y redirección
```

## Cambios rápidos

| Qué quieres cambiar | Dónde |
| :--- | :--- |
| Instalador: enlace, versión, peso y **huella** | `js/config.js` → `descargaInstalador` (URL de GitHub Releases), `versionBeta`, `pesoInstalador`, `hashInstalador`. El enlace también está escrito en `index.html` (botón `data-descarga` y `downloadUrl` del JSON-LD). La huella también está escrita dentro de `guia/index.html` (por si el JavaScript no carga) y dentro del PDF: al cambiar el `.exe` hay que actualizar los tres. |
| Botón «Quiero probar QuizOton» | Atributo `data-probar` (hero y llamado final). En el HTML apunta a `#demo`; `js/app.js` lo convierte en descarga directa **solo en computadores con Windows**. En celulares, tabletas o Mac lleva a la sección del demo, donde aparece el aviso `data-solo-no-windows`. Los botones con `data-descarga` descargan siempre. |
| **Video de YouTube** | `js/config.js` → `videoYoutubeId`: pega solo el ID del video (11 caracteres, lo que va después de `v=`). Vacío = se muestra «Video próximamente». No hay que tocar el HTML. |
| Correo, WhatsApp y horario | `js/config.js` → `correo`, `whatsapp`, `horario`. El HTML trae los valores escritos por si el JavaScript no carga: si cambian, buscar y reemplazar en `index.html`, `guia/index.html` y `legal/`. |
| Mensajes prellenados de WhatsApp y correo | `js/config.js` → `mensajes` (`general`, `colegio`, `licencia`, `ayudaInstalacion`, `feedback`), `asuntoFeedback` y `cuerpoFeedback`. Cada enlace elige su mensaje con `data-whatsapp="…"`. |
| Días del demo | `js/config.js` → `pruebaDias` (la portada, la guía y los términos lo leen de ahí). |
| Datos del titular y horarios legales | `legal/privacidad.html` y `legal/terminos.html`. |
| Colores de la landing | Bloque `<style>` de `index.html` (variables al inicio). Los 4 modos usan los mismos colores que la guía: En vivo menta, Dominio amarillo, Duelo lila, Sin prisa celeste. |
| Animaciones | CSS en el bloque `<style>` de `index.html` y `js/animaciones.js`. Todo se apaga si el sistema del visitante pide «reducir movimiento». |
| Mascota (Otto) | `img/mascota/` (copias optimizadas de `07_Media/mascota_colibri`; no editar aquí el original). Aparece **4 veces, cada una con un papel**: saludo (hero), guiño (se presenta: «¡Hola, soy Otto!»), soporte (sección «creciendo contigo») y mochila (pie, solo en pantallas anchas). Las tarjetas del demo y de la guía llevan un icono grande en lugar de mascota. La guía y los legales **no llevan mascota**. Tamaño común `.mcard>.m` = `clamp(88px,14vw,150px)`; solo la del hero es más grande. Las poses `idea`, `computador` y `lectura` quedan disponibles sin uso. |
| Logo | Un único archivo, `img/marca/logo.svg` (con «Aprende jugando»), en los encabezados y en el pie de las 4 páginas. Si se reemplaza, debe conservar `xmlns="http://www.w3.org/2000/svg"` en la etiqueta `<svg>` raíz, o no se ve como `<img>`. `logotipo-color.webp` **no se usa en la web, pero no se debe borrar ni mover**: lo usan `04_Recibos` y una prueba de `01_APP`. `logotipo-blanco.webp` quedó sin uso. |
| Pie de página | `css/pie.css` (clase `.pie-sitio`) y el mismo bloque `<footer class="pie-sitio">` en las 4 páginas. Si cambias un enlace del pie, cámbialo en las 4. El logo va sobre una tarjeta clara porque tiene placa negra (sobre el fondo oscuro se vería como una mancha). El resplandor verde solo aparece detrás de Otto, en la portada y en pantallas anchas. |
| Imagen al compartir (WhatsApp, redes) | `img/og-quizoton.png`, 1200×630 px, menos de 300 KB (límite de WhatsApp). Su texto repite el titular del hero: si cambia el titular, hay que rehacer la imagen. |
| Ancho del sitio | `main`, `.pie-in` y `.pie-copy` usan `max-width:1140px`. El hero (`.banda`) y la cinta (`.cinta`) van de borde a borde con `width:100vw;margin-left:calc(50% - 50vw)`, porque viven dentro de `<main>` (necesario para la región de accesibilidad). Además `main>.banda` y `main>.cinta` tienen margen superior negativo para anular el relleno y el espacio entre bloques de `<main>`: sin eso aparece una franja blanca arriba y otra entre el hero y la cinta. **Si se agrega otra franja de ancho completo dentro de `<main>`, necesita el mismo tratamiento.** |

## Proceso de activación (lo que explica la web) — verificado contra `01_APP`

**Demo (lo que describe la landing y la guía):** es autoservicio, sin enviar nada.
1. El docente instala y abre QuizOton; ve la pantalla de activación.
2. Hace clic en la insignia «QUIZOTON-DEMO» (`panel.html`/`panel.js`): el campo de clave se completa solo.
3. Hace clic en «Activar QuizOton en este equipo». Listo: 30 días completos, sin esperar respuesta ni internet.

**Licencia paga** (se explica en la guía, sección `#licencia`, y en la pregunta frecuente «¿Qué pasa cuando termina el demo?», que dice explícitamente que la licencia se compra):
1. El docente escribe por WhatsApp o correo; se le informan precios y opciones.
2. Envía el identificador de su equipo (empieza por `QZ-`).
3. Se le responde con una clave única para ese computador, que pega y activa. Tampoco requiere internet.

Si `01_APP` cambia este flujo, hay que actualizar a la vez `index.html` (sección «Activar» y FAQ), `guia/index.html` (y regenerar el PDF), `legal/terminos.html` §3 y `legal/privacidad.html` §3.

## Dependencias de otros equipos con esta carpeta

Pruebas automáticas de `01_APP` leen archivos de `10_WEB`. No romper:
- `js/config.js` debe contener literalmente `correo: 'info@quizoton.online'` y `dominio: 'quizoton.online'`.
- `img/marca/logotipo-color.webp` debe existir (también lo usa `04_Recibos`).
- `sitio-completo.html` debe seguir en `.archivo/` y no en la raíz.

## SEO (región principal: Neiva, Huila, sin limitarse a ella)

- Título, descripción, Open Graph y `geo.region` con Neiva, Huila; el contenido menciona Neiva y «toda Colombia».
- Datos estructurados (JSON-LD) en `index.html`: `Organization`, `WebSite`, `SoftwareApplication` (demo gratuito de 30 días) y `FAQPage` (mismas preguntas que la sección visible). La guía lleva `TechArticle` y `BreadcrumbList`. El PDF de la guía también es indexable.
- Pendiente fuera del código: verificar `quizoton.online` en Google Search Console y enviar `sitemap.xml`; crear el perfil de negocio en Google (Neiva); pedir enlaces desde sitios locales educativos.

## Cuando cambie el dominio

Reemplaza `https://quizoton.online` en: los `.html`, `robots.txt` y `sitemap.xml`, y rehaz `img/og-quizoton.png` (tiene el dominio escrito).

## Antes de publicar cambios

- La política `Content-Security-Policy` de `vercel.json` solo permite recursos del propio sitio y, para el video, `youtube-nocookie.com`. Si agregas otro servicio externo hay que autorizarlo ahí y actualizar la política de privacidad.
- No hay scripts en línea: todo el JavaScript va en `js/`. Los estilos en línea sí están permitidos.
- Al cambiar el contenido de una página, actualiza su fecha en `sitemap.xml` (`lastmod`), la fecha de «Última actualización» de los legales y `dateModified` en el JSON-LD de la guía.
- `vercel.json` debe quedar en la raíz de lo que se despliega (junto a `index.html`).
- `robots.txt` bloquea `/beta/` y `/.archivo/`. El instalador ya no está en el sitio: se descarga desde GitHub Releases.
- **Si cambia la guía, regenera el PDF:** abre `/guia/` en Chrome o Edge → Imprimir → «Guardar como PDF», tamaño Carta, **activa «Gráficos de fondo»** y guárdalo como `descargas/guia-docente-quizoton.pdf` (mismo nombre). La hoja de impresión de `css/guia.css` ya oculta menús, botones y pie.
- **Instalador actual (23-sep-2026):** Inno Setup, 40 MB, se instala por usuario en `%LOCALAPPDATA%\QuizOton` sin permisos de administrador, crea accesos en escritorio y menú Inicio y conserva la carpeta `datos` al reinstalar. Si el equipo de empaquetado cambia ese comportamiento, revisa «Instala QuizOton» en la guía.
- **Descarga del instalador:** el `.exe` se publica como archivo de una *release* de GitHub (repositorio `jlpr725/Web-Quizoton`), no dentro de Vercel, para no consumir el ancho de banda del sitio. Enlace actual (v1.0.0): `https://github.com/jlpr725/Web-Quizoton/releases/download/v1.0.0/Instalar_QuizOton.exe`.
- **Si llega un instalador nuevo** (lo compila otro equipo): créale una release nueva en GitHub (por ejemplo `v1.0.1`) y sube `Instalar_QuizOton.exe` con ese mismo nombre. Calcula su huella en PowerShell con `Get-FileHash .Instalar_QuizOton.exe`. Luego actualiza el enlace en `js/config.js` (`descargaInstalador`) y en `index.html` (botón `data-descarga` y `downloadUrl`), y la huella en `js/config.js` (`hashInstalador`), en `guia/index.html` y regenerando el PDF. Revisa también `pesoInstalador` y `versionBeta`. Una huella desactualizada hace que el archivo parezca alterado.
