# Blog Integration - WordPress Headless

Este documento explica la integración del blog con WordPress Headless usando REST API.

## ✅ Estado de la Integración

- ✅ Branch `blog-headless` creado
- ✅ Variables de entorno configuradas
- ✅ Utilidades de WordPress API creadas
- ✅ Página de listado `/blog` implementada
- ✅ Página individual `/blog/[slug]` implementada
- ✅ Server-Side Rendering (SSR) configurado
- ✅ ISR con revalidación cada hora
- ✅ SEO metadata dinámica
- ⏳ Polylang pendiente de instalar en WordPress
- ⏳ Diseño frontend pendiente

## 📁 Estructura de Archivos Creados

```
galileo-finance/
├── .env.local                          # Variables de entorno
├── src/
│   ├── lib/
│   │   └── wordpress.js                # Utilidades WordPress API
│   └── app/
│       └── blog/
│           ├── page.js                 # Listado de posts
│           └── [slug]/
│               └── page.js             # Post individual
└── BLOG_INTEGRATION.md                 # Esta documentación
```

## 🔧 Configuración

### Variables de Entorno

En `.env.local`:
```bash
WORDPRESS_API_URL=https://galieloblog.aurigital.com/wp-json/wp/v2
```

**IMPORTANTE:** Este archivo NO debe ser committeado a Git (ya está en .gitignore).

## 🚀 Cómo Funciona

### 1. Fetch desde Servidor (No CORS)

Todas las llamadas a WordPress se hacen desde **Server Components** de Next.js 14:
- ✅ No hay problemas de CORS (el fetch lo hace el servidor de Vercel, no el navegador)
- ✅ Mejor SEO (contenido renderizado en servidor)
- ✅ Más seguro (no expones la API al browser)

### 2. ISR (Incremental Static Regeneration)

Configurado con `next: { revalidate: 3600 }`:
- Los posts se cachean durante 1 hora
- Cada hora se regeneran automáticamente
- Primera visita: genera página estática
- Visitas siguientes: sirve desde cache

### 3. Rutas Implementadas

#### `/blog` - Listado de Posts
- Muestra grid de 9 posts por página
- Paginación funcional
- Featured images con fallback
- Excerpt y fecha
- Link a post individual

#### `/blog/[slug]` - Post Individual
- Ruta dinámica basada en slug
- Featured image hero
- Contenido completo con estilos Tailwind (prose)
- SEO metadata dinámica
- Breadcrumb "Volver al blog"

## 📚 Utilidades Disponibles (`src/lib/wordpress.js`)

### `getPosts(lang, per_page, page)`
Obtiene lista de posts con paginación.

```javascript
const { posts, pagination } = await getPosts('es', 9, 1);
```

### `getPostBySlug(slug, lang)`
Obtiene un post individual por slug.

```javascript
const post = await getPostBySlug('hello-world', 'es');
```

### `getAllPostSlugs()`
Obtiene todos los slugs para generación estática.

```javascript
const slugs = await getAllPostSlugs();
```

### `getCategories(lang)`
Obtiene categorías (para filtros).

```javascript
const categories = await getCategories('es');
```

### `getFeaturedImage(post)`
Extrae URL de imagen destacada.

```javascript
const imageUrl = getFeaturedImage(post);
```

### `getAuthorName(post)`
Extrae nombre del autor.

```javascript
const author = getAuthorName(post);
```

### `formatDate(dateString, locale)`
Formatea fecha según idioma.

```javascript
const formattedDate = formatDate(post.date, 'es');
```

## 🌐 Integración con i18n (Próximos Pasos)

### 1. Instalar Polylang en WordPress

Ver sección: **"Guía de Instalación de Polylang"** más abajo.

### 2. Una vez instalado Polylang:

Los posts tendrán un campo `lang` en la API:
```json
{
  "id": 1,
  "slug": "hello-world",
  "lang": "es",
  ...
}
```

### 3. Integrar con react-i18next

En `src/app/blog/page.js`, conectar con el selector de idioma del Navbar:

```javascript
'use client';
import { useTranslation } from 'react-i18next';

export default function BlogPage() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  // Fetch posts del idioma actual
  const { posts } = await getPosts(currentLang);
  ...
}
```

## 🎨 TODOs Frontend

Los archivos tienen comentarios `TODO` marcados. Principales tareas:

