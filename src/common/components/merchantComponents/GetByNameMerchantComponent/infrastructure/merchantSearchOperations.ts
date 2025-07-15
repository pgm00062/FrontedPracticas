import {merchantServiceClient} from '@/common/utils/httpClient';
import type {MerchantData, JWTMerchantData} from '../delivery/interface';
import {MerchantType} from '../infrastructure/merchant.enum';

const DEFAULT_JWT_MERCHANT_DATA: JWTMerchantData = {
    name: 'Debug Merchant',
    address: '123 Merchant St',
    merchantType: MerchantType.MERCHANT_TYPE_FINANCIAL_SERVICES
}

export interface SearchResult {
    success: boolean;
    data?: MerchantData[];
    error?: string;
    statusCode?: number;
}

export const searchMerchantByName = async (
    name: string,
    onLog: (message: string) => void
): Promise<SearchResult> => {
    onLog(`🚀 Iniciando búsqueda de comerciante con nombre: ${name}`);

    try{
        onLog('🔑 Solicitando JWT al backend para el comerciante...');

        const jwtResponse = await merchantServiceClient.post('/api/auth/generate-token-merchant', DEFAULT_JWT_MERCHANT_DATA);
        onLog(`✅ JWT recibido del backend: ${jwtResponse.status}`);

        const jwt = jwtResponse.data.token;
        onLog(`🎫 JWT generado correctamente`);

        onLog(`🔍 Buscando comerciante con nombre: ${name} usando JWT...`);

        const response = await merchantServiceClient.get(`/clients/name?name=${name}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            },
            timeout: 5000,
            validateStatus: () => true // Aceptar cualquier status code
        });

        if (response.status === 200) {
            const merchants: MerchantData[] = response.data;
            onLog(`✅ Comerciantes encontrados exitosamente: ${JSON.stringify(response.data)}`);

            // ✅ Log de cada comerciante encontrado
            merchants.forEach((merchant, index) => {
                onLog(`👤 Comerciante ${index + 1}: ${merchant.name} ${merchant.address} (${merchant.merchantType})`);
            });

            return {
                success: true,
                data: response.data,
                statusCode: response.status
            };
        } else if (response.status === 404) {
            onLog(`❌ Comerciante no encontrado: ${response.status} - No existe ningun comerciante con nombre ${name}`);
            return {
                success: false,
                error: `Comerciante no encontrado: No existen comerciantes con nombre ${name}`,
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
            statusCode: 0
        };
    }
}