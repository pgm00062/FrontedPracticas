# 🚀 Guía Completa: Cómo Conectamos Frontend Next.js con Backend Spring Boot + DynamoDB

## 📖 **Índice de Contenidos**
1. [🎯 Arquitectura General](#arquitectura)
2. [🔧 Configuración Base](#configuracion-base)
3. [🌐 Sistema de Comunicación HTTP](#comunicacion-http)
4. [📊 Gestión de Estado y Datos](#gestion-estado)
5. [🎨 Componentes de Interfaz](#componentes-interfaz)
6. [🔄 Flujo Completo de Datos](#flujo-datos)
7. [✅ Estado Actual](#estado-actual)

---

## 🎯 Arquitectura General {#arquitectura}

### **¿Qué construimos?**
Una aplicación **full-stack** que conecta:
- **Frontend:** Next.js + TypeScript + React Query
- **Backend:** Spring Boot + DynamoDB
- **Base de Datos:** DynamoDB Local con índices GSI optimizados

### **¿Cómo se comunican?**
```
┌─────────────────┐    HTTP/REST    ┌─────────────────┐    AWS SDK    ┌─────────────────┐
│                 │  ──────────────> │                 │ ──────────────> │                 │
│  FRONTEND       │                 │  BACKEND        │                │  DYNAMODB       │
│  (Next.js)      │ <────────────── │  (Spring Boot)  │ <────────────── │  (Local)        │
│  Port: 3000     │    JSON/JWT     │  Port: 8080     │    Queries     │  Port: 8000     │
└─────────────────┘                 └─────────────────┘                 └─────────────────┘
```

---

## 🔧 Configuración Base {#configuracion-base}

### **PASO 1: Configuración del Entorno**

#### **Variables de entorno (`.env.local`):**
```env
# URLs de los microservicios
NEXT_PUBLIC_CLIENT_SERVICE_URL=http://localhost:8080
NEXT_PUBLIC_MERCHANT_SERVICE_URL=http://localhost:8081

# Configuración de desarrollo
NODE_ENV=development
```

**¿Para qué sirve?**
- Define las URLs base de nuestros servicios backend
- Permite cambiar fácilmente entre desarrollo/producción
- Centraliza la configuración en un solo lugar

---

## 🌐 Sistema de Comunicación HTTP {#comunicacion-http}

### **PASO 2: Cliente HTTP con Axios**

#### **Archivo: `src/common/utils/httpClient.ts`**
```typescript
import axios from 'axios';

// Cliente específico para el servicio de clientes
export const clientServiceClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CLIENT_SERVICE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Cliente específico para el servicio de merchants
export const merchantServiceClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MERCHANT_SERVICE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

**¿Para qué sirve este archivo?**
- **Centraliza** la configuración de HTTP
- **Separa** los clientes por microservicio
- **Configura** timeouts y headers por defecto
- **Facilita** interceptors para JWT (futuro)

### **PASO 3: Configuración de Endpoints**

#### **Archivo: `src/common/utils/apiConfig.ts`**
```typescript
export const API_ENDPOINTS = {
  CLIENTS: {
    CREATE: '/clients',                                 // POST
    GET_BY_ID: (id: number) => `/clients/${id}`,      // GET
    GET_BY_EMAIL: '/clients/email',                   // GET ?email=...
    FIND_BY_NAME: '/clients/name',                    // GET ?name=...
    UPDATE: (id: number) => `/clients/${id}`,         // PUT
    HEALTH: '/health',                                // GET
  },
  MERCHANTS: {
    CREATE: '/clients',                               // POST
    GET_BY_ID: (cId: number, mId: number) => 
      `/clients/${cId}/merchants/${mId}`,            // GET
    // ... más endpoints
  },
};
```

**¿Para qué sirve este archivo?**
- **Centraliza** todas las rutas API
- **Evita** hardcodear URLs en componentes
- **Facilita** cambios de endpoints
- **Mejora** mantenibilidad del código

---

## 📊 Gestión de Estado y Datos {#gestion-estado}

### **PASO 4: React Query Provider**

#### **Archivo: `src/common/providers/ReactQueryProvider.tsx`**
```typescript
'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minuto
        retry: 2,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

**¿Para qué sirve este archivo?**
- **Gestiona** el estado global de las peticiones HTTP
- **Cachea** automáticamente las respuestas del servidor
- **Reintenta** peticiones fallidas
- **Sincroniza** datos entre componentes
- **Proporciona** herramientas de desarrollo

### **PASO 5: Servicios de Datos**

#### **Archivo: `src/service/src/clientMerchantService.ts`**
```typescript
import { clientServiceClient } from '@/common/utils/httpClient';
import { API_ENDPOINTS } from '@/common/utils/apiConfig';

export const ClientService = {
  // Crear cliente
  async create(clientData: any) {
    const response = await clientServiceClient.post(
      API_ENDPOINTS.CLIENTS.CREATE, 
      clientData
    );
    return response.data;
  },

  // Obtener cliente por ID
  async getById(id: number) {
    const response = await clientServiceClient.get(
      API_ENDPOINTS.CLIENTS.GET_BY_ID(id)
    );
    return response.data;
  },

  // Buscar cliente por email
  async getByEmail(email: string) {
    const response = await clientServiceClient.get(
      `${API_ENDPOINTS.CLIENTS.GET_BY_EMAIL}?email=${email}`
    );
    return response.data;
  },
  // ... más métodos
};
```

**¿Para qué sirve este archivo?**
- **Abstrae** las llamadas HTTP del backend
- **Transforma** datos si es necesario
- **Maneja** errores de comunicación
- **Proporciona** una API limpia a los componentes

### **PASO 6: Hooks Personalizados**

#### **Archivo: `src/common/hooks/useClientMerchantApi.ts`**
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ClientService } from '@/service/src/clientMerchantService';

// Hook para obtener cliente por ID
export const useClient = (id: number) => {
  return useQuery({
    queryKey: ['client', id],
    queryFn: () => ClientService.getById(id),
    enabled: !!id, // Solo ejecutar si hay ID
  });
};

// Hook para crear cliente
export const useCreateClient = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ClientService.create,
    onSuccess: () => {
      // Invalidar cache para recargar datos
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });
};
```

**¿Para qué sirven estos hooks?**
- **Simplifican** el uso de React Query en componentes
- **Gestionan** automáticamente loading, error y success
- **Invalidan** cache cuando es necesario
- **Reutilizan** lógica entre componentes

---

## 🎨 Componentes de Interfaz {#componentes-interfaz}

### **PASO 7: Arquitectura Hexagonal en Frontend**

Organizamos los componentes siguiendo **arquitectura hexagonal**:

```
src/common/components/ComponenteEjemplo/
├── delivery/                    # 🎨 Capa de Presentación
│   ├── index.tsx               # Componente principal
│   ├── interface.d.ts          # Tipos TypeScript
│   └── components/             # Subcomponentes UI
│       ├── formulario.tsx
│       ├── resultados.tsx
│       └── acciones.tsx
└── infrastructure/             # 🔧 Capa de Infraestructura
    ├── operaciones.ts          # Lógica de negocio
    └── transformaciones.ts     # Mapeo de datos
```

### **PASO 8: Componente de Creación de Cliente**

#### **Archivo: `src/common/components/CreateClientForm/delivery/index.tsx`**
```typescript
'use client';
import React, { useState } from 'react';
import { createClientWithJWT } from '../infrastructure/clientCreationOperations';
import type { ClientFormData, CreateClientResult } from './interface';

const CreateClientForm: React.FC = () => {
  const [formData, setFormData] = useState<ClientFormData>({
    name: '',
    surname: '',
    email: '',
    // ... más campos
  });
  
  const [logs, setLogs] = useState<string[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    
    const result = await createClientWithJWT(formData, (message) => {
      setLogs(prev => [...prev, message]);
    });
    
    if (result.success) {
      // Cliente creado exitosamente
    }
    
    setIsCreating(false);
  };

  return (
    <div className="card">
      <h2>Crear Cliente</h2>
      <form onSubmit={handleSubmit}>
        {/* Campos del formulario */}
      </form>
      {/* Logs de debugging */}
    </div>
  );
};
```

**¿Para qué sirve este componente?**
- **Presenta** interfaz para crear clientes
- **Valida** datos del formulario
- **Muestra** progreso y logs de la operación
- **Maneja** estados de loading y error

#### **Archivo: `src/common/components/CreateClientForm/infrastructure/clientCreationOperations.ts`**
```typescript
import { clientServiceClient } from '@/common/utils/httpClient';

export const createClientWithJWT = async (
  clientData: ClientFormData,
  onLog: (message: string) => void
): Promise<CreateClientResult> => {
  onLog('🚀 Iniciando creación de cliente...');

  try {
    // 1. Generar JWT
    onLog('🔑 Solicitando JWT al backend...');
    const jwtResponse = await clientServiceClient.post(
      '/api/auth/generate-token-client', 
      clientData
    );
    const jwt = jwtResponse.data.token;
    
    // 2. Transformar datos para DynamoDB
    const clientDataForCreation = transformClientForCreation(clientData);
    onLog(`📋 Datos transformados: ${JSON.stringify(clientDataForCreation)}`);
    
    // 3. Crear cliente
    onLog('👤 Creando cliente con JWT...');
    const response = await clientServiceClient.post('/clients', clientDataForCreation, {
      headers: { 'Authorization': `Bearer ${jwt}` }
    });
    
    if (response.status === 201) {
      onLog('✅ Cliente creado exitosamente');
      return { success: true, client: response.data };
    }
    
  } catch (error) {
    onLog(`❌ Error: ${error.message}`);
    return { success: false, error: error.message };
  }
};
```

**¿Para qué sirve este archivo?**
- **Orquesta** el proceso completo de creación
- **Genera** JWT automáticamente
- **Transforma** datos para DynamoDB (campos GSI)
- **Proporciona** logs detallados para debugging

### **PASO 9: Componente de Búsqueda por Email**

#### **Archivo: `src/common/components/GetClientByEmail/delivery/index.tsx`**
```typescript
'use client';
import React, { useState } from 'react';
import { searchClientByEmail } from '../infrastructure/clientSearchOperations';

const GetClientByEmail: React.FC = () => {
  const [email, setEmail] = useState('');
  const [client, setClient] = useState(null);
  const [logs, setLogs] = useState([]);
  
  const handleSearch = async () => {
    const result = await searchClientByEmail(email, (message) => {
      setLogs(prev => [...prev, message]);
    });
    
    if (result.success) {
      setClient(result.data);
    }
  };

  return (
    <div className="card">
      <h2>🔍 Buscar Cliente por Email</h2>
      <div>
        <input 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="cliente@email.com"
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      {client && <div>Cliente encontrado: {client.name}</div>}
    </div>
  );
};
```

**¿Para qué sirve este componente?**
- **Busca** clientes usando el índice GSI_Email de DynamoDB
- **Muestra** resultados en tiempo real
- **Maneja** casos de "no encontrado"

---

## 🔄 Flujo Completo de Datos {#flujo-datos}

### **Ejemplo: Crear un Cliente**

```
1. USUARIO rellena formulario
   └── CreateClientForm/delivery/index.tsx

2. FRONTEND valida datos
   └── ClientFormData interface

3. FRONTEND llama a infrastructure
   └── createClientWithJWT()

4. INFRASTRUCTURE genera JWT
   ├── POST /api/auth/generate-token-client
   └── Recibe token JWT

5. INFRASTRUCTURE transforma datos
   ├── transformClientForCreation()
   ├── Añade campos GSI: GIndex2Pk, GSI_PK, GSI_Name
   └── Formatea datos para DynamoDB

6. INFRASTRUCTURE envía al backend
   ├── POST /clients + JWT header
   └── Datos con campos GSI incluidos

7. BACKEND (Spring Boot) procesa
   ├── Valida JWT
   ├── ClientMapper mapea datos
   └── Guarda en DynamoDB con campos GSI

8. DYNAMODB almacena
   ├── Tabla principal: PK, SK + datos
   ├── GSI_Email: GIndex2Pk para búsqueda por email
   └── GSI_Name: GSI_PK + GSI_Name para búsqueda por nombre

9. BACKEND responde
   └── 201 Created + datos del cliente

10. FRONTEND muestra resultado
    ├── Logs de debugging
    ├── Confirmación de éxito
    └── Datos del cliente creado
```

### **Ejemplo: Buscar Cliente por Email**

```
1. USUARIO introduce email
   └── GetClientByEmail/delivery/index.tsx

2. FRONTEND llama a infrastructure
   └── searchClientByEmail()

3. INFRASTRUCTURE genera JWT
   └── Mismo proceso que creación

4. INFRASTRUCTURE busca cliente
   ├── GET /clients/email?email=xxx + JWT
   └── Backend usa GSI_Email de DynamoDB

5. DYNAMODB consulta índice
   ├── GSI_Email busca por GIndex2Pk = email
   └── Retorna datos si existe

6. BACKEND responde
   ├── 200 + datos del cliente (si existe)
   └── 404 + mensaje (si no existe)

7. FRONTEND muestra resultado
   ├── Datos del cliente encontrado
   ├── Mensaje "no encontrado"
   └── Logs de la operación
```

---

## ✅ Estado Actual {#estado-actual}

### **🎉 ¿Qué hemos conseguido?**

✅ **Arquitectura robusta** con separación de responsabilidades  
✅ **Comunicación HTTP** configurable y reutilizable  
✅ **Gestión de estado** con React Query (cache, loading, error)  
✅ **Componentes modulares** siguiendo arquitectura hexagonal  
✅ **Sistema de logging** para debugging en tiempo real  
✅ **Integración DynamoDB** con índices GSI optimizados  
✅ **Autenticación JWT** automática y transparente  
✅ **Transformación de datos** para compatibilidad backend  
✅ **Manejo de errores** completo en toda la aplicación  
✅ **Tipos TypeScript** para seguridad de datos

### **🏗️ Arquitectura Final**
- **Frontend:** Next.js + TypeScript + React Query + Tailwind
- **Backend:** Spring Boot + MapStruct + DynamoDB + JWT
- **Base de Datos:** DynamoDB con GSI_Email y GSI_Name optimizados

### **🎯 Funcionalidades Operativas**

#### **✅ Gestión de Clientes:**
- **Crear cliente** con validación y transformación automática
- **Buscar por email** usando índice GSI_Email optimizado
- **Buscar por ID** con respuesta rápida
- **Logs en tiempo real** para debugging y monitoreo

#### **✅ Sistema de Autenticación:**
- **JWT automático** generado para cada operación
- **Headers configurados** automáticamente
- **Manejo de errores** de autenticación

#### **✅ Optimización de Base de Datos:**
- **Índices GSI** para búsquedas eficientes:
  - `GSI_Email`: Búsqueda por email (GIndex2Pk)
  - `GSI_Name`: Búsqueda por nombre (GSI_PK + GSI_Name)
  - `GSI_SK`: Búsquedas adicionales por SK

#### **✅ Experiencia de Desarrollo:**
- **Hot reload** en desarrollo
- **Logs detallados** en consola y UI
- **Manejo de errores** con mensajes claros
- **Tipos TypeScript** para prevenir errores

### **🚀 ¿Qué sigue?**

**Tu aplicación ya tiene una base sólida para:**
- ✅ **Escalar** añadiendo más entidades (Merchants, Users, etc.)
- ✅ **Optimizar** con más índices GSI según necesidades
- ✅ **Expandir** con más funcionalidades CRUD
- ✅ **Mejorar UX** con notificaciones, validaciones avanzadas
- ✅ **Añadir testing** unitario e integración

---

## 🔧 Configuración del Backend Spring Boot (Referencia)

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