### En `/blog/page.js`:
- [ ] Aplicar diseño Galileo (colores, fuentes, espaciado)
- [ ] Mejorar componente de paginación
- [ ] Agregar filtros por categoría
- [ ] Agregar búsqueda de artículos
- [ ] Integrar selector de idioma
- [ ] Agregar animaciones AOS
- [ ] Optimizar grid responsive

### En `/blog/[slug]/page.js`:
- [ ] Aplicar diseño consistente con el sitio
- [ ] Agregar botones de compartir en redes sociales
- [ ] Agregar sección "Posts Relacionados"
- [ ] Agregar breadcrumbs mejorados
- [ ] Mejorar estilos de contenido WordPress (bloques Gutenberg)
- [ ] Agregar comentarios (si se desea)

### En `src/lib/wordpress.js`:
- [ ] Agregar función para posts por categoría
- [ ] Agregar función para búsqueda
- [ ] Agregar manejo de errores más robusto

## 🧪 Testing

### Ver el blog localmente:

1. Asegúrate de tener las variables de entorno en `.env.local`
2. Reinicia el servidor dev:
   ```bash
   npm run dev
   ```
3. Visita: `http://localhost:3000/blog`
4. Click en un post para ver la página individual

### Ver post de prueba:
- Listado: `http://localhost:3000/blog`
- Post individual: `http://localhost:3000/blog/hello-world`

## 🔒 Seguridad

- ✅ Las llamadas se hacen desde servidor (no desde browser)
- ✅ WordPress no necesita exponer CORS
- ✅ Variables de entorno no expuestas al cliente
- ⚠️ WordPress debe permitir acceso público a `/wp-json/wp/v2/posts`

## 📦 Deployment (Vercel)

### Configurar Variables de Entorno en Vercel:

1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Environment Variables
3. Agrega:
   ```
   WORDPRESS_API_URL=https://galieloblog.aurigital.com/wp-json/wp/v2
   ```
4. Redeploy

### Revalidación On-Demand (Opcional)

Para revalidar cuando publiques un nuevo post, puedes usar webhooks:

1. En WordPress, instalar plugin "WPGatsby" o similar
2. Configurar webhook que llame a:
   ```
   POST https://tu-dominio.vercel.app/api/revalidate
   ```
3. Crear route handler en `/app/api/revalidate/route.js`

## ⚠️ IMPORTANTE: Configuración de Next.js

**PROBLEMA DETECTADO:** El archivo `next.config.mjs` actual tiene `output: "export"`, que genera un sitio 100% estático (Static HTML Export).

Esto **NO es compatible** con:
- ❌ Server Components que hacen fetch dinámico
- ❌ ISR (Incremental Static Regeneration)
- ❌ Rutas dinámicas `/blog/[slug]`
- ❌ `generateMetadata` dinámico
- ❌ API Routes

### Solución Requerida:

Necesitas modificar `next.config.mjs` para eliminar `output: "export"`:

**ANTES:**
```javascript
const nextConfig = {
  compress: true,
  output: "export",  // ← ESTO DEBE SER ELIMINADO
  distDir: "build",
  images: {
    unoptimized: true
  }
};
```

**DESPUÉS:**
```javascript
const nextConfig = {
  compress: true,
  distDir: "build",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'galieloblog.aurigital.com',
      }
    ]
  }
};
```

### ¿Por qué este cambio?

- `output: "export"` → Genera HTML estático puro (sin servidor)
- Sin esa opción → Usa servidor de Vercel (Server Components, ISR)

### Impacto en Deployment:

Si actualmente deployeas el sitio como **estático puro**, necesitarás cambiar a **Vercel Serverless**:

1. El landing page principal (`/`) seguirá funcionando igual
2. Las rutas de blog (`/blog`) requerirán el servidor de Next.js
3. Vercel automáticamente detectará esto y lo manejará

**No hay problema** - Vercel soporta ambos modos y optimiza automáticamente.

---

## 🐛 Troubleshooting

### "Failed to fetch posts"
- Verifica que `WORDPRESS_API_URL` esté correcta en `.env.local`
- Verifica que WordPress esté accesible públicamente
- Verifica que `/wp-json/wp/v2/posts` devuelva JSON

### "Post not found" (404)
- Verifica que el slug del post exista en WordPress
- Verifica que el post esté publicado (no en borrador)

