export interface ButtonUpdateClientProps {
  client: ClientUpdateData;
  onBack?: () => void;
}

export interface ClientUpdateData {
    id: string; 
  surname: string;
  email: string;
  phone: string;
  cifNifNie: string;
  age: number;
  merchantType?: null;
}

export interface UpdateClientState{
    //primero buscamos por id
    searchId: string;
    isSearching: boolean;
    //despues actualizamos
    currentClient: ClientUpadateData | null;
    updatedClient: ClientUpadateData | null;
    isUpdating: boolean;
    //estados
    logs: string[];
    result: any; 
    showInstructions: boolean; // Para mostrar u ocultar instrucciones
}


export interface ClientFormData {
    id?: string; // opcional para nuevos clientes
  name: string;
  surname: string;
  email: string;
  phone: string;
  cifNifNie: string;
  age: number;
  merchantType: null;
}