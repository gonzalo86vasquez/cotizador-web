# ESPECIFICACIONES FUNCIONALES
## Plataforma de Cotización de Piezas para Molinos SAC

---

## 1. RESUMEN EJECUTIVO

### 1.1 Descripción del Proyecto
Plataforma web tipo e-commerce (sin pasarela de pago) para la cotización de piezas y repuestos de molinos SAC utilizados en faenas mineras. El sistema permitirá a los clientes explorar catálogos de productos, seleccionar piezas y generar solicitudes de cotización formales.

### 1.2 Objetivo General
Digitalizar y agilizar el proceso de cotización de piezas para molinos SAC, mejorando la experiencia del cliente y la eficiencia operativa del equipo comercial.

### 1.3 Alcance
- Catálogo digital de piezas y repuestos
- Sistema de carrito de cotización
- Gestión de solicitudes de cotización
- Sistema de notificaciones por correo electrónico
- Panel administrativo (back office)

---

## 2. USUARIOS DEL SISTEMA

### 2.1 Cliente (Usuario Final)
- Personal de mantenimiento de faenas mineras
- Ingenieros de planta
- Encargados de abastecimiento
- Compradores corporativos

### 2.2 Ejecutivo Comercial (Back Office)
**Nota**: El sistema contempla un único rol de ejecutivo vendedor que gestiona todas las solicitudes.

- Recibe y procesa solicitudes de cotización
- Gestiona catálogo de productos
- Administra información de clientes

### 2.3 Administrador del Sistema
- Gestión completa de usuarios
- Configuración de la plataforma
- Acceso a reportes y métricas

---

## 3. FUNCIONALIDADES PRINCIPALES

### 3.1 MÓDULO DE CATÁLOGO DE PRODUCTOS

#### 3.1.1 Navegación y Búsqueda
- **Categorías de productos**: Organización jerárquica por tipo de pieza/componente
- **Filtros de búsqueda**:
  - Por modelo de molino SAC
  - Por tipo de pieza
  - Por código de parte (part number)
  - Por disponibilidad
- **Búsqueda inteligente**: Por texto libre, código o descripción
- **Vista de productos**: Grid y lista

#### 3.1.2 Ficha de Producto
Cada pieza debe mostrar:
- Nombre y descripción técnica
- Código de parte / SKU
- Imágenes del producto (múltiples vistas)
- Especificaciones técnicas
- Modelos de molino compatibles
- Disponibilidad (en stock / bajo pedido)
- Tiempo estimado de entrega
- Documentación técnica (fichas, manuales en PDF)
- Productos relacionados o alternativos

### 3.2 MÓDULO DE SELECCIÓN DE PRODUCTOS (CARRITO)

**Nomenclatura en revisión**: Este módulo actualmente se referencia como "carrito de cotización", pero el término podría generar confusión con un carrito de compras tradicional. Ver sección de "Preguntas Pendientes" para alternativas sugeridas.

#### 3.2.1 Funcionalidades del Módulo de Selección
- Agregar/eliminar productos
- Modificar cantidades
- Ver subtotal por producto
- Guardar carrito para continuar después
- Añadir notas o comentarios por producto
- Exportar carrito a PDF
- Compartir carrito por enlace (opcional)

#### 3.2.2 Información Requerida por Producto
- Cantidad solicitada
- Urgencia (normal / urgente)
- Notas adicionales del cliente
- Especificaciones particulares si aplica

### 3.3 PROCESO DE COTIZACIÓN

#### 3.3.1 Formulario de Solicitud
Al finalizar el carrito, el cliente debe completar:

**Información de Contacto:**
- Nombre completo
- Empresa/Faena minera
- Cargo
- Email
- Teléfono
- RUT de empresa

**Información de Entrega:**
- Dirección de entrega
- Comuna/Ciudad
- Región
- Contacto en sitio

**Detalles de la Solicitud:**
- Fecha requerida de entrega
- Proyecto asociado (opcional)
- Centro de costo (opcional)
- Observaciones generales
- Preferencia de contacto (email/teléfono)

#### 3.3.2 Confirmación y Envío
- Resumen completo de la solicitud
- Número de cotización generado automáticamente (formato: COT-YYYY-MM-NNNN)
- Términos y condiciones (opcional)
- Botón de confirmación final

### 3.4 SISTEMA DE NOTIFICACIONES