### Build error: "Page /blog can't be used with output: export"
- Necesitas remover `output: "export"` del `next.config.mjs` (ver sección anterior)

### Imágenes no se cargan
- Ya está configurado en la solución de arriba con `remotePatterns`

---

# 📘 Guía de Instalación de Polylang

Polylang es un plugin gratuito para WordPress que permite gestionar contenido multilingüe.

## Paso 1: Instalar Polylang

### Opción A: Desde el Dashboard de WordPress

1. Ve a **Plugins → Add New Plugin**
2. Busca "**Polylang**"
3. Instala el plugin creado por **Frédéric Demarle**
4. Activa el plugin

### Opción B: Desde WP-CLI (si tienes acceso SSH)

```bash
wp plugin install polylang --activate
```

## Paso 2: Configurar Idiomas

1. Ve a **Settings → Languages** (o **Ajustes → Idiomas**)

2. Agrega los idiomas:
   - Click en "**Add a language**"
   - Selecciona **Español (España)** o **Español**
     - Nombre: Español
     - Code: es
     - Locale: es_ES
   - Click "Add language"

   - Luego agrega **English**
     - Nombre: English
     - Code: en
     - Locale: en_US
   - Click "Add language"

3. Configura el idioma por defecto:
   - Marca **Español** como idioma por defecto

## Paso 3: Configurar URL Structure

En **Settings → Languages → URL modifications**:

Recomiendo usar **subdirectorios**:
- Español: `galieloblog.aurigital.com/es/hello-world/`
- English: `galieloblog.aurigital.com/en/hello-world/`

O usar **parámetros** (más simple para API):
- `galieloblog.aurigital.com/hello-world/?lang=es`
- `galieloblog.aurigital.com/hello-world/?lang=en`

**Para API REST, ambas opciones funcionan igual.**

## Paso 4: Traducir el Post de Prueba

1. Ve a **Posts → All Posts**
2. Verás columnas para cada idioma (🇪🇸 🇬🇧)
3. El post "Hello World" tendrá un "+" en la columna 🇬🇧
4. Click en el "+" para crear la traducción en inglés
5. Escribe el contenido en inglés
6. Publica

## Paso 5: Verificar en la API

### Ver posts en español:
```
https://galieloblog.aurigital.com/wp-json/wp/v2/posts?lang=es
```

### Ver posts en inglés:
```
https://galieloblog.aurigital.com/wp-json/wp/v2/posts?lang=en
```

### Ver todos los posts (sin filtro de idioma):
```
https://galieloblog.aurigital.com/wp-json/wp/v2/posts
```

## Paso 6: Verificar en el Frontend de Galileo

Una vez configurado Polylang:

1. Ve a `http://localhost:3000/blog?lang=es`
2. Ve a `http://localhost:3000/blog?lang=en`

Los posts se filtrarán automáticamente por idioma.

## 📝 Notas Importantes

### ¿Qué pasa con posts sin traducción?

Si un post solo existe en español y pides posts en inglés (`?lang=en`), ese post NO aparecerá. Debes traducir cada post a ambos idiomas.

### Sincronizar Categorías y Tags

Polylang también permite traducir categorías y tags:
- Ve a **Posts → Categories**
- Verás columnas de idioma
- Click en el "+" para crear traducciones

### REST API Fields

Cuando Polylang está activo, cada post tendrá estos campos extra en la API:

```json
{
  "id": 1,
  "lang": "es",
  "translations": {
    "en": 2,
    "es": 1
  },
  ...
}
```

Esto permite saber:
- En qué idioma está el post (`lang`)
- IDs de traducciones en otros idiomas (`translations`)

---

## 🎉 ¡Listo!

La integración base está completa. Ahora puedes:

1. ✅ Ver el post de prueba en `http://localhost:3000/blog`
2. ⏳ Instalar Polylang en WordPress (siguiente paso)
3. ⏳ Desarrollar el diseño frontend
4. ⏳ Integrar con el selector de idioma del sitio

**¿Preguntas?** Revisa los comentarios en el código o consulta la documentación de WordPress REST API:
- https://developer.wordpress.org/rest-api/reference/posts/

---

**Creado:** 22 de enero, 2026
**Branch:** `blog-headless`
**WordPress:** `galieloblog.aurigital.com`
