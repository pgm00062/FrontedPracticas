# 🚀 Guía Completa: Conectar Frontend Next.js con Microservicios Client y Merchant

## ✅ Estado Actual
✅ Frontend Next.js configurado con TypeScript y Tailwind  
✅ React Query instalado y configurado  
✅ Axios configurado con interceptores JWT  
✅ Componente TestConnection creado y funcionando  
✅ Servicios específicos para Client y Merchant implementados  
✅ Variables de entorno configuradas correctamente  
✅ Sistema compilando sin errores  
✅ Tipos TypeScript actualizados para MerchantDynamoEntity y ClientDynamoEntity  
✅ Enum MerchantType definido correctamente  
✅ Endpoints de Client actualizados según tu ClientController real  
✅ ClientService actualizado con métodos específicos de tu API  
✅ Endpoints de Merchant actualizados según tu MerchantController real  
✅ MerchantService actualizado con métodos específicos de tu API  
✅ **CONECTIVIDAD BÁSICA FUNCIONANDO PERFECTAMENTE**  
✅ **Health checks operativos en ambos microservicios**  

## 🏗️ Tu Arquitectura de Microservicios
- **Client Service:** http://localhost:8080
- **Merchant Service:** http://localhost:8081

## 🔧 Configuración del Backend Spring Boot

### 1. Añadir CORS Configuration a AMBOS microservicios
Copia el archivo `docs/CorsConfig.java` a cada proyecto Spring Boot:
```
src/main/java/com/tupackage/config/CorsConfig.java
```

### 2. Añadir Endpoint de Health Check a AMBOS microservicios

**📁 Los archivos están listos en tu carpeta `docs/`:**
- `docs/HealthController-Client.java` - Para Client Service (puerto 8080)
- `docs/HealthController-Merchant.java` - Para Merchant Service (puerto 8081)

**Para Client Service (puerto 8080):**
1. Copia `docs/HealthController-Client.java` a tu proyecto Client
2. Ubicación: `src/main/java/com/tupackage/controller/HealthController.java`
3. **Cambia `com.tupackage` por el package real de tu proyecto**

**Para Merchant Service (puerto 8081):**
1. Copia `docs/HealthController-Merchant.java` a tu proyecto Merchant  
2. Ubicación: `src/main/java/com/tupackage/controller/HealthController.java`
3. **Cambia `com.tupackage` por el package real de tu proyecto**

**Código de ejemplo:**
```java
// Para Client Service
@RestController
public class HealthController {
    @GetMapping("/health")
    public String health() {
        return "OK - Client Service funcionando en puerto 8080";
    }
}

// Para Merchant Service
@RestController
public class HealthController {
    @GetMapping("/health")
    public String health() {
        return "OK - Merchant Service funcionando en puerto 8081";
    }
}
```

## 🚀 Ejecutar y Probar

### 1. Iniciar tus Microservicios Spring Boot
```bash
# En tu proyecto Client Service
./mvnw spring-boot:run

# En tu proyecto Merchant Service  
./mvnw spring-boot:run
```

### 2. Iniciar Frontend
```bash
npm run dev
```
La aplicación estará disponible en: http://localhost:3000

### 3. Probar Conexión
1. **Abre tu navegador** en http://localhost:3000
2. **Haz clic en "Test Client Service"** - debería mostrar ✅ si está funcionando
3. **Haz clic en "Test Merchant Service"** - debería mostrar ✅ si está funcionando

## 📁 Estructura de Archivos Actualizada

```
src/
├── common/
│   ├── components/
│   │   ├── TestConnection/
│   │   │   └── index.tsx          # ✅ Componente de prueba funcionando
│   │   └── UserManagement/
│   │       └── index.tsx          # 🚧 Simplificado, en desarrollo
│   ├── hooks/
│   │   ├── useApi.ts              # ✅ Redirige a useClientMerchantApi
│   │   └── useClientMerchantApi.ts # ✅ Hooks específicos implementados
│   ├── providers/
│   │   └── ReactQueryProvider.tsx # ✅ Configurado
│   └── utils/
│       ├── apiConfig.ts           # ✅ Endpoints Client/Merchant
│       └── httpClient.ts          # ✅ Clientes específicos
├── service/
│   └── src/
│       ├── userService.ts         # ✅ Redirige a clientMerchantService
│       └── clientMerchantService.ts # ✅ Servicios específicos
└── app/
    ├── layout.tsx                 # ✅ Con React Query Provider
    └── page.tsx                   # ✅ Usando TestConnection
```

