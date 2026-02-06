---
name: create-api
description: Genera endpoint REST completo con Controller, Service, Repository, DTO y tests
---

# Skill: Crear API Endpoint

## Uso
```
/api NombreRecurso [--crud] [--readonly]
```

## Argumentos
| Argumento | Descripción | Default |
|-----------|-------------|---------|
| nombre | Nombre del recurso (singular, PascalCase) | Requerido |
| --crud | Genera CRUD completo (GET, POST, PUT, DELETE) | true |
| --readonly | Solo genera GET (list y detail) | false |

## Proceso

1. **Validar nombre** - Singular, PascalCase
2. **Generar estructura hexagonal**:
   - Controller (adapter in)
   - Service + UseCase interface (application)
   - Repository interface (port out)
   - DTO Request/Response
   - Tests

## Archivos Generados

### Controller
```java
// infrastructure/adapter/in/web/{Nombre}Controller.java
@RestController
@RequestMapping("/api/v1/{nombres}")
@RequiredArgsConstructor
@Tag(name = "{Nombres}", description = "API de {nombres}")
public class {Nombre}Controller {

    private final {Nombre}Service {nombre}Service;

    @GetMapping
    @Operation(summary = "Listar {nombres}")
    public ResponseEntity<Page<{Nombre}DTO>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok({nombre}Service.findAll(PageRequest.of(page, size)));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener {nombre} por ID")
    public ResponseEntity<{Nombre}DTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok({nombre}Service.findById(id));
    }

    @PostMapping
    @Operation(summary = "Crear {nombre}")
    public ResponseEntity<{Nombre}DTO> create(
            @Valid @RequestBody Create{Nombre}Request request) {
        var created = {nombre}Service.create(request);
        return ResponseEntity
                .created(URI.create("/api/v1/{nombres}/" + created.id()))
                .body(created);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar {nombre}")
    public ResponseEntity<{Nombre}DTO> update(
            @PathVariable Long id,
            @Valid @RequestBody Update{Nombre}Request request) {
        return ResponseEntity.ok({nombre}Service.update(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar {nombre}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        {nombre}Service.delete(id);
    }
}
```

### Service
```java
// application/service/{Nombre}Service.java
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class {Nombre}Service implements {Nombre}UseCase {

    private final {Nombre}Repository {nombre}Repository;
    private final {Nombre}Mapper {nombre}Mapper;

    @Override
    public Page<{Nombre}DTO> findAll(Pageable pageable) {
        return {nombre}Repository.findAll(pageable)
                .map({nombre}Mapper::toDTO);
    }

    @Override
    public {Nombre}DTO findById(Long id) {
        return {nombre}Repository.findById(id)
                .map({nombre}Mapper::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException("{Nombre}", id));
    }

    @Override
    @Transactional
    public {Nombre}DTO create(Create{Nombre}Request request) {
        var entity = {nombre}Mapper.toEntity(request);
        return {nombre}Mapper.toDTO({nombre}Repository.save(entity));
    }

    @Override
    @Transactional
    public {Nombre}DTO update(Long id, Update{Nombre}Request request) {
        var entity = {nombre}Repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("{Nombre}", id));
        {nombre}Mapper.updateEntity(entity, request);
        return {nombre}Mapper.toDTO({nombre}Repository.save(entity));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!{nombre}Repository.existsById(id)) {
            throw new ResourceNotFoundException("{Nombre}", id);
        }
        {nombre}Repository.deleteById(id);
    }
}
```

### DTOs
```java
// shared/dto/{Nombre}DTO.java
public record {Nombre}DTO(
        Long id,
        // campos
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {}

// shared/dto/Create{Nombre}Request.java
public record Create{Nombre}Request(
        @NotBlank(message = "Campo requerido")
        String campo
        // más campos
) {}

// shared/dto/Update{Nombre}Request.java
public record Update{Nombre}Request(
        @NotBlank(message = "Campo requerido")
        String campo
        // más campos
) {}
```

### Repository
```java
// application/port/out/{Nombre}Repository.java
public interface {Nombre}Repository extends JpaRepository<{Nombre}, Long> {
    // Custom queries
}
```

### Test
```java
// application/service/{Nombre}ServiceTest.java
@ExtendWith(MockitoExtension.class)
class {Nombre}ServiceTest {

    @Mock
    private {Nombre}Repository {nombre}Repository;

    @Mock
    private {Nombre}Mapper {nombre}Mapper;

    @InjectMocks
    private {Nombre}Service {nombre}Service;

    @Test
    void shouldReturnAllPaginated() {
        // Given
        var pageable = PageRequest.of(0, 10);
        var entities = List.of(new {Nombre}());
        var page = new PageImpl<>(entities, pageable, 1);

        when({nombre}Repository.findAll(pageable)).thenReturn(page);
        when({nombre}Mapper.toDTO(any())).thenReturn(mock({Nombre}DTO.class));

        // When
        var result = {nombre}Service.findAll(pageable);

        // Then
        assertThat(result.getContent()).hasSize(1);
    }

    @Test
    void shouldThrowWhenNotFound() {
        // Given
        when({nombre}Repository.findById(999L)).thenReturn(Optional.empty());

        // When/Then
        assertThatThrownBy(() -> {nombre}Service.findById(999L))
                .isInstanceOf(ResourceNotFoundException.class);
    }
}
```

## Ejemplo

```bash
/api Product --crud
```

Genera estructura completa para el recurso Product con todos los endpoints CRUD.
