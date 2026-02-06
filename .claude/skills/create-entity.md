---
name: create-entity
description: Crea entidad JPA con Repository y migración Flyway correspondiente
---

# Skill: Crear Entidad JPA

## Uso
```
/entity NombreEntidad [campo:tipo ...] [--timestamps]
```

## Argumentos
| Argumento | Descripción | Default |
|-----------|-------------|---------|
| nombre | Nombre de la entidad (PascalCase, singular) | Requerido |
| campos | Lista de campo:tipo (ej: name:string, price:decimal) | Opcional |
| --timestamps | Incluir created_at y updated_at | true |

## Tipos Soportados
| Tipo | Java | MySQL |
|------|------|-------|
| string | String | VARCHAR(255) |
| text | String | TEXT |
| int | Integer | INT |
| long | Long | BIGINT |
| decimal | BigDecimal | DECIMAL(10,2) |
| boolean | Boolean | BOOLEAN |
| date | LocalDate | DATE |
| datetime | LocalDateTime | TIMESTAMP |
| json | Map<String,Object> | JSON |

## Proceso

1. **Parsear campos** - Extraer nombre y tipo
2. **Generar Entity** - Clase JPA con anotaciones
3. **Generar Repository** - Interface JpaRepository
4. **Generar Migración** - Script Flyway versionado

## Archivos Generados

### Entity
```java
// domain/model/{Nombre}.java
@Entity
@Table(name = "{nombres}")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class {Nombre} {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String campo1;

    @Column(columnDefinition = "TEXT")
    private String campo2;

    @Column(precision = 10, scale = 2)
    private BigDecimal precio;

    @Column(name = "is_active", nullable = false)
    private Boolean active = true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private ParentEntity parent;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<ChildEntity> children = new ArrayList<>();

    @Column(name = "created_at", nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // Domain methods
    public void activate() {
        this.active = true;
    }

    public void deactivate() {
        this.active = false;
    }
}
```

### Repository
```java
// infrastructure/adapter/out/persistence/{Nombre}Repository.java
public interface {Nombre}Repository extends JpaRepository<{Nombre}, Long> {

    Optional<{Nombre}> findByNombreAndActiveTrue(String nombre);

    @Query("""
            SELECT e FROM {Nombre} e
            WHERE e.active = true
            AND (:search IS NULL OR LOWER(e.name) LIKE LOWER(CONCAT('%', :search, '%')))
            """)
    Page<{Nombre}> findWithFilters(@Param("search") String search, Pageable pageable);

    boolean existsByNombre(String nombre);
}
```

### Migración Flyway
```sql
-- V{version}__create_{nombres}_table.sql
CREATE TABLE {nombres} (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    campo1 VARCHAR(255) NOT NULL,
    campo2 TEXT,
    precio DECIMAL(10,2),
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    parent_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_{nombres}_parent
        FOREIGN KEY (parent_id) REFERENCES parent_table(id)
        ON DELETE SET NULL,

    INDEX idx_{nombres}_active (is_active),
    INDEX idx_{nombres}_parent (parent_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

## Ejemplo

```bash
/entity Product sku:string name:string description:text price:decimal categoryId:long:fk
```

Genera:
- `domain/model/Product.java` - Entidad JPA
- `infrastructure/adapter/out/persistence/ProductRepository.java` - Repository
- `V{N}__create_products_table.sql` - Migración

## Relaciones

Para agregar relaciones, usar el formato `campo:tipo:relacion`:

```bash
/entity QuoteItem productId:long:fk quoteId:long:fk quantity:int notes:text
```

Esto genera:
- Foreign keys a Product y Quote
- Índices en las columnas FK
- Anotaciones @ManyToOne en la entidad
