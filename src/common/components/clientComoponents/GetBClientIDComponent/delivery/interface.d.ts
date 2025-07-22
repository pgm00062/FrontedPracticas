// Entrada de log
export interface LogEntry {
  id: string;
  message: string;
}

// Datos del cliente encontrado
export interface ClientData {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  age: number;
  cifNifNie: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}


// Datos para generar JWT
export interface JWTClientData {
  name: string;
  surname: string;
  age: number;
  cifNifNie: string;
  email: string;
  phone: string;
  merchantType: null;
}
