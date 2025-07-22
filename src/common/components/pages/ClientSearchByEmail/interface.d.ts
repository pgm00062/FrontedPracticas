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
