export interface ClientDeleteData{
    id: string;
    name: string;
    surname: string;
    cifNifNie: string;
    email: string;
    phone: string;
    age: number;
    merchantType: null;
}

export interface DeleteClientState {
    // Datos del cliente a eliminar
    clientToDelete: ClientDeleteData | null;
    isDeleting: boolean;
    // Resultado de la eliminación
    deleteResult: boolean | null;
    // Estados
    logs: string[];
    error?: string;
}

export interface DeleteClientProps {
    onDeleteSuccess?: (client: ClientDeleteData) => void;
    onDeleteError?: (error: string) => void;
    initialClientId?: string; // Para pre-cargar un ID
}