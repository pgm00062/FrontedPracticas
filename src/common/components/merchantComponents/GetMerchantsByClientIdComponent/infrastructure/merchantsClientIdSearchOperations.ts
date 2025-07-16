import { merchantServiceClient } from "@/common/utils/httpClient";
import type { MerchantData, JWTMerchantData } from "../delivery/interface";
import { MerchantType } from "../infrastructure/merchant.enum";

const DEFAULT_JWT_MERCHANT_DATA: JWTMerchantData = {
    name: "Debug Merchant",
    address: "123 Merchant St",
    merchantType: MerchantType.MERCHANT_TYPE_FINANCIAL_SERVICES,
};

export interface SearchResult {
    success: boolean;
    data?: MerchantData[];
    error?: string;
    statusCode?: number;
}

export const searchMerchantsByClientId = async (
    clientId: string,
    onLog: (message: string) => void
): Promise<SearchResult> => {
    onLog(`Iniciando búsqueda de comerciantes para el cliente ID: ${clientId}`);
    try {
        onLog("🔑 Solicitando JWT al backend...");
        const testMerchantData = DEFAULT_JWT_MERCHANT_DATA;
        const jwtResponse = await merchantServiceClient.post(
            "/api/auth/generate-token-merchant",
            testMerchantData
        );
        onLog(`✅ JWT recibido del backend: ${jwtResponse.status}`);
        const jwt = jwtResponse.data.token;
        onLog(`🎫 JWT generado correctamente`);
        // Buscar comerciantes por clientId
        onLog(`Buscando comerciantes para el cliente ID: ${clientId}...`);

        const response = await merchantServiceClient.get(
            `/clients/${clientId}/merchants`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    "Content-Type": "application/json",
                },
                timeout: 5000,
                validateStatus: () => true, // Aceptar cualquier status code
            }
        );
        if (response.status === 200) {
            onLog(
                `✅ Comerciantes encontrados exitosamente: ${JSON.stringify(response.data)}`
            );

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
            onLog(`❌ No se encontraron comerciantes para el cliente ID: ${clientId}`);
            return {
                success: false,
                error: "No se encontraron comerciantes",
                statusCode: response.status
            };
        } else {
            onLog(`❌ Error al buscar comerciantes: ${response.status} - ${response.statusText}`);
            return {
                success: false,
                error: `Error al buscar comerciantes: ${response.status} - ${response.statusText}`,
                statusCode: response.status
            };
        }
    } catch (error) {
        onLog(`❌ Error al buscar comerciantes: ${error instanceof Error ? error.message : 'Unknown error'}`);
        return {
            success: false,
            error: `Error al buscar comerciantes: ${error instanceof Error ? error.message : 'Unknown error'}`,
            statusCode: 500
        };
    }

};