// Configuración base para las APIs
export const API_CONFIG = {
  CLIENT_SERVICE: process.env.NEXT_PUBLIC_CLIENT_SERVICE_URL || 'http://localhost:8080',
  MERCHANT_SERVICE: process.env.NEXT_PUBLIC_MERCHANT_SERVICE_URL || 'http://localhost:8081',
  TIMEOUT: 10000, // 10 segundos
} as const;

// Endpoints para tus microservicios
export const API_ENDPOINTS = {
  // Client service endpoints - Basados en ClientController real
  CLIENTS: {
    // POST /clients - Crear cliente
    CREATE: '/clients',
    
    // GET /clients/{id} - Obtener cliente por ID (con parámetro simpleOutput opcional)
    GET_BY_ID: (id: string | number) => `/clients/${id}`,
    GET_BY_ID_SIMPLE: (id: string | number) => `/clients/${id}?simpleOutput=true`,
    
    // GET /clients/email?email={email} - Buscar cliente por email
    GET_BY_EMAIL: '/clients/email',
    
    // GET /clients/name?name={name} - Buscar clientes por nombre
    FIND_BY_NAME: '/clients/name',
    
    // PUT /clients/{id} - Actualizar cliente
    UPDATE: (id: string | number) => `/clients/${id}`,
    
    // GET /clients/merchant-exists/{merchantId} - Verificar existencia de merchant
    MERCHANT_EXISTS: (merchantId: string | number) => `/clients/merchant-exists/${merchantId}`,
    
    // Health check
    HEALTH: '/health',
  },
  // Merchant service endpoints - Basados en MerchantController real
  // NOTA: Los endpoints de Merchant empiezan con /clients según tu @RequestMapping
  MERCHANTS: {
    // POST /clients - Crear merchant
    CREATE: '/clients',
    
    // GET /clients/{clientId}/merchants/{merchantId} - Obtener merchant por ID (con simpleOutput opcional)
    GET_BY_ID: (clientId: string | number, merchantId: string | number) => `/clients/${clientId}/merchants/${merchantId}`,
    GET_BY_ID_SIMPLE: (clientId: string | number, merchantId: string | number) => `/clients/${clientId}/merchants/${merchantId}?simpleOutput=true`,
    
    // GET /clients/name?name={name} - Buscar merchants por nombre
    FIND_BY_NAME: '/clients/name',
    
    // GET /clients/{clientId}/merchants - Obtener todos los merchants de un cliente
    GET_BY_CLIENT_ID: (clientId: string | number) => `/clients/${clientId}/merchants`,
    
    // GET /clients/merchants/by-merchant-id/{merchantId} - Obtener merchant por merchantId
    GET_BY_MERCHANT_ID: (merchantId: string | number) => `/clients/merchants/by-merchant-id/${merchantId}`,
    
    // PUT /clients/{clientId}/merchants/{merchantId} - Actualizar merchant
    UPDATE: (clientId: string | number, merchantId: string | number) => `/clients/${clientId}/merchants/${merchantId}`,
    
    // GET /clients/merchants/{merchantId}/exists - Verificar existencia de merchant
    EXISTS: (merchantId: string | number) => `/clients/merchants/${merchantId}/exists`,
    
    // Health check
    HEALTH: '/health',
  },
  // Auth endpoints (si tienes autenticación en alguno de los servicios)
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
  },
} as const;

export type ApiEndpoints = typeof API_ENDPOINTS;