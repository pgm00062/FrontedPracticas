import { merchantServiceClient } from "@/common/utils/httpClient";
import { API_ENDPOINTS } from "@/common/utils/apiConfig";
import { MerchantType } from '../../../../utils/enums/merchant.enum';

export const DEFAULT_JWT_MERCHANT_DATA = {
  name: "Debug Merchant",
  address:"123 Debug St",
  merchantType: MerchantType.MERCHANT_TYPE_FINANCIAL_SERVICES
};

export const updateMerchant = async (
    clientId: string,
    merchantId: string,
    merchantData: any,
    onLog: (message: string) => void
): Promise<{ success: boolean; data?: any; error?: string }> => {
    onLog(`🔄 Actualizando merchant con ID: ${merchantId}`);

    try{
        onLog('🔑 Generando JWT para actualización...');
        const jwtResponse = await merchantServiceClient.post('/api/auth/generate-token-merchant', DEFAULT_JWT_MERCHANT_DATA);
        if (jwtResponse.status !== 200) {
            onLog(`❌ Error generando JWT: ${jwtResponse.status}`);
            return { success: false, error: `Error generando JWT: ${jwtResponse.status}` };
        }

        const jwt = jwtResponse.data.token;
        onLog(`✅ JWT generado correctamente`);
        const updateData = {
            name:merchantData.name,
            address: merchantData.address,
            merchantType: merchantData.merchantType
        };

    onLog(`Datos a actualizar: ${JSON.stringify(updateData, null, 2)}`);
    console.log('[UPDATE MERCHANT] clientId:', clientId);
    console.log('[UPDATE MERCHANT] merchantId:', merchantId);
    console.log('[UPDATE MERCHANT] updateData:', updateData);
    onLog(`🔍 clientId recibido: ${clientId}`);
    onLog(`🔍 merchantId recibido: ${merchantId}`);
    onLog(`🔍 Consultando endpoint: PUT /clients/${clientId}/merchants/${merchantId}`);

        const response = await merchantServiceClient.put(
            API_ENDPOINTS.MERCHANTS.UPDATE(clientId, merchantId), 
            updateData,
            {
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                },
                timeout: 5000,
                validateStatus: () => true 
            }
        );

        onLog(`📡 Respuesta del servidor: ${response.status} - ${response.statusText}`);
        onLog(`🔍 Raw response data: ${JSON.stringify(response.data, null, 2)}`);
        if(response.status === 200) {
            onLog(`✅ Merchant actualizado exitosamente`);
            onLog(`👤 Datos actualizados: ${JSON.stringify(response.data, null, 2)}`);
            return { success: true, data: response.data };
        }else if(response.status === 404) {
            onLog(`❌ Merchant no encontrado para actualizar: ${merchantId}`);
            return { success: false, error: `Merchant no encontrado: ${merchantId}` };
        }else if(response.status === 400) {
            onLog(`❌ Bad Request (400) - Datos inválidos o ID mal formateado`);
            return { success: false, error: `Bad Request (400) - Datos inválidos o ID mal formateado` };
        }else{
            onLog(`❌ Error del servidor: ${response.status} - ${response.statusText}`);
            return { success: false, error: `Error del servidor: ${response.status}` };
        }
    }catch (error: any) {
        onLog(`❌ Error al actualizar merchant: ${error}`);
        if(error.response) {
            onLog(`📋 Respuesta del servidor: ${JSON.stringify(error.response.data, null, 2)}`);
        }
        return { success: false, error: `Error al actualizar merchant: ${error}` };
    }
};

