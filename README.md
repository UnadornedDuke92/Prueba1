# Dental Creación — landing page

Sitio estático en HTML + Tailwind CSS v4. Sin framework, sin backend.

## Estructura

```
index.html          Marcado (Tailwind por utilidades + clases de componente)
src/input.css       Fuente de estilos: tokens @theme + capa de componentes
css/styles.css      SALIDA COMPILADA — no editar a mano
js/main.js          Menú móvil, revelados, firma de scroll, botón flotante
package.json        Scripts de build
```

## Build

Los estilos se compilan; `css/styles.css` se regenera y **no debe editarse**.
Todo cambio de estilo va en `src/input.css`.

Instalar dependencias una sola vez:

```bash
npm install
```

Compilar para producción (minificado):

```bash
npm run build
```

Recompilar en cada cambio mientras se trabaja:

```bash
npm run dev
```

## Ver el sitio en local

Los archivos CSS y JS son rutas relativas, así que hay que servirlo por HTTP
(abrir el `index.html` con doble clic deja los estilos sin cargar):

```bash
python -m http.server 8123
```

Después abrir <http://localhost:8123>.

## Publicar

Subir al hosting únicamente: `index.html`, `css/`, `js/`.
No hace falta subir `src/`, `node_modules/` ni `package.json`.

---

## Pendientes del cliente

Cada punto está marcado con un comentario `PENDIENTE` en el archivo correspondiente.

| Pendiente | Dónde |
|---|---|
| Logo real (SVG) y ajuste de la paleta a sus tonos | `index.html` (header) · `src/input.css` (`@theme`) |
| Nombre, cédula profesional y especialidad del dentista | `index.html`, sección `#nosotros` |
| Fotos reales del consultorio (toma de lejos, sin rostros) | `index.html`, sección `#nosotros` |
| Reseñas reales de Google/Facebook | `index.html`, sección `#opiniones` |
| Textos del blog | `index.html`, sección `#blog` |
| Código postal y colonia exactos | `index.html`, bloque JSON-LD |
| Imagen `og:image` (1200×630) | `index.html`, `<head>` |
| Verificar que el pin del mapa caiga en la entrada | `index.html`, sección `#contacto` |

### Promoción temporal

La sección de promoción existe pero está **comentada** en `index.html`
(buscar `PROMOCIÓN TEMPORAL`). Para activarla, quitar las marcas de comentario,
actualizar texto y vigencia, y volver a comentarla cuando termine.

### ⚠ Antes y después — no publicar todavía

El brief pregunta si pueden usarse fotos de boca y modelos de yeso sin
autorización escrita, recortando el rostro. **No.** En México los datos de salud
son datos personales sensibles bajo la LFPDPPP y requieren consentimiento
expreso y por escrito del titular; recortar el rostro no sustituye ese
consentimiento. La sección `#casos` ya está construida y queda lista para
activarse en cuanto exista el consentimiento firmado de cada paciente.
