import type { ClientFormData } from '../delivery/interface';

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

// Función para transformar datos para creación
export const transformClientForCreation = (data: ClientFormData) => {
  return {
    name: data.name,
    surname: data.surname,
    email: data.email,
    phone: `+${data.phone}`,
    cifNifNie: data.cifNifNie,
    age: data.age.toString(),
    status: 'ACTIVE' as const
  };
};