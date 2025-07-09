import { merchantServiceClient } from '@/common/utils/httpClient';
import type { MerchantFormData, CreateMerchantResult } from '../delivery/interface';
import { transformMerchantForCreation, logMerchantDataTransformation } from './merchantDataOperations';

// Función para generar JWT
export const generateJWTForCreation = async (merchantData : MerchantFormData): Promise<string> => {
    const response = await merchantServiceClient.post('/api/auth/generate-token-merchant', merchantData);
    return response.data.token;
};

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
        onLog(`🎫 JWT generado correctamente`);

        // ✅ Transformar datos con todos los campos GSI incluidos
        const merchantDataForCreation = transformMerchantForCreation(testMerchantData);
        
        // ✅ Log de debugging para ver la transformación
        logMerchantDataTransformation(testMerchantData, merchantDataForCreation.idClient);

        // Crear comerciante
        onLog('👤 Creando comerciante con JWT...');

        const createResponse = await merchantServiceClient.post('/merchants', merchantDataForCreation, {
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
            onLog(`✅ Comerciante creado exitosamente`);
            return {
                success: true,
                merchant: createResponse.data,
                jwt: jwt
            };
        } else {
            onLog(`❌ Error al crear comerciante: ${createResponse.statusText}`);
            return {
                success: false,
                error: createResponse.statusText,
                jwt: jwt
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
