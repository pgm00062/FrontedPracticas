import {merchantServiceClient} from '@/common/utils/httpClient';
import type {MerchantData, JWTMerchantData} from '../delivery/interface';
import  {MerchantType} from '../infrastructure/merchant.enum';

const DEFAULT_JWT_MERCHANT_DATA: JWTMerchantData = {
    name: 'Debug Merchant',
    address: '123 Merchant St',
    merchantType: MerchantType.MERCHANT_TYPE_FINANCIAL_SERVICES
}

export interface SearchResult {
    success: boolean;
    data?: MerchantData;
    error?: string;
    statusCode?: number;
}

// Función principal para buscar comerciante por ID
export const searchMerchantById = async (
    clientId:string,
    merchantId: string,
    onLog: (message: string) => void
): Promise<SearchResult> => {
    onLog(`Iniciando búsqueda de comerciante con ID: ${merchantId}`);
    try {
        onLog('🔑 Solicitando JWT al backend...');

        const testMerchantData = DEFAULT_JWT_MERCHANT_DATA;

        const jwtResponse = await merchantServiceClient.post('/api/auth/generate-token-merchant', testMerchantData);
        onLog(`✅ JWT recibido del backend: ${jwtResponse.status}`);

        const jwt = jwtResponse.data.token;
        onLog(`🎫 JWT generado correctamente`);    

        // Buscar comerciante por ID
        onLog(`Buscando comerciante con ID: ${merchantId}...`);
        
        const response = await merchantServiceClient.get(`/clients/${clientId}/merchants/${merchantId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            },
            timeout: 5000,
            validateStatus: () => true // Aceptar cualquier status code
        });

        if (response.status === 200) {
            onLog(`✅ Comerciante encontrado exitosamente: ${JSON.stringify(response.data)}`);
            
              const mappedData: MerchantData = {
                merchantId: response.data.id.toString(), // <-- aquí renombramos
                clientId: response.data.clientId.toString(),
                name: response.data.name,
                address: response.data.address,
                merchantType: response.data.merchantType
            };
            return {
                success: true,
                data: mappedData,
                statusCode: response.status
            };
        } else if (response.status === 404) {
            onLog(`❌ Comerciante no encontrado: ${response.status} - No existe un comerciante con ID ${merchantId}`);
            return {
                success: false,
                error: `Comerciante no encontrado: No existe un comerciante con ID ${merchantId}`,
                statusCode: response.status
            };
        } else {
            onLog(`❌ Error al obtener comerciante: ${response.status} - ${response.statusText}`);
            return {
                success: false,
                error: `Error al obtener comerciante: ${response.status} - ${response.statusText}`,
                statusCode: response.status
            };
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        onLog(`❌ Error en la petición: ${errorMessage}`);
        return {
            success: false,
            error: `Error en la petición: ${errorMessage}`,
            statusCode: 500
        };
    }
};