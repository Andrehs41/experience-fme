# FME Experience

Sitio web de experiencia de marca para **FME Store — La Marca del Barrio**.  
Construido con React, TypeScript, Tailwind CSS v4 y GSAP para crear una experiencia inmersiva que comunica la identidad de la marca antes de llevar al usuario al ecommerce.

---

## Stack

| Tecnología | Versión | Uso |
|---|---|---|
| React | 18+ | UI y componentes |
| TypeScript | 5+ | Tipado estático |
| Vite | 5+ | Bundler y dev server |
| React Router DOM | 6+ | Navegación SPA |
| Tailwind CSS | 4+ | Estilos utilitarios |
| GSAP + @gsap/react | 3.12+ | Animaciones e interacciones |

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/fme-experience.git
cd fme-experience
```

### 2. Instalar dependencias

```bash
npm install
```

Esto instala todo lo necesario incluyendo GSAP, React Router y Tailwind v4.


## Estructura del proyecto

```
fme-experience/
├── public/
│   ├── fonts/                  # Fuentes locales 
│   └── images/
│       ├── comunidad/          # Fotos de clientes — cliente-01.jpg, etc.
│       └── barrio/             # Imágenes de la sección Barrio
│
├── src/
│   ├── components/
│   │   ├── AnimatedText.tsx    # Texto animado con SplitText (7 variantes)
│   │   ├── Cursor.tsx          # Cursor personalizado global
│   │   ├── Intro.tsx           # Animación de entrada de la marca
│   │   ├── MainLayout.tsx      # Layout base con Navbar
│   │   ├── MagneticButton.tsx  # Botón con efecto magnético
│   │   ├── MasonryGrid.tsx     # Grid masonry + lightbox
│   │   └── Navbar.tsx          # Navegación global
│   │
│   ├── data/
│   │   ├── comunidadData.ts    # Fotos y datos de clientes
│   │   └── multimarcaData.ts   # Marcas del catálogo multimarca
│   │
│   ├── hooks/
│   │   └── useScrollAnimation.ts  # Hook reutilizable para animaciones al scroll
│   │
│   ├── lib/
│   │   └── gsap.ts             # Configuración central de GSAP y plugins
│   │
│   ├── pages/
│   │   ├── Home.tsx            # Página principal con intro
│   │   ├── Barrio.tsx          # Scroll horizontal con imágenes
│   │   ├── Comunidad.tsx       # Galería masonry de clientes
│   │   └── Multimarca.tsx      # Split screen FME vs Multimarca
│   │
│   ├── App.tsx                 # Rutas principales
│   ├── main.tsx                # Entry point
│   └── index.css               # Variables CSS globales + Tailwind
│
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```
## Agregar contenido

### Fotos de clientes (Comunidad)

1. Copia la foto a `public/images/comunidad/cliente-XX.jpg`
2. Abre `src/data/comunidadData.ts` y agrega:

```ts
{
  id:         7,
  src:        "/images/comunidad/cliente-07.jpg",
  name:       "Nombre Cliente",
  collection: "Nombre Colección",
  date:       "May 2025",
  ratio:      "3/4",   // "1/1" | "3/4" | "4/3" | "2/3"
}
```

### Marcas del catálogo (Multimarca)

Abre `src/data/multimarcaData.ts` y agrega a `BRANDS`:

```ts
{
  id:    4,
  name:  "Nombre Marca",
  desc:  "Descripción breve.",
  href:  "https://link-al-catalogo.com",
  logo:  "/images/marcas/logo-marca.png", // opcional
}
```

---

## Rutas

| Ruta | Página |
|---|---|
| `/` | Home — experiencia principal con intro |
| `/barrio` | El Barrio — scroll horizontal con lookbook |
| `/comunidad` | Comunidad — galería de clientes |
| `/multimarca` | Multimarca — split screen FME vs catálogo |
| `/colecciones` | Colecciones — por implementar |


## Ecommerce

Este sitio es una experiencia de marca independiente.  
El ecommerce oficial vive en **[storefme.com](https://storefme.com)**.  
Los botones de "Tienda" y "Ver Catálogo" redirigen allí.

Para actualizar el link del ecommerce, edita `src/data/multimarcaData.ts`:

```ts
href: "https://storefme.com",   // FME Store
href: "https://storefme.com/",  // Catálogo multimarca
```

---

*FME Store — La Marca del Barrio — Medellín 2025*
