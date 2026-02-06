# Sistema de Diseno CotizadorSAC v2.0

Sistema de diseno moderno inspirado en Stripe, Vercel y Linear. Diseñado para crear una experiencia profesional, sofisticada y memorable para usuarios del sector minero industrial.

---

## Indice

1. [Principios de Diseno](#principios-de-diseno)
2. [Paleta de Colores](#paleta-de-colores)
3. [Tipografia](#tipografia)
4. [Espaciado](#espaciado)
5. [Sombras y Efectos](#sombras-y-efectos)
6. [Componentes UI](#componentes-ui)
7. [Animaciones](#animaciones)
8. [Patrones de Diseno](#patrones-de-diseno)
9. [Accesibilidad](#accesibilidad)
10. [Responsive Design](#responsive-design)

---

## Principios de Diseno

### 1. Profesionalismo Sofisticado
El diseno transmite confianza y experiencia tecnica. Colores profundos, tipografia clara y espaciado generoso.

### 2. Claridad sobre Decoracion
Cada elemento visual tiene un proposito. Priorizamos la usabilidad sobre la estetica.

### 3. Consistencia
Tokens de diseno aplicados uniformemente en toda la aplicacion.

### 4. Accesibilidad
WCAG 2.1 AA como minimo. Contraste adecuado, navegacion por teclado, compatibilidad con lectores de pantalla.

### 5. Performance Percibida
Animaciones sutiles que mejoran la experiencia sin afectar la velocidad.

---

## Paleta de Colores

### Colores Primarios

El esquema de color principal usa tonos violeta/purpura que transmiten innovacion y profesionalismo, con acentos cyan para llamadas a la accion.

```css
/* Primary - Violet/Purple */
--color-primary-50: #f5f3ff;   /* Fondos sutiles */
--color-primary-100: #ede9fe;  /* Hover states */
--color-primary-200: #ddd6fe;  /* Borders activos */
--color-primary-300: #c4b5fd;  /* Decorativo */
--color-primary-400: #a78bfa;  /* Iconos secundarios */
--color-primary-500: #8b5cf6;  /* Color principal */
--color-primary-600: #7c3aed;  /* Botones primarios */
--color-primary-700: #6d28d9;  /* Hover botones */
--color-primary-800: #5b21b6;  /* Activo/Pressed */
--color-primary-900: #4c1d95;  /* Texto sobre fondo claro */

/* Accent - Cyan (para CTAs y highlights) */
--color-accent-400: #22d3ee;
--color-accent-500: #06b6d4;
--color-accent-600: #0891b2;
```

### Colores Neutrales

Grises sofisticados para texto, fondos y bordes.

```css
--color-neutral-0: #ffffff;    /* Blanco puro */
--color-neutral-25: #fcfcfd;   /* Fondo muy sutil */
--color-neutral-50: #f9fafb;   /* Fondo alternativo */
--color-neutral-100: #f3f4f6;  /* Fondos de cards */
--color-neutral-200: #e5e7eb;  /* Bordes por defecto */
--color-neutral-300: #d1d5db;  /* Bordes activos */
--color-neutral-400: #9ca3af;  /* Texto placeholder */
--color-neutral-500: #6b7280;  /* Texto secundario */
--color-neutral-600: #4b5563;  /* Texto body */
--color-neutral-700: #374151;  /* Texto enfatizado */
--color-neutral-800: #1f2937;  /* Headings */
--color-neutral-900: #111827;  /* Texto principal */
--color-neutral-950: #030712;  /* Footer/Dark sections */
```

### Colores Semanticos

```css
/* Success - Emerald */
--color-success-50: #ecfdf5;
--color-success-500: #10b981;
--color-success-700: #047857;

/* Warning - Amber */
--color-warning-50: #fffbeb;
--color-warning-500: #f59e0b;
--color-warning-600: #d97706;

/* Error - Red */
--color-error-50: #fef2f2;
--color-error-500: #ef4444;
--color-error-600: #dc2626;

/* Info - Blue */
--color-info-50: #eff6ff;
--color-info-500: #3b82f6;
--color-info-600: #2563eb;
```

### Gradientes

```css
/* Gradiente primario (botones, hero) */
--gradient-primary: linear-gradient(135deg, #7c3aed 0%, #8b5cf6 50%, #06b6d4 100%);

/* Gradiente hero (fondo animado) */
--gradient-hero: linear-gradient(135deg, #1e1b4b 0%, #312e81 25%, #4c1d95 50%, #581c87 75%, #701a75 100%);

/* Gradiente mesh (fondos de seccion) */
--gradient-mesh:
  radial-gradient(at 40% 20%, hsla(265, 89%, 78%, 0.15) 0px, transparent 50%),
  radial-gradient(at 80% 0%, hsla(189, 94%, 50%, 0.1) 0px, transparent 50%),
  radial-gradient(at 0% 50%, hsla(271, 91%, 65%, 0.1) 0px, transparent 50%);
```

---

## Tipografia

### Fuente Principal

**Inter** - Fuente sans-serif optimizada para interfaces digitales.

```css
--font-sans: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;
--font-mono: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
```

### Escala Tipografica

| Token | Tamano | Uso |
|-------|--------|-----|
| `text-xs` | 12px / 0.75rem | Badges, labels pequenos |
| `text-sm` | 14px / 0.875rem | Texto secundario, botones |
| `text-base` | 16px / 1rem | Texto body principal |
| `text-lg` | 18px / 1.125rem | Lead paragraphs |
| `text-xl` | 20px / 1.25rem | Subtitulos |
| `text-2xl` | 24px / 1.5rem | Titulos de seccion |
| `text-3xl` | 30px / 1.875rem | Titulos grandes |
| `text-4xl` | 36px / 2.25rem | Titulos hero mobile |
| `text-5xl` | 48px / 3rem | Titulos hero tablet |
| `text-6xl` | 60px / 3.75rem | Titulos hero desktop |

### Font Weights

```css
font-normal: 400;   /* Texto body */
font-medium: 500;   /* Labels, botones */
font-semibold: 600; /* Subtitulos */
font-bold: 700;     /* Titulos */
```

### Line Height

```css
--leading-none: 1;        /* Titulos compactos */
--leading-tight: 1.25;    /* Titulos */
--leading-snug: 1.375;    /* Subtitulos */
--leading-normal: 1.5;    /* Texto body */
--leading-relaxed: 1.625; /* Parrafos largos */
```

---

## Espaciado

Sistema basado en multiplos de 4px.

| Token | Valor | Uso |
|-------|-------|-----|
| `space-1` | 4px | Gaps minimos |
| `space-2` | 8px | Padding interno componentes |
| `space-3` | 12px | Gaps en listas |
| `space-4` | 16px | Padding estandar |
| `space-6` | 24px | Separacion de secciones |
| `space-8` | 32px | Margin secciones |
| `space-12` | 48px | Padding seccion mobile |
| `space-16` | 64px | Padding seccion tablet |
| `space-24` | 96px | Padding seccion desktop |

---

## Sombras y Efectos

### Sombras Estandar

```css
/* Sombra sutil (inputs, elementos planos) */
--shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);

/* Sombra media (cards, dropdowns) */
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

/* Sombra grande (modals, popovers) */
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

/* Sombra extra grande (elementos flotantes) */
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
```

### Sombras de Cards (Estilo Stripe)

```css
/* Card default */
--shadow-card:
  0 0 0 1px rgba(0, 0, 0, 0.03),
  0 2px 4px rgba(0, 0, 0, 0.05),
  0 12px 24px rgba(0, 0, 0, 0.05);

/* Card hover */
--shadow-card-hover:
  0 0 0 1px rgba(0, 0, 0, 0.03),
  0 4px 8px rgba(0, 0, 0, 0.08),
  0 24px 48px rgba(0, 0, 0, 0.08);
```

### Sombras Coloreadas

```css
/* Boton primario */
--shadow-primary: 0 4px 14px 0 rgba(139, 92, 246, 0.25);

/* Boton primario hover */
--shadow-primary-lg: 0 10px 40px -10px rgba(139, 92, 246, 0.35);

/* Glow effect */
--shadow-glow: 0 0 40px rgba(139, 92, 246, 0.15);
```

### Border Radius

```css
--radius-sm: 4px;    /* Elementos pequenos */
--radius-default: 8px; /* Default */
--radius-md: 10px;   /* Inputs */
--radius-lg: 12px;   /* Botones */
--radius-xl: 16px;   /* Cards */
--radius-2xl: 20px;  /* Cards grandes */
--radius-full: 9999px; /* Pills, badges */
```

### Glassmorphism

```css
/* Card con efecto glass */
.glass-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
}
```

---

## Componentes UI

### Button

```tsx
import { Button } from '@/components/ui';

// Variantes
<Button variant="primary">Primario</Button>
<Button variant="secondary">Secundario</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Peligro</Button>
<Button variant="outline">Outline</Button>

// Tamanos
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>

// Estados
<Button isLoading>Cargando...</Button>
<Button disabled>Deshabilitado</Button>

// Con iconos
<Button leftIcon={<Plus />}>Agregar</Button>
<Button rightIcon={<ArrowRight />}>Continuar</Button>
```

### Card

```tsx
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui';

// Variantes
<Card variant="default">Default card</Card>
<Card variant="glass">Glass effect</Card>
<Card variant="gradient-border">Gradient border</Card>
<Card variant="elevated">Elevated</Card>

// Interactivo
<Card interactive shine>
  Hover me
</Card>

// Con estructura
<Card
  header={<CardHeader title="Titulo" description="Descripcion" />}
  footer={<CardFooter><Button>Accion</Button></CardFooter>}
>
  Contenido
</Card>
```

### Input

```tsx
import { Input } from '@/components/ui';

// Basico
<Input label="Email" placeholder="tu@email.com" />

// Con icono
<Input leftIcon={<Search />} placeholder="Buscar..." />

// Validacion
<Input label="Password" error="Contrasena requerida" />
<Input label="Username" success="Disponible" />

// Con ayuda
<Input label="SKU" helperText="Codigo unico del producto" />
```

### Badge

```tsx
import { Badge } from '@/components/ui';

// Variantes
<Badge variant="default">Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>

// Con dot
<Badge variant="success" dot>En Stock</Badge>

// Con icono
<Badge variant="info" icon={<Clock />}>15 dias</Badge>

// Outline
<Badge variant="error" outline>Urgente</Badge>
```

### Container

```tsx
import { Container } from '@/components/ui';

// Tamanos
<Container size="narrow">768px max</Container>
<Container size="default">1152px max</Container>
<Container size="wide">1280px max</Container>

// Con espaciado de seccion
<Container section="lg">Con padding vertical</Container>
```

### Skeleton

```tsx
import { Skeleton, SkeletonProductCard, SkeletonCard } from '@/components/ui';

// Basico
<Skeleton variant="text" width="80%" />
<Skeleton variant="circular" width={48} height={48} />
<Skeleton variant="rounded" width="100%" height={200} />

// Multi-linea
<Skeleton variant="text" lines={3} />

// Presets
<SkeletonProductCard />
<SkeletonCard />
```

---

## Animaciones

### Keyframes Disponibles

```css
/* Fade in */
.animate-fade-in { animation: fade-in 200ms ease-out; }
.animate-fade-in-up { animation: fade-in-up 300ms ease-out; }
.animate-fade-in-down { animation: fade-in-down 300ms ease-out; }

/* Scale */
.animate-scale-in { animation: scale-in 200ms cubic-bezier(0.34, 1.56, 0.64, 1); }

/* Slide */
.animate-slide-in-right { animation: slide-in-right 300ms ease-out; }

/* Continuous */
.animate-pulse-soft { animation: pulse-soft 2s infinite; }
.animate-float { animation: float 6s infinite; }
.animate-spin-slow { animation: spin-slow 20s linear infinite; }
```

### Delays para Stagger

```css
.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 200ms; }
.delay-300 { animation-delay: 300ms; }
.delay-400 { animation-delay: 400ms; }
.delay-500 { animation-delay: 500ms; }
```

### Transiciones

```css
--transition-fast: 150ms;
--transition-base: 200ms;
--transition-slow: 300ms;
--transition-slower: 500ms;

--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

---

## Patrones de Diseno

### Hero Section

```tsx
<section className="relative overflow-hidden bg-gradient-animated min-h-[600px]">
  {/* Background effects */}
  <div className="absolute inset-0 bg-grid opacity-20" />
  <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-float" />

  <Container className="relative py-20 lg:py-32">
    <Badge>Tagline</Badge>
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
      Titulo <span className="text-gradient-hero">Destacado</span>
    </h1>
    <p className="text-lg text-white/80">Descripcion</p>
    <div className="flex gap-4">
      <Button>CTA Principal</Button>
      <Button variant="ghost">Secundario</Button>
    </div>
  </Container>

  {/* Fade to content */}
  <div className="absolute bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
</section>
```

### Product Grid

```tsx
<section className="py-24 bg-neutral-50">
  <Container>
    <div className="mb-12">
      <Badge variant="success" className="mb-4">
        <Sparkles />Los mas solicitados
      </Badge>
      <h2 className="text-3xl font-bold">Productos Destacados</h2>
      <p className="text-neutral-600">Descripcion</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product, i) => (
        <div key={product.id} style={{ animationDelay: `${i * 100}ms` }} className="animate-fade-in-up">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  </Container>
</section>
```

### CTA Section

```tsx
<section className="relative py-24 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-violet-900" />
  <div className="absolute inset-0 bg-grid opacity-10" />
  <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />

  <Container className="relative text-center">
    <h2 className="text-4xl font-bold text-white">Titulo CTA</h2>
    <p className="text-neutral-300">Descripcion persuasiva</p>
    <Button size="lg" className="bg-white text-neutral-900">
      Accion Principal
    </Button>
  </Container>
</section>
```

---

## Accesibilidad

### Contraste de Colores

Todos los colores cumplen WCAG AA (4.5:1 para texto normal, 3:1 para texto grande y UI).

| Combinacion | Ratio | Nivel |
|-------------|-------|-------|
| Neutral-900 sobre blanco | 17.4:1 | AAA |
| Neutral-600 sobre blanco | 7.0:1 | AAA |
| Violet-600 sobre blanco | 5.4:1 | AA |
| Blanco sobre Violet-600 | 5.4:1 | AA |

### Focus States

```css
:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}
```

### Skip Link

```tsx
<a href="#main-content" className="skip-link">
  Saltar al contenido principal
</a>
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Touch Targets

Minimo 44x44px para elementos interactivos moviles.

---

## Responsive Design

### Breakpoints

```css
sm: 640px   /* Telefono landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Laptop */
xl: 1280px  /* Desktop */
2xl: 1536px /* Desktop grande */
```

### Patron Mobile-First

```tsx
<div className="
  grid grid-cols-1          /* Mobile: 1 columna */
  sm:grid-cols-2            /* Tablet pequena: 2 */
  lg:grid-cols-4            /* Desktop: 4 */
  gap-4 lg:gap-6            /* Gap responsive */
">
```

### Container Responsive

```tsx
<Container size="wide">
  {/*
    Padding automatico:
    - Mobile: 16px
    - Tablet: 24px
    - Desktop: 32px
  */}
</Container>
```

---

## Archivos Principales

| Archivo | Descripcion |
|---------|-------------|
| `frontend/src/app/globals.css` | Design tokens y utilidades CSS |
| `frontend/src/components/ui/Button.tsx` | Componente Button |
| `frontend/src/components/ui/Card.tsx` | Componente Card |
| `frontend/src/components/ui/Input.tsx` | Componente Input |
| `frontend/src/components/ui/Badge.tsx` | Componente Badge |
| `frontend/src/components/ui/Container.tsx` | Layout container |
| `frontend/src/components/ui/Skeleton.tsx` | Loading skeletons |
| `frontend/src/components/ui/index.ts` | Exports centralizados |

---

**Version**: 2.0
**Ultima actualizacion**: Febrero 2025
**Inspiracion**: Stripe, Vercel, Linear
