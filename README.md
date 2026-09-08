# ADEEMA

Landing institucional de ADEEMA desarrollada con React, Vite y Tailwind CSS.

## Scripts

- `npm run dev`: inicia el entorno local.
- `npm run build`: genera la build de producción en `dist`.
- `npm run lint`: ejecuta ESLint.
- `npm run preview`: sirve la build local para validación final.

## Deploy y entrega del repositorio

El proyecto queda desacoplado de un entorno único de publicación para que otra empresa pueda desplegarlo sin depender de configuraciones locales.

### Scripts disponibles

- `npm run build`: genera una build estándar, útil para servidores que publican desde dominio raíz.
- `npm run build:pages`: genera la build específica para GitHub Pages con `base=/adeema/`.

### Si se usa GitHub Pages

1. Entrar a `Settings > Pages` del repositorio.
2. En `Build and deployment`, elegir `GitHub Actions`.
3. Hacer push a `main`.

Cada push a `main` ejecuta `.github/workflows/deploy.yml`, instala dependencias con `npm ci`, corre `npm run build:pages` y publica `dist/` en GitHub Pages.

Si el repositorio sigue siendo `Nuhe/adeema`, la URL esperada es:

`https://nuhe.github.io/adeema/`

### Si lo deploya otro proveedor

La otra empresa solo necesita:

1. `npm ci`
2. `npm run build`
3. Publicar el contenido de `dist/`

Si el sitio se sirve bajo una subcarpeta, deben compilar con un base path acorde, por ejemplo:

`npm run build -- --base=/mi-subruta/`

## Notas de entrega

- No hay dependencia de assets locales fuera del repo para la UI actual.
- La identidad visual usa recursos remotos centralizados en `src/assets/brandAssets.js`.
- Antes de cualquier deploy conviene correr `npm run lint` y la build correspondiente al entorno de destino.
