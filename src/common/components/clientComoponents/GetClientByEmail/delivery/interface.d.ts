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

// Estado del componente
export interface ComponentState {
  logs: LogEntry[];
  isCreating: boolean;
  lastResult: ClientData | null;
  clientId: string;
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

// Props del componente, añadir despues...
export interface GetByIdClientIDComponentProps {
  className?: string;
  onClientFound?: (client: ClientData) => void;
  onError?: (error: string) => void;
}