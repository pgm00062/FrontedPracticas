import type { ClientFormData } from '../../../../utils/commonInterface';

export const transformClientForCreation = (data: ClientFormData) => {
  return {
    // ✅ Campos básicos del cliente
    name: data.name,
    surname: data.surname,
    email: data.email,
    phone: `+${data.phone}`,
    cifNifNie: data.cifNifNie,
    age: data.age.toString(),
    status: 'ACTIVE' as const,
    
    gIndex2Pk: data.email,  // ✅ CORRECTO: 'pk' en minúscula
    
    // Para GSI_Name (buscar por nombre)
    GSI_PK: "CLIENT#",
    GSI_Name: data.name ? data.name.toLowerCase() : null,
    
    merchantType: data.merchantType
  };
};
