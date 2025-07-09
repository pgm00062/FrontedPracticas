import { clientServiceClient } from '@/common/utils/httpClient';
import type { FeignMerchantData, JWTClientData } from '../delivery/interface';

const DEFAULT_JWT_CLIENT_DATA: JWTClientData = {
    name: 'Debug Cliente',
    surname: 'Test',
    age: 30,
    cifNifNie: '12345678A',
    email: 'debug@test.com',
    phone: '123456789',
    merchantType: null
};

export interface SearchResult {
    success: boolean;
    data?: FeignMerchantData;
    error?: string;
    statusCode?: number;
}

export const generateJWTForSearch = async (clientData: JWTClientData): Promise<string> => {
    const response = await clientServiceClient.post('/api/auth/generate-token-client', clientData);
    return response.data.token;
};

export const searchMerchantById = async (
    merchantId: string,
    onLog: (message: string) => void
): Promise<SearchResult> => {
    onLog(`🚀 Iniciando búsqueda de comerciante con ID: ${merchantId}`);

    try {
        // 🔑 Generar JWT automáticamente antes de la búsqueda
        onLog('🔑 Solicitando JWT al backend...');

        // Datos de cliente para generar el JWT
        const testClientData = DEFAULT_JWT_CLIENT_DATA;

        const jwtResponse = await clientServiceClient.post('/api/auth/generate-token-client', testClientData);
        onLog(`✅ JWT recibido del backend: ${jwtResponse.status}`);

        const jwt = jwtResponse.data.token;
        onLog(`🎫 JWT generado correctamente`);

        // 👤 Buscar comerciante con JWT
        onLog(`🔍 Buscando comerciante con ID: ${merchantId} usando JWT...`);
        
        const response = await clientServiceClient.get(`/merchant-exists/${merchantId}`, {
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            },
            timeout: 5000,
            validateStatus: () => true // Aceptar cualquier status code
        });

        if (response.status === 200) {
            onLog(`✅ Merchant encontrado: ${JSON.stringify(response.data)}`);
            return { success: true, data: response.data };
        } else {
            const errorMessage = `❌ Error al buscar merchant: ${response.status} - ${response.statusText}`;
            onLog(errorMessage);
            return { success: false, error: errorMessage, statusCode: response.status };
        }
    } catch (error) {
        const errorMessage = `❌ Error al buscar merchant: ${error instanceof Error ? error.message : 'Error desconocido'}`;
        onLog(errorMessage);
        return { success: false, error: errorMessage };
    }
}

