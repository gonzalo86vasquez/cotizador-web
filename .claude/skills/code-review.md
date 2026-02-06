---
name: code-review
description: Realiza code review estructurado de archivos o directorios
---

# Skill: Code Review

## Uso
```
/review [archivo|directorio] [--focus=area]
```

## Argumentos
| Argumento | Descripción | Default |
|-----------|-------------|---------|
| path | Archivo o directorio a revisar | . (actual) |
| --focus | Área de enfoque: security, performance, quality, all | all |

## Proceso

1. **Identificar archivos** - Listar archivos a revisar
2. **Analizar por categoría**:
   - Seguridad
   - Performance
   - Calidad de código
   - Tests
3. **Generar reporte** - Formato estructurado con severidad

## Checklist de Revisión

### Seguridad
- [ ] Sin credenciales hardcodeadas
- [ ] Inputs validados/sanitizados
- [ ] Sin SQL/XSS injection
- [ ] Autenticación correcta
- [ ] Autorización en cada endpoint

### Performance
- [ ] Sin N+1 queries
- [ ] Índices en queries frecuentes
- [ ] Memoización donde necesario
- [ ] Lazy loading implementado
- [ ] Sin memory leaks

### Calidad
- [ ] Nombres descriptivos
- [ ] Funciones < 30 líneas
- [ ] Sin código duplicado
- [ ] Manejo de errores
- [ ] Sin código muerto

### Tests
- [ ] Tests cubren happy path
- [ ] Tests cubren edge cases
- [ ] Mocks apropiados
- [ ] Cobertura > 80%

## Formato de Output

```markdown
# Code Review: {path}

## Resumen
- **Archivos**: X revisados
- **Hallazgos**: X críticos, X altos, X medios
- **Veredicto**: ✅ | ⚠️ | ❌

---

## 🔴 Crítico

### [Título]
**Archivo**: `path/file.ts:42`
**Categoría**: Seguridad

**Problema**:
```code
// código problemático
```

**Solución**:
```code
// código corregido
```

---

## 🟠 Alto
...

## 🟡 Medio
...

## ⭐ Positivo
- Buen uso de X en `file.ts:20`
- Manejo correcto de Y

---

## Recomendaciones
1. ...
2. ...
```

## Ejemplo

```bash
/review src/components/ProductCard --focus=quality
```

Revisa el componente ProductCard enfocándose en calidad de código.

```bash
/review src/services/ --focus=security
```

Revisa todos los services enfocándose en seguridad.
