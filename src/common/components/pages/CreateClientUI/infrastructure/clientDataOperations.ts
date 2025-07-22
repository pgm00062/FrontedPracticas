import type { ClientFormData } from '../interface';

// Datos por defecto para el formulario
export const DEFAULT_CLIENT_DATA: ClientFormData = {
  name: 'Debug Cliente',
  surname: 'Test',
  age: 30,
  cifNifNie: '12345678A',
  email: 'debug@test.com',
  phone: '123456789',
  merchantType: null
};

// Función para generar cliente aleatorio
export const generateRandomClient = (): ClientFormData => {
  return {
    name: `Cliente Test ${Math.floor(Math.random() * 1000)}`,
    surname: `Apellido${Math.floor(Math.random() * 100)}`,
    age: Math.floor(Math.random() * 50) + 20,
    cifNifNie: `12345678${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
    email: `test${Math.floor(Math.random() * 1000)}@example.com`,
    phone: `123456${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    merchantType: null
  };
};

// Función para validar datos del formulario
export const validateClientData = (data: ClientFormData): boolean => {
  return data.name.trim() !== '' &&
         data.surname.trim() !== '' &&
         data.email.trim() !== '' &&
         data.phone.trim() !== '' &&
         data.cifNifNie.trim() !== '' &&
         data.age > 0;
};

// ✅ FUNCIÓN CORREGIDA: Incluir todos los campos GSI
// ✅ FUNCIÓN CORREGIDA: Con el campo exacto de tu BD
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
    
    // ✅ Campos GSI CORREGIDOS con nombres exactos de tu BD
    // Para GSI_Email (buscar por email)
    gIndex2Pk: data.email,  // ✅ CORRECTO: 'pk' en minúscula
    
    // Para GSI_Name (buscar por nombre)
    GSI_PK: "CLIENT#",
    GSI_Name: data.name ? data.name.toLowerCase() : null,
    
    // ✅ Campos adicionales que puede necesitar DynamoDB
    merchantType: data.merchantType
  };
};

// ✅ NUEVA FUNCIÓN: Para debugging, ver exactamente qué se envía
export const logClientDataTransformation = (original: ClientFormData): void => {
  const transformed = transformClientForCreation(original);
  console.log('📋 Datos originales:', original);
  console.log('🔄 Datos transformados:', transformed);
  console.log('✅ Campos GSI incluidos:', {
    gIndex2Pk: transformed.gIndex2Pk,
    GSI_PK: transformed.GSI_PK,
    GSI_Name: transformed.GSI_Name
  });
};