import { clientServiceClient, merchantServiceClient } from '@/common/utils/httpClient';
import type { MerchantFormData, CreateMerchantResult } from '../../../../utils/commonInterface';
import { transformMerchantForCreation, logMerchantDataTransformation } from './merchantDataOperations';

// Función para generar JWT
export const generateJWTForCreation = async (merchantData : MerchantFormData): Promise<string> => {
    const response = await merchantServiceClient.post('/api/auth/generate-token-merchant', merchantData);
    return response.data.token;
};

// Datos de prueba para crear un cliente
const clientPayload = {
  name: 'Pedro',
  surname: 'Domínguez',
  age: 22,
  cifNifNie: '01234567B',
  email: 'pedro.dominguez@example.com',
  phone: '666777888'
};

export const createMerchantWithJWTServer = async (
    merchantData: MerchantFormData,
): Promise<CreateMerchantResult> => {
    try {
        const testMerchantData = { ...merchantData };

        // 🔑 Generar JWT de merchant
        const merchantTokenRes = await merchantServiceClient.post('/api/auth/generate-token-merchant', testMerchantData);
        const merchantToken = merchantTokenRes.data.token;

        // 🔑 Generar JWT de client
        const clientTokenRes = await clientServiceClient.post('/api/auth/generate-token-client', clientPayload);
        const clientToken = clientTokenRes.data.token;

        // ✅ Transformar datos de merchant
        const merchantDataForCreation = transformMerchantForCreation(testMerchantData);
        logMerchantDataTransformation(testMerchantData);

        const headers = {
            'Authorization': `Bearer ${merchantToken}`,   // Para el merchant-microservice
            'X-Client-Token': `Bearer ${clientToken}`,    // Para el Feign interceptor
            'Content-Type': 'application/json'
        };

        const createResponse = await merchantServiceClient.post('/clients', merchantDataForCreation, {
            headers,
            timeout: 10000,
            validateStatus: () => true
        });

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

