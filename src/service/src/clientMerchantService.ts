import { 
  clientServiceClient,
  merchantServiceClient,
  get,
  post,
  put,
  ApiResponse
} from '../../common/utils/httpClient';
import { API_ENDPOINTS } from '../../common/utils/apiConfig';
import { 
  ClientInputDto, 
  ClientOutputDto, 
  ClientSimpleOutputDto,
  MerchantInputDto,
  MerchantOutputDto,
  MerchantOutputIdDto,
  MerchantInputUpdateDto
} from '../../common/types/entities';

// Servicio de Clientes - Basado en tu ClientController real
export const ClientService = {
  // POST /clients - Crear cliente
  create: async (clientData: ClientInputDto): Promise<ApiResponse<ClientOutputDto>> => {
    return post<ApiResponse<ClientOutputDto>>(
      clientServiceClient,
      API_ENDPOINTS.CLIENTS.CREATE,
      clientData
    );
  },

  // GET /clients/{id} - Obtener cliente por ID
  getById: async (id: string | number): Promise<ApiResponse<ClientOutputDto>> => {
    return get<ApiResponse<ClientOutputDto>>(
      clientServiceClient,
      API_ENDPOINTS.CLIENTS.GET_BY_ID(id)
    );
  },

  // GET /clients/{id}?simpleOutput=true - Obtener cliente simplificado
  getByIdSimple: async (id: string | number): Promise<ApiResponse<ClientSimpleOutputDto>> => {
    return get<ApiResponse<ClientSimpleOutputDto>>(
      clientServiceClient,
      API_ENDPOINTS.CLIENTS.GET_BY_ID_SIMPLE(id)
    );
  },

  // GET /clients/email?email={email} - Buscar cliente por email
  getByEmail: async (email: string): Promise<ApiResponse<ClientOutputDto>> => {
    return get<ApiResponse<ClientOutputDto>>(
      clientServiceClient,
      `${API_ENDPOINTS.CLIENTS.GET_BY_EMAIL}?email=${encodeURIComponent(email)}`
    );
  },

  // GET /clients/name?name={name} - Buscar clientes por nombre
  findByName: async (name: string): Promise<ApiResponse<ClientOutputDto[]>> => {
    return get<ApiResponse<ClientOutputDto[]>>(
      clientServiceClient,
      `${API_ENDPOINTS.CLIENTS.FIND_BY_NAME}?name=${encodeURIComponent(name)}`
    );
  },

  // PUT /clients/{id} - Actualizar cliente
  update: async (id: string | number, clientData: ClientInputDto): Promise<ApiResponse<ClientOutputDto>> => {
    return put<ApiResponse<ClientOutputDto>>(
      clientServiceClient,
      API_ENDPOINTS.CLIENTS.UPDATE(id),
      clientData
    );
  },

  // GET /clients/merchant-exists/{merchantId} - Verificar existencia de merchant
  merchantExists: async (merchantId: string | number): Promise<ApiResponse<boolean>> => {
    return get<ApiResponse<boolean>>(
      clientServiceClient,
      API_ENDPOINTS.CLIENTS.MERCHANT_EXISTS(merchantId)
    );
  },

  // Health check
  healthCheck: async (): Promise<string> => {
    return get<string>(clientServiceClient, API_ENDPOINTS.CLIENTS.HEALTH);
  },
};

// Servicio de Merchants - Basado en tu MerchantController real
export const MerchantService = {
  // POST /clients - Crear merchant
  create: async (merchantData: MerchantInputDto): Promise<ApiResponse<MerchantOutputDto>> => {
    return post<ApiResponse<MerchantOutputDto>>(
      merchantServiceClient,
      API_ENDPOINTS.MERCHANTS.CREATE,
      merchantData
    );
  },

  // GET /clients/{clientId}/merchants/{merchantId} - Obtener merchant por ID
  getById: async (clientId: string | number, merchantId: string | number): Promise<ApiResponse<MerchantOutputDto>> => {
    return get<ApiResponse<MerchantOutputDto>>(
      merchantServiceClient,
      API_ENDPOINTS.MERCHANTS.GET_BY_ID(clientId, merchantId)
    );
  },

  // GET /clients/{clientId}/merchants/{merchantId}?simpleOutput=true - Obtener merchant simple
  getByIdSimple: async (clientId: string | number, merchantId: string | number): Promise<ApiResponse<MerchantOutputIdDto>> => {
    return get<ApiResponse<MerchantOutputIdDto>>(
      merchantServiceClient,
      API_ENDPOINTS.MERCHANTS.GET_BY_ID_SIMPLE(clientId, merchantId)
    );
  },

  // GET /clients/name?name={name} - Buscar merchants por nombre
  findByName: async (name: string): Promise<ApiResponse<MerchantOutputDto[]>> => {
    return get<ApiResponse<MerchantOutputDto[]>>(
      merchantServiceClient,
      `${API_ENDPOINTS.MERCHANTS.FIND_BY_NAME}?name=${encodeURIComponent(name)}`
    );
  },

  // GET /clients/{clientId}/merchants - Obtener todos los merchants de un cliente
  getByClientId: async (clientId: string | number): Promise<ApiResponse<MerchantOutputDto[]>> => {
    return get<ApiResponse<MerchantOutputDto[]>>(
      merchantServiceClient,
      API_ENDPOINTS.MERCHANTS.GET_BY_CLIENT_ID(clientId)
    );
  },

  // GET /clients/merchants/by-merchant-id/{merchantId} - Obtener merchant por merchantId
  getByMerchantId: async (merchantId: string | number): Promise<ApiResponse<MerchantOutputDto>> => {
    return get<ApiResponse<MerchantOutputDto>>(
      merchantServiceClient,
      API_ENDPOINTS.MERCHANTS.GET_BY_MERCHANT_ID(merchantId)
    );
  },

  // PUT /clients/{clientId}/merchants/{merchantId} - Actualizar merchant
  update: async (clientId: string | number, merchantId: string | number, merchantData: MerchantInputUpdateDto): Promise<ApiResponse<MerchantOutputDto>> => {
    return put<ApiResponse<MerchantOutputDto>>(
      merchantServiceClient,
      API_ENDPOINTS.MERCHANTS.UPDATE(clientId, merchantId),
      merchantData
    );
  },

  // GET /clients/merchants/{merchantId}/exists - Verificar existencia de merchant
  exists: async (merchantId: string | number): Promise<ApiResponse<boolean>> => {
    return get<ApiResponse<boolean>>(
      merchantServiceClient,
      API_ENDPOINTS.MERCHANTS.EXISTS(merchantId)
    );
  },

  // Health check
  healthCheck: async (): Promise<string> => {
    return get<string>(merchantServiceClient, API_ENDPOINTS.MERCHANTS.HEALTH);
  },
};
