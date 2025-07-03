import { clientServiceClient } from '@/common/utils/httpClient';
import type { ClientFormData, CreateClientResult } from '../delivery/interface';
import { transformClientForCreation } from './clientDataOperations';

// Función para generar JWT
export const generateJWTForCreation = async (clientData: ClientFormData): Promise<string> => {
    const response = await clientServiceClient.post('/api/auth/generate-token-client', clientData);
    return response.data.token;
};

// Función principal para crear cliente
export const createClientWithJWT = async (
    clientData: ClientFormData,
    onLog: (message: string) => void
): Promise<CreateClientResult> => {
    onLog('🚀 Iniciando creación de cliente...');

    try {
        const testClientData = { ...clientData };
        onLog(`📋 Datos del cliente: ${JSON.stringify(testClientData)}`);

        // Generar JWT
        onLog('🔑 Solicitando JWT al backend...');
        
        const jwtResponse = await clientServiceClient.post('/api/auth/generate-token-client', testClientData);
        onLog(`✅ JWT recibido del backend: ${jwtResponse.status}`);

        const jwt = jwtResponse.data.token;
        onLog(`🎫 JWT generado correctamente`);

        // Crear cliente
        onLog('👤 Creando cliente con JWT...');

        const clientDataForCreation = transformClientForCreation(testClientData);

        const createResponse = await clientServiceClient.post('/clients', clientDataForCreation, {
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            }
        });
        
        onLog(`✅ Cliente creado exitosamente: ${createResponse.status}`);
        
        return {
            success: true,
            client: createResponse.data,
            jwt: jwt
        };

    } catch (error: any) {
        const errorMessage = error.message || 'Error desconocido';
        onLog(`❌ Error: ${errorMessage}`);
        
        return {
            success: false,
            error: errorMessage
        };
    }
};