import axios, { 
  AxiosInstance, 
  AxiosRequestConfig, 
  AxiosResponse, 
  AxiosError 
} from 'axios';
import Cookies from 'js-cookie';
import { API_CONFIG } from './apiConfig';

// Tipos para las respuestas de tu API Spring Boot
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: number;
  success: boolean;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

// Crear instancia base de Axios
const createApiClient = (baseURL: string): AxiosInstance => {
  const client = axios.create({
    baseURL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  // Interceptor para agregar token JWT
  client.interceptors.request.use(
    (config) => {
      const token = Cookies.get('authToken') || localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Interceptor para manejar respuestas
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      // Manejar errores globalmente
      if (error.response?.status === 401) {
        // Token expirado o inválido
        Cookies.remove('authToken');
        localStorage.removeItem('authToken');
        // Redirigir al login si es necesario
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
      
      return Promise.reject(error);
    }
  );

  return client;
};

// Clientes para cada microservicio
export const clientServiceClient = createApiClient(API_CONFIG.CLIENT_SERVICE);
export const merchantServiceClient = createApiClient(API_CONFIG.MERCHANT_SERVICE);

// Función helper para manejar errores
export const handleApiError = (error: AxiosError): string => {
  if (error.response?.data) {
    const errorData = error.response.data as any;
    return errorData.message || errorData.error || 'Error desconocido';
  }
  
  if (error.request) {
    return 'No se pudo conectar con el servidor';
  }
  
  return error.message || 'Error desconocido';
};

// Función helper para requests GET
export const get = async <T>(
  client: AxiosInstance,
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await client.get<T>(url, config);
  return response.data;
};

// Función helper para requests POST
export const post = async <T, D = any>(
  client: AxiosInstance,
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await client.post<T>(url, data, config);
  return response.data;
};

// Función helper para requests PUT
export const put = async <T, D = any>(
  client: AxiosInstance,
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await client.put<T>(url, data, config);
  return response.data;
};

// Función helper para requests DELETE
export const del = async <T>(
  client: AxiosInstance,
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await client.delete<T>(url, config);
  return response.data;
};
