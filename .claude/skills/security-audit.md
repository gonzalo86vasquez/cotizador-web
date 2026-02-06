---
name: security-audit
description: Realiza auditoría de seguridad OWASP Top 10 del código
---

# Skill: Security Audit

## Uso
```
/audit [alcance] [--owasp=categorias]
```

## Argumentos
| Argumento | Descripción | Default |
|-----------|-------------|---------|
| alcance | Área a auditar: all, frontend, backend, api | all |
| --owasp | Categorías OWASP: A01,A02,... o all | all |

## OWASP Top 10 (2021)

| ID | Nombre | Qué buscar |
|----|--------|------------|
| A01 | Broken Access Control | Falta de authz, IDOR |
| A02 | Cryptographic Failures | Datos sensibles expuestos |
| A03 | Injection | SQL, XSS, Command injection |
| A04 | Insecure Design | Fallas de diseño |
| A05 | Security Misconfiguration | Config insegura |
| A06 | Vulnerable Components | Deps con CVEs |
| A07 | Auth Failures | Autenticación débil |
| A08 | Data Integrity | Deserialización insegura |
| A09 | Logging Failures | Logs insuficientes |
| A10 | SSRF | Request forgery |

## Proceso

1. **Escanear código** - Buscar patrones vulnerables
2. **Revisar configuración** - Settings de seguridad
3. **Analizar dependencias** - CVEs conocidos
4. **Verificar headers** - Security headers
5. **Generar reporte** - Con remediaciones

## Patrones a Detectar

### Frontend
```typescript
// ❌ XSS
dangerouslySetInnerHTML={{ __html: userInput }}

// ❌ Secrets expuestos
const API_KEY = 'sk-...'

// ❌ Open redirect
router.push(params.redirect)
```

### Backend
```java
// ❌ SQL Injection
"SELECT * FROM users WHERE id = " + id

// ❌ Broken Access Control
return repository.findById(id); // Sin verificar owner

// ❌ Mass Assignment
@RequestBody User user // Binding directo
```

## Formato de Reporte

```markdown
# Security Audit Report

**Fecha**: {fecha}
**Alcance**: {alcance}
**Auditor**: security-analyst

## Resumen Ejecutivo

| Severidad | Cantidad |
|-----------|----------|
| 🔴 Crítica | X |
| 🟠 Alta | X |
| 🟡 Media | X |
| 🟢 Baja | X |

**Score de Riesgo**: X/10

---

## Vulnerabilidades

### [CRÍTICA] {Título}

**ID**: SEC-{N}
**OWASP**: A0X - {Categoría}
**CVSS**: X.X

**Ubicación**: `path/file.java:42`

**Descripción**:
{Qué es el problema}

**Código Vulnerable**:
```code
{código actual}
```

**Impacto**:
- {consecuencia 1}
- {consecuencia 2}

**Remediación**:
```code
{código corregido}
```

**Referencias**:
- {link OWASP}
- {link CWE}

---

## Dependencias Vulnerables

| Paquete | Versión | CVE | Severidad | Fix |
|---------|---------|-----|-----------|-----|
| ... | ... | ... | ... | ... |

## Configuración de Seguridad

### Headers ✅/❌
- [ ] Content-Security-Policy
- [ ] X-Frame-Options
- [ ] Strict-Transport-Security
- [ ] X-Content-Type-Options

### Autenticación ✅/❌
- [ ] JWT con expiración corta
- [ ] Refresh token rotation
- [ ] Rate limiting

---

## Recomendaciones

1. {Recomendación prioritaria}
2. {Siguiente acción}
```

## Comandos de Verificación

```bash
# NPM audit
npm audit --production

# OWASP Dependency Check (Maven)
./mvnw org.owasp:dependency-check-maven:check

# Buscar secrets
git secrets --scan
```

## Ejemplo

```bash
/audit backend --owasp=A01,A03,A07
```

Audita el backend enfocándose en Access Control, Injection y Authentication.
