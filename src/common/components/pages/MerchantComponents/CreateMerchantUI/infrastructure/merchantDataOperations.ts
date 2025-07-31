import {MerchantType} from '../../../../../utils/enums/merchant.enum';
import type { MerchantFormData } from '../../../../../utils/commonInterface';
// Datos por defecto para el formulario
export const DEFAULT_MERCHANT_DATA: MerchantFormData = {
  clientId: '123545',   
  name: 'Debug Merchant',
  address: 'Calle Falsa 123',
  merchantType: MerchantType.MERCHANT_TYPE_PERSONAL_SERVICES
};

// Función para generar cliente aleatorio
export const generateRandomMerchant = (): MerchantFormData => {
  return {
    clientId: `12324`, // ID aleatorio
    name: `Comerciante Test ${Math.floor(Math.random() * 1000)}`,
    address: `Calle Test ${Math.floor(Math.random() * 100)}`,
    merchantType: MerchantType.MERCHANT_TYPE_PERSONAL_SERVICES
  };
};

// Función para validar datos del formulario
export const validateMerchantData = (data: MerchantFormData): boolean => {
  return data.name.trim() !== '' &&
            data.address.trim() !== '' && 
            data.merchantType !== null;
};

export const transformMerchantForCreation = (
  data: MerchantFormData,
) => {
  return {
    clientId:data.clientId,
    name: data.name,
    address: data.address,
    merchantType: data.merchantType,
    status: 'ACTIVE' as const,

    gIndex2Pk: data.name.toLowerCase(), 
    GSI_PK: 'CLIENT#',
    GSI_Name: data.name.toLowerCase(),
  };
};

export const logMerchantDataTransformation = (
  original: MerchantFormData,
): void => {
  const transformed = transformMerchantForCreation(original);
  console.log('📋 Datos originales:', original);
  console.log('🔄 Datos transformados:', transformed);
  console.log('✅ GSI y claves:', {
    GSI_PK: transformed.GSI_PK,
    GSI_Name: transformed.GSI_Name,
  });
};