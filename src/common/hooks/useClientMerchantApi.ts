import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  ClientService, 
  MerchantService
} from '../../service/src/clientMerchantService';
import {
  CreateClientRequest,
  UpdateClientRequest,
  CreateMerchantRequest,
  UpdateMerchantRequest,
  ClientInputDto,
  MerchantInputDto,
  MerchantInputUpdateDto
} from '../types/entities';

// Query keys para React Query
export const QUERY_KEYS = {
  CLIENTS: 'clients',
  CLIENT: 'client',
  MERCHANTS: 'merchants',
  MERCHANT: 'merchant',
} as const;

// ===================
// HOOKS PARA CLIENTS
// ===================

// Hook para obtener cliente por ID
export const useClient = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CLIENT, id],
    queryFn: () => ClientService.getById(id),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

// Hook para obtener cliente simplificado por ID
export const useClientSimple = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CLIENT, id, 'simple'],
    queryFn: () => ClientService.getByIdSimple(id),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook para buscar cliente por email
export const useClientByEmail = (email: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CLIENT, 'email', email],
    queryFn: () => ClientService.getByEmail(email),
    enabled: enabled && !!email,
  });
};

// Hook para buscar clientes por nombre
export const useClientsByName = (name: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CLIENTS, 'name', name],
    queryFn: () => ClientService.findByName(name),
    enabled: enabled && !!name,
  });
};

// Hook para verificar si un merchant existe
export const useCheckMerchantExists = (merchantId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CLIENTS, 'merchant-exists', merchantId],
    queryFn: () => ClientService.merchantExists(merchantId),
    enabled: enabled && !!merchantId,
  });
};

// Hook para health check del servicio de clientes
export const useClientHealthCheck = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.CLIENTS, 'health'],
    queryFn: () => ClientService.healthCheck(),
    staleTime: 30 * 1000, // 30 segundos
  });
};

// Hook para crear cliente
export const useCreateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (clientData: ClientInputDto) => ClientService.create(clientData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CLIENTS] });
      console.log('Cliente creado exitosamente');
    },
    onError: (error: any) => {
      console.error('Error creando cliente:', error);
    },
  });
};

// Hook para actualizar cliente
export const useUpdateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, clientData }: { id: string; clientData: ClientInputDto }) => 
      ClientService.update(id, clientData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CLIENTS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CLIENT, variables.id] });
      console.log('Cliente actualizado exitosamente');
    },
    onError: (error: any) => {
      console.error('Error actualizando cliente:', error);
    },
  });
};

//Hook para eliminar un cliente
export const useDeleteClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ClientService.deleteClient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CLIENTS] });
      console.log('Cliente eliminado exitosamente');
    },
    onError: (error: any) => {
      console.error('Error eliminando cliente:', error);
    },
  });
};

// ===================
// HOOKS PARA MERCHANTS
// ===================

// Hook para obtener merchant por ID (requiere clientId y merchantId)
export const useMerchant = (clientId: string, merchantId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: [QUERY_KEYS.MERCHANT, clientId, merchantId],
    queryFn: () => MerchantService.getById(clientId, merchantId),
    enabled: enabled && !!clientId && !!merchantId,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook para obtener merchant simplificado por ID
export const useMerchantSimple = (clientId: string, merchantId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: [QUERY_KEYS.MERCHANT, clientId, merchantId, 'simple'],
    queryFn: () => MerchantService.getByIdSimple(clientId, merchantId),
    enabled: enabled && !!clientId && !!merchantId,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook para buscar merchants por nombre
export const useMerchantsByName = (name: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: [QUERY_KEYS.MERCHANTS, 'name', name],
    queryFn: () => MerchantService.findByName(name),
    enabled: enabled && !!name,
  });
};

// Hook para obtener todos los merchants de un cliente
export const useMerchantsByClientId = (clientId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: [QUERY_KEYS.MERCHANTS, 'client', clientId],
    queryFn: () => MerchantService.getByClientId(clientId),
    enabled: enabled && !!clientId,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook para obtener merchant por merchantId
export const useMerchantByMerchantId = (merchantId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: [QUERY_KEYS.MERCHANT, 'merchantId', merchantId],
    queryFn: () => MerchantService.getByMerchantId(merchantId),
    enabled: enabled && !!merchantId,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook para verificar si un merchant existe
export const useCheckMerchantExistsInMerchantService = (merchantId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: [QUERY_KEYS.MERCHANTS, 'exists', merchantId],
    queryFn: () => MerchantService.exists(merchantId),
    enabled: enabled && !!merchantId,
  });
};

// Hook para health check del servicio de merchants
export const useMerchantHealthCheck = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.MERCHANTS, 'health'],
    queryFn: () => MerchantService.healthCheck(),
    staleTime: 30 * 1000, // 30 segundos
  });
};

// Hook para crear merchant
export const useCreateMerchant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (merchantData: MerchantInputDto) => MerchantService.create(merchantData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MERCHANTS] });
      console.log('Merchant creado exitosamente');
    },
    onError: (error: any) => {
      console.error('Error creando merchant:', error);
    },
  });
};

// Hook para actualizar merchant
export const useUpdateMerchant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ 
      clientId, 
      merchantId, 
      merchantData 
    }: { 
      clientId: string; 
      merchantId: string; 
      merchantData: MerchantInputUpdateDto 
    }) => 
      MerchantService.update(clientId, merchantId, merchantData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MERCHANTS] });
      queryClient.invalidateQueries({ 
        queryKey: [QUERY_KEYS.MERCHANT, variables.clientId, variables.merchantId] 
      });
      console.log('Merchant actualizado exitosamente');
    },
    onError: (error: any) => {
      console.error('Error actualizando merchant:', error);
    },
  });
};

// ===================
// HOOKS COMBINADOS
// ===================

// Hook para health check de ambos servicios
export const useServicesHealthCheck = () => {
  const clientHealth = useClientHealthCheck();
  const merchantHealth = useMerchantHealthCheck();

  return {
    client: clientHealth,
    merchant: merchantHealth,
    isLoading: clientHealth.isLoading || merchantHealth.isLoading,
    isError: clientHealth.isError || merchantHealth.isError,
    allHealthy: clientHealth.isSuccess && merchantHealth.isSuccess,
  };
};
