import {merchantServiceClient} from '@/common/utils/httpClient';
import type {MerchantData, JWTMerchantData} from '../../../../utils/commonInterface';
import  {MerchantType} from '../../../../utils/enums/merchant.enum';
import type {SearchResult} from '../delivery/interface';

const DEFAULT_JWT_MERCHANT_DATA: JWTMerchantData = {
    name: 'Debug Merchant',
    address: '123 Merchant St',
    merchantType: MerchantType.MERCHANT_TYPE_FINANCIAL_SERVICES
}

// Función principal para buscar comerciante por ID
export const searchMerchantByIdServer = async (
    clientId:string,
    merchantId: string,
): Promise<SearchResult> => {
    try {

        const testMerchantData = DEFAULT_JWT_MERCHANT_DATA;

        const jwtResponse = await merchantServiceClient.post('/api/auth/generate-token-merchant', testMerchantData);

        const jwt = jwtResponse.data.token;
  
        const response = await merchantServiceClient.get(`/clients/${clientId}/merchants/${merchantId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            },
            timeout: 5000,
            validateStatus: () => true // Aceptar cualquier status code
        });

        if (response.status === 200) {
            
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
            return {
                success: false,
                error: `Comerciante no encontrado: No existe un comerciante con ID ${merchantId}`,
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
            statusCode: 500
        };
    }
};