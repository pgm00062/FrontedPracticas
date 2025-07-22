// Datos del formulario
export interface ClientFormData {
  name: string;
  surname: string;
  email: string;
  phone: string;
  cifNifNie: string;
  age: number;
  merchantType: null;
}

// Resultado de la operación
export interface CreateClientResult {
  success: boolean;
  client?: any;
  jwt?: string;
  error?: string;
}