## 🔄 Próximos Pasos

### PASO 1: Verificar Conexión Básica ✅
- [x] TestConnection funcionando
- [x] Variables de entorno configuradas
- [x] Servicios compilando sin errores

### PASO 2: Endpoints Actualizados ✅
Los endpoints de Client ya están actualizados según tu ClientController:

```typescript
export const API_ENDPOINTS = {
  CLIENTS: {
    CREATE: '/clients',                                 // POST - Crear cliente
    GET_BY_ID: (id) => `/clients/${id}`,               // GET - Obtener cliente
    GET_BY_ID_SIMPLE: (id) => `/clients/${id}?simpleOutput=true`, // GET - Cliente simple
    GET_BY_EMAIL: '/clients/email',                    // GET - Buscar por email (?email=...)
    FIND_BY_NAME: '/clients/name',                     // GET - Buscar por nombre (?name=...)
    UPDATE: (id) => `/clients/${id}`,                  // PUT - Actualizar cliente
    MERCHANT_EXISTS: (id) => `/clients/merchant-exists/${id}`, // GET - Verificar merchant
    HEALTH: '/health',                                 // GET - Health check
  },
  MERCHANTS: {
    // ✅ Actualizados según tu MerchantController real
    CREATE: '/clients',                                         // POST - Crear merchant
    GET_BY_ID: (clientId, merchantId) => `/clients/${clientId}/merchants/${merchantId}`, // GET
    GET_BY_ID_SIMPLE: (clientId, merchantId) => `/clients/${clientId}/merchants/${merchantId}?simpleOutput=true`,
    FIND_BY_NAME: '/clients/name',                             // GET - Buscar por nombre (?name=...)
    GET_BY_CLIENT_ID: (clientId) => `/clients/${clientId}/merchants`, // GET - Merchants de un cliente
    GET_BY_MERCHANT_ID: (merchantId) => `/clients/merchants/by-merchant-id/${merchantId}`, // GET
    UPDATE: (clientId, merchantId) => `/clients/${clientId}/merchants/${merchantId}`, // PUT
    EXISTS: (merchantId) => `/clients/merchants/${merchantId}/exists`, // GET - Verificar existencia
    HEALTH: '/health',                                         // GET - Health check
  },
};
```

### PASO 3: Servicios Client Disponibles ✅
Ya tienes estos métodos específicos para tu ClientController:

```typescript
import { ClientService } from '../service/src/clientMerchantService';

// Crear cliente
const newClient = await ClientService.create({
  name: "Juan",
  surname: "Pérez", 
  cifNifNie: "12345678X",
  phone: "600123456",
  email: "juan@example.com",
  age: "30"
});

// Obtener cliente por ID
const client = await ClientService.getById(1);

// Obtener cliente simple por ID
const simpleClient = await ClientService.getByIdSimple(1);

// Buscar por email
const clientByEmail = await ClientService.getByEmail("juan@example.com");

// Buscar por nombre
const clientsByName = await ClientService.findByName("Juan");

// Actualizar cliente
const updatedClient = await ClientService.update(1, clientData);

// Verificar si existe merchant
const merchantExists = await ClientService.merchantExists(123);

// Health check
const health = await ClientService.healthCheck();
```

### PASO 4: Servicios Merchant Disponibles ✅
Ya tienes estos métodos específicos para tu MerchantController:

