# 💕 Nuestra Playlist Especial

Página web personal con una playlist de Spotify, un contador del tiempo juntos, tarjetas de canciones y una carta de amor interactiva.

## ✨ Qué incluye

- Disco de vinilo giratorio con foto (se pausa al tocarlo)
- Reproductor de Spotify integrado
- Contador del tiempo juntos que se actualiza cada segundo
- Tarjetas de canciones con botón de "me gusta"
- Carta de amor que se abre con un botón
- Corazones animados de fondo y al hacer clic
- Diseño adaptable a celular y computadora

## 📁 Estructura

```
index.html            → estructura de la página
style.css             → estilos personalizados
script.js             → canciones, contador, carta y animaciones
tailwind-config.js    → colores y animaciones de Tailwind
foto.png              → la foto del vinilo
```

Todos los archivos van en la misma carpeta.

## 🚀 Cómo verla

1. Abre la carpeta del proyecto en VS Code.
2. Instala la extensión **Live Server** (si no la tienes).
3. Clic derecho en `index.html` → **Open with Live Server**.

Si la abres con doble clic también funciona, pero Live Server recarga solo cada vez que guardas.

## 🛠️ Qué editar

| Archivo | Qué cambiar |
|---|---|
| `script.js` | `START_DATE` (fecha de inicio) y la lista `songs` |
| `index.html` | Textos, la carta y el enlace de la playlist |
| `foto.png` | Reemplazar por otra foto (cuadrada, unos 600×600 px) |

### Fecha del contador

```js
const START_DATE = new Date(año, mes, día, hora, minuto, segundo);
```

⚠️ El mes empieza en 0: enero = 0, febrero = 1, ... diciembre = 11.

### Playlist de Spotify

En `index.html`, cambia el código largo del `src` del `<iframe>` por el de tu playlist
(Spotify → Compartir → Copiar enlace).

## 🌐 Publicarla

Con **GitHub Pages**: *Settings → Pages → Deploy from a branch → main → / (root)*.
Allí las mayúsculas importan: si el archivo es `foto.png`, el código debe decir `foto.png`.

## 🧰 Tecnologías

- HTML, CSS y JavaScript
- [Tailwind CSS](https://tailwindcss.com/) (por CDN)
- [Font Awesome](https://fontawesome.com/) para los íconos
- Google Fonts: Plus Jakarta Sans y Dancing Script

## 💌

Hecho con cariño, para una sola persona.