#### 3.4.1 Email al Cliente
**Asunto:** Confirmación de Solicitud de Cotización #[NÚMERO]

**Contenido:**
- Agradecimiento
- Número de cotización
- Resumen de productos solicitados
- Datos de contacto ingresados
- Tiempo estimado de respuesta
- Datos de contacto del ejecutivo asignado
- PDF adjunto con detalle completo

#### 3.4.2 Email al Ejecutivo Comercial
**Asunto:** Nueva Solicitud de Cotización #[NÚMERO] - [EMPRESA]

**Contenido:**
- Alert de nueva solicitud
- Datos del cliente y empresa
- Resumen de productos (con enlaces al catálogo interno)
- Nivel de urgencia
- Enlace directo al back office para gestionar
- PDF adjunto con detalle completo

#### 3.4.3 Emails Adicionales (Futuras Fases)
- Cotización enviada al cliente
- Seguimiento de cotización
- Recordatorios automáticos

### 3.5 PANEL ADMINISTRATIVO (BACK OFFICE)

#### 3.5.1 Gestión de Cotizaciones
- **Dashboard**: Vista general de solicitudes
  - Nuevas (sin revisar)
  - En proceso
  - Cotizadas
  - Aprobadas
  - Rechazadas/Vencidas
  
- **Detalle de Solicitud**:
  - Información completa del cliente
  - Lista de productos solicitados
  - Historial de interacciones
  - Cambio de estado
  - Adjuntar cotización formal (PDF)
  - Agregar notas internas
  
- **Búsqueda y filtros**:
  - Por número de cotización
  - Por cliente/empresa
  - Por fecha
  - Por estado

#### 3.5.2 Gestión de Catálogo
- Crear/editar/eliminar productos
- Carga masiva de productos (CSV/Excel)
- Gestión de imágenes
- Categorización
- Control de disponibilidad (flag "Disponible para cotizar")
- Activar/desactivar productos

#### 3.5.3 Gestión de Clientes
- Base de datos de clientes
- Historial de cotizaciones por cliente
- Notas y observaciones
- Contactos múltiples por empresa
- Segmentación

#### 3.5.4 Reportes y Métricas
- Cotizaciones por período
- Productos más solicitados
- Tasa de conversión
- Tiempo promedio de respuesta
- Clientes más activos

---

## 4. FLUJO DE USUARIO COMPLETO

### 4.1 Flujo del Cliente

```
1. Ingreso a la plataforma
   ↓
2. Navegación por catálogo / Búsqueda de productos
   ↓
3. Vista de ficha de producto
   ↓
4. Agregar productos a lista de cotización
   ↓
5. Revisión de productos seleccionados
   ↓
6. Completar/confirmar datos de solicitud
   ↓
7. Confirmar solicitud de cotización
   ↓
8. Recibir confirmación por email
   ↓
9. Esperar respuesta del ejecutivo
```

### 4.2 Flujo del Ejecutivo

```
1. Recibir notificación de nueva solicitud
   ↓
2. Acceder al back office
   ↓
3. Revisar detalle de la solicitud
   ↓
4. Verificar disponibilidad de productos
   ↓
5. Preparar cotización formal
   ↓
6. Enviar cotización al cliente (desde el sistema o externo)
   ↓
7. Actualizar estado en el sistema
   ↓
8. Hacer seguimiento
```

---

## 5. REQUERIMIENTOS TÉCNICOS

### 5.1 Requerimientos Funcionales

#### Frontend (Cliente)
- **Framework**: React JS o Next.js
- Responsive design (móvil, tablet, desktop)
- Navegación intuitiva
- Carga rápida de imágenes
- Compatibilidad cross-browser
- Accesibilidad básica (WCAG 2.0 nivel AA)

#### Backend
- **Framework**: Spring Boot (Java)
- API RESTful
- Sistema de autenticación (opcional para clientes, obligatorio para back office)
- Gestión de sesiones
- Generación de PDFs automática
- Sistema de logs de actividad

#### Base de Datos
- **Motor**: MySQL
- Productos/Piezas
- Categorías
- Cotizaciones
- Clientes
- Usuarios del sistema
- Configuraciones

### 5.2 Integraciones Necesarias

- **Servicio de Email**: 
  - SendGrid, Amazon SES, o similar
  - Templates HTML para emails
  - Gestión de colas

- **Almacenamiento de Archivos**:
  - Imágenes de productos
  - PDFs técnicos
  - Documentos adjuntos
  - Amazon S3, Cloudinary, o similar