```typescript
import { MerchantService } from '../service/src/clientMerchantService';
import { MerchantType } from '../common/types/entities';

// Crear merchant
const newMerchant = await MerchantService.create({
  clientId: 1,
  name: "Mi Tienda",
  address: "Calle Principal 123",
  merchantType: MerchantType.MERCHANT_TYPE_PERSONAL_SERVICES
});

// Obtener merchant por ID (clientId y merchantId)
const merchant = await MerchantService.getById(1, 123);

// Obtener merchant simple por ID
const simpleMerchant = await MerchantService.getByIdSimple(1, 123);

// Buscar merchants por nombre
const merchantsByName = await MerchantService.findByName("Mi Tienda");

// Obtener todos los merchants de un cliente
const clientMerchants = await MerchantService.getByClientId(1);

// Obtener merchant por merchantId (sin clientId)
const merchantById = await MerchantService.getByMerchantId(123);

// Actualizar merchant
const updatedMerchant = await MerchantService.update(1, 123, {
  name: "Nueva Tienda",
  address: "Nueva Dirección",
  merchantType: "MERCHANT_TYPE_FINANCIAL_SERVICES"
});

// Verificar si existe merchant
const merchantExists = await MerchantService.exists(123);

// Health check
const health = await MerchantService.healthCheck();
```
Una vez que la conexión básica funcione, puedes:

1. **Crear componentes específicos** para Client y Merchant
2. **Usar los hooks ya implementados** en `useClientMerchantApi.ts`
3. **Expandir el UserManagement** para gestión completa

## 🎯 Hooks Disponibles

Ya tienes estos hooks listos para usar:

```typescript
// Para Clients
import { 
  useClients,           // Obtener lista de clientes
  useClient,            // Obtener cliente por ID
  useCreateClient,      // Crear cliente
  useUpdateClient,      // Actualizar cliente
  useDeleteClient,      // Eliminar cliente
} from '../hooks/useClientMerchantApi';

// Para Merchants
import {
  useMerchants,         // Obtener lista de merchants
  useMerchant,          // Obtener merchant por ID
  useCreateMerchant,    // Crear merchant
  useUpdateMerchant,    // Actualizar merchant
  useDeleteMerchant,    // Eliminar merchant
} from '../hooks/useClientMerchantApi';

// Para Auth
import {
  useLogin,             // Login
  useLogout,            // Logout
} from '../hooks/useClientMerchantApi';
```

## 🐛 Solución de Problemas

### ❌ Error CORS
- Verifica que `CorsConfig.java` esté en AMBOS microservicios
- Reinicia ambos servidores Spring Boot

### ❌ Error 404 en /health
- Añade el HealthController a ambos microservicios
- Verifica que los puertos sean correctos (8080 y 8081)

### ❌ Error de Conexión
- Asegúrate de que AMBOS microservicios estén ejecutándose
- Verifica las URLs en `.env.local`
- Usa F12 > Network para ver errores de red

## 📞 ¡CONEXIÓN EXITOSA! ¿Qué sigue?

🎉 **¡Ya tienes la conectividad básica funcionando perfectamente!**

**Resultados de TestConnection:**
- ✅ Client Service: "OK - Client Service funcionando en puerto 8080"
- ✅ Merchant Service: "OK - Merchant Service funcionando en puerto 8081"

### 🚀 **Opciones para continuar:**

#### **1. Crear Interfaz de Usuario Completa**
- Formularios para crear/editar Clients y Merchants
- Tablas para listar y gestionar datos
- Integración completa con React Query

#### **2. Implementar Funcionalidades CRUD**
- Usar los servicios ya configurados (`ClientService`, `MerchantService`)
- Crear componentes específicos para cada entidad
- Manejar estados de loading, error y success

#### **3. Añadir Autenticación Completa**
- Login/logout con JWT
- Interceptores automáticos para tokens
- Protección de rutas

#### **4. Mejorar la Experiencia de Usuario**
- Notificaciones toast
- Validación de formularios
- Paginación y filtros

### 💡 **¿Qué prefieres implementar primero?**

Dime qué te gustaría hacer a continuación y te ayudo a implementarlo. ¡Tu setup básico está 100% funcional! 🚀
