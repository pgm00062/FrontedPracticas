import { clientServiceClient } from '@/common/utils/httpClient';
import type { ClientFormData, CreateClientResult } from '../delivery/interface';
import { transformClientForCreation, logClientDataTransformation } from './clientDataOperations';

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
        onLog(`📋 Datos del cliente original: ${JSON.stringify(testClientData)}`);

        // Generar JWT
        onLog('🔑 Solicitando JWT al backend...');
        
        const jwtResponse = await clientServiceClient.post('/api/auth/generate-token-client', testClientData);
        onLog(`✅ JWT recibido del backend: ${jwtResponse.status}`);

        const jwt = jwtResponse.data.token;
        onLog(`🎫 JWT generado correctamente`);

        // ✅ Transformar datos con todos los campos GSI incluidos
        const clientDataForCreation = transformClientForCreation(testClientData);
        
        // ✅ Log de debugging para ver la transformación
        onLog(`🔄 Datos transformados para creación: ${JSON.stringify(clientDataForCreation)}`);
        onLog(`✅ GSI Email: gIndex2Pk = "${clientDataForCreation.gIndex2Pk}"`);
        onLog(`✅ GSI Name: GSI_PK = "${clientDataForCreation.GSI_PK}", GSI_Name = "${clientDataForCreation.GSI_Name}"`);

        // Crear cliente
        onLog('👤 Creando cliente con JWT...');

        const createResponse = await clientServiceClient.post('/clients', clientDataForCreation, {
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            },
            timeout: 10000,
            validateStatus: () => true
        });

        onLog(`📊 Respuesta del servidor: Status ${createResponse.status}`);
        onLog(`📊 Datos recibidos: ${JSON.stringify(createResponse.data)}`);

        if (createResponse.status === 201) {
            onLog(`✅ Cliente creado exitosamente`);
            return {
                success: true,
                client: createResponse.data,
                jwt: jwt
            };
        } else if (createResponse.status === 409) {
            onLog(`❌ Cliente ya existe: ${createResponse.status}`);
            return {
                success: false,
                error: 'Cliente ya existe con esos datos (email, CIF/NIF/NIE duplicado)'
            };
        } else if (createResponse.status === 400) {
            onLog(`❌ Datos inválidos: ${createResponse.status}`);
            const errorMsg = createResponse.data?.error || 'Datos de entrada no válidos';
            return {
                success: false,
                error: `Datos inválidos: ${errorMsg}`
            };
        } else if (createResponse.status === 500) {
            onLog(`❌ Error interno del servidor: ${createResponse.status}`);
            return {
                success: false,
                error: 'Error interno del servidor. Inténtalo de nuevo.'
            };
        } else {
            onLog(`❌ Error inesperado: ${createResponse.status}`);
            return {
                success: false,
                error: `Error inesperado: ${createResponse.status}`
            };
        }

    } catch (error: any) {
        const errorMessage = error.message || 'Error desconocido';
        onLog(`❌ Error en la petición: ${errorMessage}`);
        
        return {
            success: false,
            error: `Error de conexión: ${errorMessage}`
        };
    }
};