- **Generación de PDFs**:
  - Librería para cotizaciones
  - Templates personalizables

### 5.3 Seguridad
- Certificado SSL (HTTPS)
- Protección contra XSS y SQL injection
- Rate limiting en APIs
- Backup automático de base de datos
- Logs de auditoría

### 5.4 Performance
- Tiempo de carga < 3 segundos
- Optimización de imágenes (lazy loading)
- Caché de productos
- CDN para contenido estático

---

## 6. CASOS DE USO PRINCIPALES

### Caso de Uso 1: Cliente solicita cotización de piezas urgentes

**Actor**: Cliente de faena minera  
**Precondición**: El cliente necesita piezas con urgencia  
**Flujo**:
1. Accede a la plataforma
2. Busca "revestimientos molino SAC 5000"
3. Selecciona 3 productos del catálogo
4. Añade al carrito con cantidad: 10, 5, 8 respectivamente
5. Marca como "urgente" en el carrito
6. Completa formulario con datos de la faena
7. Agrega nota: "Necesario para mantenimiento programado semana próxima"
8. Confirma solicitud
9. Recibe email de confirmación inmediato
10. Ejecutivo recibe alerta y responde en menos de 2 horas

**Postcondición**: Cotización COT-2025-02-0123 creada y en proceso

### Caso de Uso 2: Ejecutivo gestiona cotizaciones del día

**Actor**: Ejecutivo comercial  
**Precondición**: Hay 5 solicitudes nuevas en el sistema  
**Flujo**:
1. Ingresa al back office
2. Ve dashboard con 5 solicitudes nuevas
3. Ordena por urgencia y fecha
4. Abre la más urgente
5. Revisa productos solicitados
6. Verifica disponibilidad (internamente o en sistema externo si existe integración)
7. Prepara cotización formal
8. Marca como "cotizada" y adjunta PDF
9. Sistema envía email automático al cliente
10. Pasa a la siguiente solicitud

**Postcondición**: Solicitud procesada y cliente notificado

### Caso de Uso 3: Cliente guarda selección para continuar después

**Actor**: Cliente  
**Precondición**: Cliente está explorando productos pero no está listo para cotizar  
**Flujo**:
1. Navega por catálogo
2. Agrega 8 productos a su lista de cotización
3. Necesita consultar con su supervisor
4. Cierra navegador
5. Regresa al día siguiente
6. Accede a la plataforma
7. Su selección se mantiene guardada (por cookie o sesión)
8. Completa la solicitud

**Postcondición**: El cliente puede continuar su proceso sin perder información

---

## 7. MODELO DE DATOS BÁSICO

### Entidades Principales

#### Producto
- ID
- SKU / Código de parte
- Nombre
- Descripción
- Categoría_ID
- Imágenes[]
- Especificaciones_técnicas (JSON)
- Modelos_compatibles[]
- Disponible_para_cotizar (boolean) - flag simple de disponibilidad
- Tiempo_entrega_estimado
- Activo (boolean)
- Fecha_creación
- Fecha_actualización

**Nota sobre disponibilidad**: El campo "Disponible_para_cotizar" es un flag simple que indica si el producto está activo para recibir solicitudes de cotización. No se contempla gestión de stock detallado dentro del journey de cotización (ver Preguntas Pendientes para validación).

#### Categoría
- ID
- Nombre
- Descripción
- Categoría_padre_ID (para jerarquía)
- Orden

#### Cotización
- ID
- Número_cotización (COT-YYYY-MM-NNNN)
- Cliente_ID
- Estado (nueva, en_proceso, cotizada, aprobada, rechazada)
- Fecha_solicitud
- Fecha_requerida
- Urgencia (normal, urgente)
- Observaciones_cliente
- Observaciones_internas
- Items[] (relación con Cotización_Item)
- Total_items
- Datos_contacto (JSON)
- Datos_entrega (JSON)

**Nota**: No se incluye campo de ejecutivo asignado ya que existe un único rol de ejecutivo vendedor que gestiona todas las solicitudes.

#### Cotización_Item
- ID
- Cotización_ID
- Producto_ID
- Cantidad
- Notas
- Orden

#### Cliente
- ID
- Empresa
- RUT
- Nombre_contacto
- Email
- Teléfono
- Dirección
- Ciudad
- Región
- Historial_cotizaciones[]
- Fecha_registro

