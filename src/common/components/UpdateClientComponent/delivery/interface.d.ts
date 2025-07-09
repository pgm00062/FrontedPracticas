export interface ClientUpadateData {
    id: string;
    name: string;
    surname: string;
    cifNifNie: string;
    email: string;
    phone: string;
    age: number;
    merchantType: null;
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

export interface ClientUpdateRequest{
    id: string;//no se modifica, solo datos personales del cliente
    clientData:{
        name: string;
        surname: string;
        cifNifNie: string;
        email: string;
        phone: string;
        age: number;
    }
}

export interface ClientUpdateResult {
    success: boolean;
    client?: ClientData;
    message?: string;
    error?: string;
}

export interface UpdateClientProps {
  onUpdateSuccess?: (client: ClientData) => void;
  onUpdateError?: (error: string) => void;
  initialClientId?: string; // Para pre-cargar un ID
}