// Props del componente principal
export interface CreateClientFormProps {
  className?: string;
  onClientCreated?: (client: any) => void;
  onError?: (error: string) => void;
  defaultData?: Partial<ClientFormData>;
}

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

// Estado del componente
export interface ComponentState {
  logs: string[];
  isCreating: boolean;
  lastResult: CreateClientResult | null;
  clientData: ClientFormData;
}

// Resultado de la operación
export interface CreateClientResult {
  success: boolean;
  client?: any;
  jwt?: string;
  error?: string;
}

// Datos para crear cliente (formato backend)
export interface ClientCreationData {
  name: string;
  surname: string;
  email: string;
  phone: string;
  cifNifNie: string;
  age: string;
  status: 'ACTIVE';
}

// Eventos del componente
export interface ComponentEvents {
  onGenerateRandom: () => void;
  onCreateClient: () => Promise<void>;
  onClearResults: () => void;
  onInputChange: (field: keyof ClientFormData, value: string | number) => void;
}