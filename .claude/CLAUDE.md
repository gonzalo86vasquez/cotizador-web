# CotizadorWeb - Plataforma de Cotización de Piezas para Molinos SAC

## Descripción del Proyecto

Plataforma web tipo e-commerce (sin pasarela de pago) para la cotización de piezas y repuestos de molinos SAC utilizados en faenas mineras. El sistema permite a los clientes explorar catálogos de productos, seleccionar piezas y generar solicitudes de cotización formales.

**Especificaciones funcionales completas**: `docs/especificaciones_funcionales.md`

---

## Stack Tecnológico

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Lenguaje**: TypeScript (estricto, sin `any`)
- **Estilos**: Tailwind CSS
- **Estado**: Zustand (global), React Query (server state)
- **Validación**: Zod
- **Testing**: Jest, React Testing Library, Cypress

### Backend
- **Framework**: Spring Boot 3.x
- **Lenguaje**: Java 17+
- **ORM**: JPA/Hibernate
- **Migraciones**: Flyway
- **Documentación API**: OpenAPI/Swagger
- **Testing**: JUnit 5, Mockito, TestContainers

### Base de Datos
- **Motor**: MySQL 8.x
- **Charset**: utf8mb4

### Infraestructura
- **Containers**: Docker, Docker Compose
- **CI/CD**: GitHub Actions
- **Cloud**: AWS (EC2, RDS, S3)

---

## Estructura del Proyecto

```
cotizador-web/
├── frontend/                    # Aplicación Next.js
│   ├── src/
│   │   ├── app/                # App Router (páginas)
│   │   ├── components/
│   │   │   ├── ui/            # Componentes base
│   │   │   └── features/      # Componentes de features
│   │   ├── hooks/             # Custom hooks
│   │   ├── lib/               # Utilidades
│   │   ├── services/          # Llamadas a API
│   │   ├── store/             # Zustand stores
│   │   └── types/             # TypeScript types
│   ├── cypress/               # Tests E2E
│   └── package.json
│
├── backend/                    # Aplicación Spring Boot
│   └── src/main/java/com/cotizador/
│       ├── application/       # Casos de uso
│       │   ├── port/
│       │   │   ├── in/       # Interfaces de entrada
│       │   │   └── out/      # Interfaces de salida
│       │   └── service/      # Implementación
│       ├── domain/           # Entidades de dominio
│       │   ├── model/
│       │   └── exception/
│       ├── infrastructure/   # Adaptadores
│       │   ├── adapter/
│       │   │   ├── in/web/  # Controllers
│       │   │   └── out/persistence/
│       │   └── config/
│       └── shared/          # DTOs, mappers
│
├── docker/                   # Dockerfiles
├── .github/workflows/        # CI/CD
├── docs/                     # Documentación
│   └── especificaciones_funcionales.md
└── .claude/                  # Configuración Claude Code
```

---

## Convenciones de Código

### Frontend (TypeScript/React)

#### Componentes
```tsx
// PascalCase para componentes
// Archivo: ProductCard.tsx

interface ProductCardProps {
  product: Product;
  onAddToQuote?: (product: Product) => void;
}

export const ProductCard = memo(function ProductCard({
  product,
  onAddToQuote,
}: ProductCardProps) {
  // hooks primero
  // lógica
  // return JSX
});
```

#### Custom Hooks
```tsx
// camelCase con prefijo "use"
// Archivo: useProducts.ts

export function useProducts(filters: ProductFilters) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => productService.getAll(filters),
  });
}
```

### Backend (Java/Spring)

#### Controllers
```java
@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.findById(id));
    }
}
```

#### Services
```java
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductService {
    private final ProductRepository productRepository;

    public ProductDTO findById(Long id) {
        return productRepository.findById(id)
            .map(productMapper::toDTO)
            .orElseThrow(() -> new ResourceNotFoundException("Product", id));
    }
}
```

### Base de Datos (MySQL)

