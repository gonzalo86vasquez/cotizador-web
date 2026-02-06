---
name: create-component
description: Crea un componente React con TypeScript, tests y estructura completa
---

# Skill: Crear Componente React

## Uso
```
/component NombreComponente [--with-stories] [--path=ruta]
```

## Argumentos
| Argumento | Descripción | Default |
|-----------|-------------|---------|
| nombre | Nombre del componente (PascalCase) | Requerido |
| --with-stories | Incluir archivo Storybook | false |
| --path | Ruta dentro de components/ | features/ |

## Proceso

1. **Validar nombre** - Debe ser PascalCase
2. **Crear directorio** - `src/components/{path}/{NombreComponente}/`
3. **Generar archivos**:
   - `{NombreComponente}.tsx` - Componente
   - `{NombreComponente}.test.tsx` - Tests
   - `index.ts` - Export
   - `{NombreComponente}.stories.tsx` - (opcional)

## Archivos Generados

### {NombreComponente}.tsx
```tsx
import { memo } from 'react';

export interface {NombreComponente}Props {
  /** Descripción de la prop */
  className?: string;
}

/**
 * Descripción del componente
 */
export const {NombreComponente} = memo(function {NombreComponente}({
  className = '',
}: {NombreComponente}Props) {
  return (
    <div className={`${className}`}>
      {/* Contenido */}
    </div>
  );
});
```

### {NombreComponente}.test.tsx
```tsx
import { render, screen } from '@testing-library/react';
import { {NombreComponente} } from './{NombreComponente}';

describe('{NombreComponente}', () => {
  it('should render correctly', () => {
    render(<{NombreComponente} />);
    // Add assertions
  });

  it('should apply custom className', () => {
    render(<{NombreComponente} className="custom-class" />);
    // Add assertions
  });
});
```

### index.ts
```tsx
export { {NombreComponente} } from './{NombreComponente}';
export type { {NombreComponente}Props } from './{NombreComponente}';
```

### {NombreComponente}.stories.tsx (opcional)
```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { {NombreComponente} } from './{NombreComponente}';

const meta: Meta<typeof {NombreComponente}> = {
  title: 'Components/{NombreComponente}',
  component: {NombreComponente},
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof {NombreComponente}>;

export const Default: Story = {
  args: {},
};
```

## Ejemplo

```bash
/component ProductCard --path=features/catalog
```

Genera:
```
src/components/features/catalog/ProductCard/
├── ProductCard.tsx
├── ProductCard.test.tsx
└── index.ts
```
