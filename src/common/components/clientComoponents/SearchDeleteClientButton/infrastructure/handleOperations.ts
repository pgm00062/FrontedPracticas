import { useState } from 'react';
import { deleteClientById } from './deleteClientOperations';
import type { DeleteClientState } from '../delivery/interface';
import { toast } from 'sonner';
import { ClientData } from '../../GetBClientIDComponent/delivery/interface';
import {ClientDeleteData} from '../delivery/interface';

export const useDeleteClient = () => {
    const [state, setState] = useState<DeleteClientState>({
        clientToDelete: null,
        isDeleting: false,
        deleteResult: null,
        logs: [],
        error: undefined
    });

    const [searchId, setSearchId] = useState<string>('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const addLog = (message: string) => {
        setState((prev: DeleteClientState) => ({  // ✅ TIPO EXPLÍCITO
            ...prev,
            logs: [...prev.logs, `${new Date().toLocaleTimeString()}: ${message}`]
        }));
    };

    const handleDeleteRequest = (client: ClientDeleteData | null) => {
        if(!client) {
            toast.error('❌ No hay cliente seleccionado para eliminar');
            addLog('❌ No hay cliente seleccionado para eliminar');
            return;
        }
        setState((prev) => ({ ...prev, clientToDelete: client }));
        setShowConfirmModal(true);
    };

    const handleCancelDelete = () => {
        setShowConfirmModal(false);
        addLog('🚫 Eliminación cancelada por el usuario');
    };

    const handleConfirmDelete = async (): Promise<boolean> => {
        if (!state.clientToDelete || !state.clientToDelete.id) {
            toast.error('❌ No hay cliente seleccionado para eliminar');
            addLog('❌ No hay cliente seleccionado para eliminar');
            return false;
        }

        setState((prev) => ({ ...prev, isDeleting: true }));
        addLog('🗑️ Confirmando eliminación permanente...');

        try {
            const result = await deleteClientById(state.clientToDelete.id, addLog);
            if (result.success) {
                toast.success('✅ Cliente eliminado exitosamente');
                addLog(`✅ Cliente eliminado exitosamente: ${state.clientToDelete.name} ${state.clientToDelete.surname}`);
                setState((prev: DeleteClientState) => ({
                    ...prev,
                    deleteResult: true,
                    isDeleting: false,
                    clientToDelete: null
                }));
                setSearchId('');
                setShowConfirmModal(false);
                return true; // <-- Devuelve true si se elimina correctamente
            } else {
                toast.error(result.error || '❌ Error al eliminar el cliente');
                addLog(`❌ Error al eliminar el cliente: ${result.error}`);
                setState((prev: DeleteClientState) => ({
                    ...prev,
                    deleteResult: false,
                    isDeleting: false
                }));
                setShowConfirmModal(false);
                return false;
            }
        } catch (error) {
            toast.error('❌ Error al eliminar el cliente');
            addLog(`❌ Error al eliminar el cliente: ${error}`);
            setState((prev: DeleteClientState) => ({
                ...prev,
                deleteResult: false,
                isDeleting: false
            }));
            setShowConfirmModal(false);
            return false;
        }
    };

    const handleReset = () => {
        setState({
            clientToDelete: null,
            isDeleting: false,
            deleteResult: null,
            logs: [],
            error: undefined
        });
        setSearchId('');
        setShowConfirmModal(false);
    };

    return {
        state,
        showConfirmModal,
        
        handleDeleteRequest,
        handleCancelDelete,
        handleConfirmDelete,
        handleReset
    };
};