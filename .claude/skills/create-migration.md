---
name: create-migration
description: Genera script de migración Flyway con versionado automático
---

# Skill: Crear Migración Flyway

## Uso
```
/migration "descripcion de la migracion" [--type=tipo]
```

## Argumentos
| Argumento | Descripción | Default |
|-----------|-------------|---------|
| descripción | Descripción de la migración | Requerido |
| --type | Tipo: create, alter, add_index, add_column, drop | create |

## Proceso

1. **Obtener versión** - Lee última migración y suma 1
2. **Generar nombre** - `V{version}__{descripcion_snake_case}.sql`
3. **Crear template** - Según tipo de migración
4. **Ubicar archivo** - `src/main/resources/db/migration/`

## Templates por Tipo

### create - Crear tabla
```sql
-- V{version}__create_{tabla}_table.sql
CREATE TABLE {tabla} (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    -- columnas aquí
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Índices
CREATE INDEX idx_{tabla}_{columna} ON {tabla}({columna});
```

### alter - Modificar tabla
```sql
-- V{version}__alter_{tabla}_{cambio}.sql
ALTER TABLE {tabla}
    ADD COLUMN nueva_columna VARCHAR(255),
    MODIFY COLUMN columna_existente TEXT,
    DROP COLUMN columna_obsoleta;
```

### add_column - Agregar columna
```sql
-- V{version}__add_{columna}_to_{tabla}.sql
ALTER TABLE {tabla}
ADD COLUMN {columna} {tipo} {constraints};

-- Actualizar registros existentes si necesario
UPDATE {tabla} SET {columna} = {valor_default} WHERE {columna} IS NULL;

-- Agregar constraint NOT NULL después de poblar
ALTER TABLE {tabla}
MODIFY COLUMN {columna} {tipo} NOT NULL;
```

### add_index - Agregar índice
```sql
-- V{version}__add_index_{tabla}_{columnas}.sql

-- Índice simple
CREATE INDEX idx_{tabla}_{columna} ON {tabla}({columna});

-- Índice compuesto
CREATE INDEX idx_{tabla}_{col1}_{col2} ON {tabla}({col1}, {col2});

-- Índice único
CREATE UNIQUE INDEX uk_{tabla}_{columna} ON {tabla}({columna});

-- Índice fulltext
CREATE FULLTEXT INDEX ft_{tabla}_{columna} ON {tabla}({columna});
```

### add_fk - Agregar foreign key
```sql
-- V{version}__add_fk_{tabla}_{referencia}.sql

-- Agregar columna si no existe
ALTER TABLE {tabla}
ADD COLUMN {referencia}_id BIGINT;

-- Agregar constraint
ALTER TABLE {tabla}
ADD CONSTRAINT fk_{tabla}_{referencia}
    FOREIGN KEY ({referencia}_id) REFERENCES {referencia}(id)
    ON DELETE {accion};

-- Agregar índice para performance
CREATE INDEX idx_{tabla}_{referencia} ON {tabla}({referencia}_id);
```

### drop - Eliminar
```sql
-- V{version}__drop_{elemento}.sql

-- Eliminar índice
DROP INDEX idx_{tabla}_{columna} ON {tabla};

-- Eliminar foreign key
ALTER TABLE {tabla}
DROP FOREIGN KEY fk_{tabla}_{referencia};

-- Eliminar columna
ALTER TABLE {tabla}
DROP COLUMN {columna};

-- Eliminar tabla (cuidado!)
DROP TABLE IF EXISTS {tabla};
```

### seed - Datos iniciales
```sql
-- V{version}__seed_{tabla}_data.sql

INSERT INTO {tabla} (columna1, columna2) VALUES
    ('valor1', 'valor2'),
    ('valor3', 'valor4');
```

## Convenciones

### Nomenclatura
- Tablas: `snake_case` plural (`products`, `quote_items`)
- Columnas: `snake_case` (`created_at`, `user_id`)
- Índices: `idx_{tabla}_{columna}`
- Unique: `uk_{tabla}_{columna}`
- Foreign Key: `fk_{tabla}_{referencia}`

### Tipos de Datos Recomendados
| Dato | Tipo MySQL | Notas |
|------|------------|-------|
| ID | BIGINT | AUTO_INCREMENT |
| String corto | VARCHAR(N) | N <= 255 |
| String largo | TEXT | Sin límite |
| Dinero | DECIMAL(10,2) | Precisión fija |
| Fecha | DATE | Sin hora |
| Fecha+hora | TIMESTAMP | Con timezone |
| Boolean | BOOLEAN | TRUE/FALSE |
| JSON | JSON | MySQL 5.7+ |
| Enum | ENUM('a','b') | Valores fijos |

## Ejemplo

```bash
/migration "agregar campo urgencia a cotizaciones" --type=add_column
```

Genera:
```sql
-- V8__add_urgency_to_quotes.sql
ALTER TABLE quotes
ADD COLUMN urgency ENUM('normal', 'urgent') DEFAULT 'normal';

CREATE INDEX idx_quotes_urgency ON quotes(urgency);
```

## Rollback (Documentación)

Flyway no tiene rollback automático. Documentar rollback manual:

```sql
-- V{version}__add_feature.sql
-- ROLLBACK: ALTER TABLE x DROP COLUMN y;

ALTER TABLE x ADD COLUMN y VARCHAR(255);
```
