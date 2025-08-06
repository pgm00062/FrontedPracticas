import { merchantServiceClient } from "@/common/utils/httpClient";
import type { MerchantData, JWTMerchantData } from '../../../../utils/commonInterface';
import { MerchantType } from '../../../../utils/enums/merchant.enum';
import type {SearchResult} from '../delivery/interface';

const DEFAULT_JWT_MERCHANT_DATA: JWTMerchantData = {
    name: "Debug Merchant",
    address: "123 Merchant St",
    merchantType: MerchantType.MERCHANT_TYPE_FINANCIAL_SERVICES,
};

export const searchMerchantsByClientIdServer = async (
    clientId: string,
): Promise<SearchResult> => {
    try {
        const testMerchantData = DEFAULT_JWT_MERCHANT_DATA;
        const jwtResponse = await merchantServiceClient.post(
            "/api/auth/generate-token-merchant",
            testMerchantData
        );
        const jwt = jwtResponse.data.token;
        // Buscar comerciantes por clientId
        const response = await merchantServiceClient.get(
            `/clients/${clientId}/merchants`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    "Content-Type": "application/json",
                },
                timeout: 5000,
                validateStatus: () => true, 
            }
        );
        if (response.status === 200) {

            const mappedData: MerchantData[] = response.data.map((merchant: any) => ({
                merchantId: merchant.id.toString(),
                clientId: merchant.clientId.toString(),
                name: merchant.name,
                address: merchant.address,
                merchantType: merchant.merchantType,
            }));
            return {
                success: true,
                data: mappedData,
                statusCode: response.status
            };
        } else if (response.status === 404) {
            return {
                success: false,
                error: "No se encontraron comerciantes",
                statusCode: response.status
            };
        } else {
            return {
                success: false,
                error: `Error al buscar comerciantes: ${response.status} - ${response.statusText}`,
                statusCode: response.status
            };
        }
    } catch (error) {
        return {
            success: false,
            error: `Error al buscar comerciantes: ${error instanceof Error ? error.message : 'Unknown error'}`,
            statusCode: 500
        };
    }
};