```sql
-- Tablas: snake_case plural
-- Columnas: snake_case
-- Índices: idx_tabla_columna
-- Foreign keys: fk_tabla_referencia

CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    sku VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    category_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_products_category FOREIGN KEY (category_id) REFERENCES categories(id),
    INDEX idx_products_category (category_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

## Patrones Arquitectónicos

### Backend: Arquitectura Hexagonal
- **Domain**: Entidades y lógica de negocio pura
- **Application**: Casos de uso, puertos de entrada/salida
- **Infrastructure**: Adaptadores (controllers, repositories, configs)

### Frontend: Feature-based
- Componentes organizados por feature
- Custom hooks para lógica reutilizable
- Services para comunicación con API
- Stores para estado global

---

## Comandos de Desarrollo

### Frontend
```bash
cd frontend
npm install          # Instalar dependencias
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run test         # Tests unitarios
npm run test:e2e     # Tests E2E con Cypress
npm run lint         # ESLint
npm run type-check   # TypeScript check
```

### Backend
```bash
cd backend
./mvnw spring-boot:run              # Servidor de desarrollo
./mvnw clean package                # Build JAR
./mvnw test                         # Tests unitarios
./mvnw verify                       # Tests + integración
./mvnw flyway:migrate               # Ejecutar migraciones
```

### Docker
```bash
docker-compose up -d                # Levantar ambiente local
docker-compose down                 # Detener
docker-compose logs -f backend      # Ver logs
```

---

## API Endpoints Principales

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/v1/products` | Listar productos (paginado) |
| GET | `/api/v1/products/{id}` | Detalle de producto |
| GET | `/api/v1/categories` | Listar categorías |
| POST | `/api/v1/quotes` | Crear solicitud de cotización |
| GET | `/api/v1/quotes/{number}` | Detalle de cotización |

**Documentación completa**: `/api/swagger-ui.html`

---

## Variables de Entorno

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### Backend (application.yml)
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/cotizador
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}

jwt:
  secret: ${JWT_SECRET}
  expiration: 900000  # 15 minutos
```

---

## Agentes Disponibles

| Agente | Propósito |
|--------|-----------|
| `tech-lead` | Decisiones técnicas, coordinación |
| `ui-ux-designer` | Diseño de interfaces |
| `frontend-dev` | Desarrollo React/Next.js |
| `backend-dev` | Desarrollo Spring Boot |
| `db-engineer` | Base de datos y migraciones |
| `qa-engineer` | Testing y calidad |
| `devops-engineer` | Docker, CI/CD |
| `code-reviewer` | Revisión de código |
| `security-analyst` | Auditoría de seguridad |
| `api-designer` | Diseño de APIs REST |

---

## Skills Disponibles

| Skill | Comando | Descripción |
|-------|---------|-------------|
| create-component | `/component` | Crear componente React |
| create-api | `/api` | Crear endpoint REST |
| create-entity | `/entity` | Crear entidad JPA |
| create-migration | `/migration` | Crear migración Flyway |
| code-review | `/review` | Revisar código |
| security-audit | `/audit` | Auditoría de seguridad |

---

## Módulos del Sistema

Según especificaciones funcionales:

1. **Catálogo de Productos** - Navegación, búsqueda, fichas de producto
2. **Carrito de Cotización** - Selección de productos, cantidades
3. **Solicitud de Cotización** - Formulario, datos de contacto y entrega
4. **Notificaciones** - Emails de confirmación
5. **Back Office** - Gestión de cotizaciones, catálogo, clientes

---

## Testing

### Cobertura Mínima: 80%

#### Frontend
- Unit tests para componentes y hooks
- Integration tests para features
- E2E tests para flujos críticos (Cypress)

#### Backend
- Unit tests para services
- Integration tests con TestContainers
- API tests con MockMvc

---

## Seguridad

- HTTPS obligatorio (HSTS)
- JWT para autenticación
- Validación de inputs en backend
- Sanitización de outputs
- Headers de seguridad configurados
- Dependencias escaneadas por vulnerabilidades
