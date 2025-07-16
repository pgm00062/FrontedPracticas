import { clientServiceClient, merchantServiceClient } from '@/common/utils/httpClient';
import type { MerchantFormData,ClientFormData, CreateMerchantResult } from '../delivery/interface';
import { transformMerchantForCreation, logMerchantDataTransformation } from './merchantDataOperations';
import test from 'node:test';

// Función para generar JWT
export const generateJWTForCreation = async (merchantData : MerchantFormData): Promise<string> => {
    const response = await merchantServiceClient.post('/api/auth/generate-token-merchant', merchantData);
    return response.data.token;
};

/*
export const createMerchantWithJWT = async (
    merchantData: MerchantFormData,
    onLog: (message: string) => void
): Promise<CreateMerchantResult> => {
    onLog('🚀 Iniciando creación de comerciante...');

    try {
        const testMerchantData = { ...merchantData };
        onLog(`📋 Datos del comerciante original: ${JSON.stringify(testMerchantData)}`);

        // Generar JWT
        onLog('🔑 Solicitando JWT al backend...');
        
        const jwtResponse = await merchantServiceClient.post('/api/auth/generate-token-merchant', testMerchantData);
        onLog(`✅ JWT recibido del backend: ${jwtResponse.status}`);

        const jwt = jwtResponse.data.token;
        onLog(`📦 JWT generado (backend): ${jwt}`);
        // ✅ Transformar datos con todos los campos GSI incluidos
        const merchantDataForCreation = transformMerchantForCreation(testMerchantData);
        
        // ✅ Log de debugging para ver la transformación
        logMerchantDataTransformation(testMerchantData);

        // Crear comerciante
        onLog('👤 Creando comerciante con JWT...');


        onLog('➡️ Enviando merchant al backend con JWT:');
        onLog(`🔐 JWT: ${jwt}`);
        onLog(`📋 Datos del comerciante para creación: ${JSON.stringify(merchantDataForCreation)}`);

        const url = '/clients';
        const headers = {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
        };

        onLog(`🌐 URL destino: ${merchantServiceClient.defaults.baseURL}${url}`);
        onLog(`📨 Headers enviados: ${JSON.stringify(headers, null, 2)}`);
        onLog(`📦 Payload enviado: ${JSON.stringify(merchantDataForCreation, null, 2)}`);

        const createResponse = await merchantServiceClient.post('/clients', merchantDataForCreation, {
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            },
            timeout: 10000,
            validateStatus: () => true
            
        });
        
        onLog(`📊 Respuesta del servidor: Status ${createResponse.status}`);
        onLog(`📊 Datos recibidos: ${JSON.stringify(createResponse.data)}`);
        console.log('📦 JWT generado (frontend):', jwt);

        if (createResponse.status === 201) {
            onLog(`✅ Comerciante creado exitosamente`);
            return {
                success: true,
                merchant: createResponse.data,
                jwt: jwt
            };
        } else if (createResponse.status === 409) {
            onLog(`❌ Comerciante ya existe: ${createResponse.status}`);
            return {
                success: false,
                error: 'Comerciante ya existe con esos datos '
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

    } catch (error) {
        console.error('Error al crear comerciante:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido',
            jwt: ''
        };
    }
}
*/
// Datos de prueba para crear un cliente
const clientPayload = {
  name: 'Pedro',
  surname: 'Domínguez',
  age: 22,
  cifNifNie: '01234567B',
  email: 'pedro.dominguez@example.com',
  phone: '666777888'
};

export const createMerchantWithJWT = async (
    merchantData: MerchantFormData,
    onLog: (message: string) => void
): Promise<CreateMerchantResult> => {
    onLog('🚀 Iniciando creación de comerciante...');

    try {
        const testMerchantData = { ...merchantData };
        onLog(`📋 Datos del comerciante original: ${JSON.stringify(testMerchantData)}`);

        // 🔑 Generar JWT de merchant
        onLog('🔑 Solicitando JWT de merchant al backend...');
        const merchantTokenRes = await merchantServiceClient.post('/api/auth/generate-token-merchant', testMerchantData);
        const merchantToken = merchantTokenRes.data.token;
        onLog(`✅ JWT de merchant recibido`);

        // 🔑 Generar JWT de client
        onLog('🔑 Solicitando JWT de cliente al backend...');
        const clientTokenRes = await clientServiceClient.post('/api/auth/generate-token-client', clientPayload);
        const clientToken = clientTokenRes.data.token;
        onLog(`✅ JWT de cliente recibido`);

        // ✅ Transformar datos de merchant
        const merchantDataForCreation = transformMerchantForCreation(testMerchantData);
        logMerchantDataTransformation(testMerchantData);

        const headers = {
            'Authorization': `Bearer ${merchantToken}`,   // Para el merchant-microservice
            'X-Client-Token': `Bearer ${clientToken}`,    // Para el Feign interceptor
            'Content-Type': 'application/json'
        };

        onLog(`🌐 Enviando request con headers: ${JSON.stringify(headers, null, 2)}`);

        const createResponse = await merchantServiceClient.post('/clients', merchantDataForCreation, {
            headers,
            timeout: 10000,
            validateStatus: () => true
        });

        onLog(`📊 Status: ${createResponse.status}`);
        onLog(`📦 Respuesta: ${JSON.stringify(createResponse.data)}`);

        if (createResponse.status === 201) {
            return {
                success: true,
                merchant: createResponse.data,
                jwt: merchantToken
            };
        } else if (createResponse.status === 409) {
            return {
                success: false,
                error: 'Comerciante ya existe con esos datos '
            };
        } else if (createResponse.status === 400) {
            const errorMsg = createResponse.data?.error || 'Datos de entrada no válidos';
            return {
                success: false,
                error: `Datos inválidos: ${errorMsg}`
            };
        } else if (createResponse.status === 500) {
            return {
                success: false,
                error: 'Error interno del servidor. Inténtalo de nuevo.'
            };
        } else {
            return {
                success: false,
                error: `Error inesperado: ${createResponse.status}`
            };
        }

    } catch (error) {
        console.error('❌ Error al crear comerciante:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido',
            jwt: ''
        };
    }
};