#### Usuario (Back Office)
- ID
- Nombre
- Email
- Rol (ejecutivo, administrador)
- Activo
- Última_sesión

---

## 8. CONSIDERACIONES ADICIONALES

### 9.1 UX/UI
- **Inspiración**: Mercado Libre, Amazon Business, Grainger (distribuidores industriales)
- **Colores**: Profesional, confiable (azules, grises, acentos corporativos)
- **Tipografía**: Clara y legible
- **Imágenes**: Alta calidad, múltiples ángulos, zoom

### 9.2 Contenido
- Descripciones técnicas precisas
- Especificaciones estandarizadas
- Imágenes profesionales de cada pieza
- Manuales y fichas técnicas descargables
- Videos demostrativos (futuro)

### 9.3 SEO (Opcional)
- URLs amigables
- Meta descripciones
- Schema markup para productos
- Sitemap XML

### 9.4 Métricas de Éxito
- Número de cotizaciones generadas/mes
- Tiempo promedio de respuesta del ejecutivo
- Tasa de conversión (cotización → venta)
- Satisfacción del cliente (encuestas)
- Productos más solicitados
- Reducción de tiempo en proceso de cotización vs. método anterior

### 9.5 Soporte y Mantenimiento
- Documentación técnica
- Manual de usuario (cliente)
- Manual de usuario (back office)
- Plan de capacitación
- Soporte técnico

---

## 8. PREGUNTAS PENDIENTES / VALIDACIONES

### Algunas dudas para validar:

#### Gestión de Clientes y Autenticación

1. **Formulario de solicitud - Datos del cliente**:
   - Los datos de contacto, empresa, RUT, dirección, etc. ¿deberían completarse al momento de registrar/dar de alta al cliente en el sistema?
   - ¿Al momento de solicitar cotización solo se muestran estos datos pre-cargados para confirmación?
   - ¿Con un checkbox tipo "los datos de entrega son diferentes" se despliega un formulario adicional para ingresar datos alternativos?

#### Precios e Inventario

2. **Gestión de precios**:
   - ¿Se mostrarán precios referenciales o todo va a cotización?
   - ¿Precios diferenciados por cliente?

3. **Gestión de stock y disponibilidad**:
   - ¿Es necesario contar con control de stock del producto dentro del journey de cotización?
   - ¿Sería suficiente con un flag simple de "Disponible para cotizar" / "No disponible para cotizar"?
   - ¿O simplemente todos los productos en catálogo están disponibles para cotizar por defecto?
   - ¿Se debe mostrar información de disponibilidad estimada (ej: "En stock", "Bajo pedido", "Tiempo de entrega: 15 días")?

#### Nomenclatura y Experiencia de Usuario

4. **Nombre del "Carrito de Cotización"**:
   El término "carrito de cotización" puede generar confusión con un carrito de compras tradicional. Alternativas sugeridas:
   - "Solicitud de cotización"
   - "Lista de cotización"
   - "Mi cotización"
   - "Productos a cotizar"
   - "Pedido de cotización"
   - "Requisición de cotización"
   
   ¿Cuál resuena mejor con el lenguaje que usan tus clientes mineros?

#### Seguimiento y Proceso Post-Cotización

5. **Seguimiento post-cotización**:
   - ¿El cliente puede aceptar/rechazar desde la plataforma?
   - ¿Se hace seguimiento de órdenes de compra?
   - ¿La gestión comercial posterior a la cotización se maneja fuera del sistema?

#### Configuración General

6. **Moneda**:
   - ¿CLP, USD, o múltiples monedas?

---

## 9. GLOSARIO

- **Molino SAC**: Tipo específico de molino utilizado en procesos de molienda en minería
- **Faena minera**: Sitio o lugar donde se realizan operaciones mineras
- **SKU**: Stock Keeping Unit - código único de producto
- **Back office**: Panel administrativo de gestión interna
- **Solicitud de cotización**: Proceso mediante el cual un cliente selecciona productos y solicita información de precios y condiciones comerciales (sin compromiso de compra)
- **Lista de cotización**: Conjunto de productos seleccionados por el cliente para ser cotizados
- **MVP**: Minimum Viable Product - Producto Mínimo Viable
- **Journey de cotización**: Recorrido completo del usuario desde que ingresa a la plataforma hasta que genera la solicitud de cotización

---

**Documento creado**: Febrero 2025  
**Versión**: 1.0  
**Estado**: Borrador para validación

