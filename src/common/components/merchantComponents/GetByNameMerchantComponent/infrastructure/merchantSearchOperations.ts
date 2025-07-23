import {merchantServiceClient} from '@/common/utils/httpClient';
import type {MerchantData, JWTMerchantData} from '../../../../utils/commonInterface';
import {MerchantType} from '../../../../utils/enums/merchant.enum';

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

export const searchMerchantByNameServer = async (
    name: string,
): Promise<SearchResult> => {
    try{
        const jwtResponse = await merchantServiceClient.post('/api/auth/generate-token-merchant', DEFAULT_JWT_MERCHANT_DATA);

        const jwt = jwtResponse.data.token;

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

            return {
                success: true,
                data: response.data,
                statusCode: response.status
            };
        } else if (response.status === 404) {
            return {
                success: false,
                error: `Comerciante no encontrado: No existen comerciantes con nombre ${name}`,
                statusCode: response.status
            };
        } else {
            return {
                success: false,
                error: `Error al obtener comerciante: ${response.status} - ${response.statusText}`,
                statusCode: response.status
            };
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        return {
            success: false,
            error: `Error en la petición: ${errorMessage}`,
            statusCode: 0
        };
    }
}