import { MerchantType, type MerchantFormData } from '../delivery/interface';

// Datos por defecto para el formulario
export const DEFAULT_MERCHANT_DATA: MerchantFormData = {
  idClient: '12345', // ID de cliente por defecto  
  name: 'Debug Merchant',
  address: 'Calle Falsa 123',
  merchantType: MerchantType.MERCHANT_TYPE_PERSONAL_SERVICES
};

// Función para generar cliente aleatorio
export const generateRandomMerchant = (): MerchantFormData => {
  return {
    idClient: `${Math.floor(Math.random() * 10000)}`, // ID aleatorio
    name: `Cliente Test ${Math.floor(Math.random() * 1000)}`,
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
    // 🔹 Campos de negocio
    idClient:data.idClient,
    name: data.name,
    address: data.address,
    merchantType: data.merchantType,
    status: 'ACTIVE' as const,

    // 🔹 Índices para búsqueda
    gIndex2Pk: data.name.toLowerCase(), // Para GSI_Email (opcional, depende de tu lógica real)
    GSI_PK: 'CLIENT#',
    GSI_Name: data.name.toLowerCase(),
  };
};

// 🔹 Debug para inspeccionar datos transformados
export const logMerchantDataTransformation = (
  original: MerchantFormData,
  clientId: string
): void => {
  const transformed = transformMerchantForCreation(original);
  console.log('📋 Datos originales:', original);
  console.log('🔄 Datos transformados:', transformed);
  console.log('✅ GSI y claves:', {
    GSI_PK: transformed.GSI_PK,
    GSI_Name: transformed.GSI_Name,
  });
};