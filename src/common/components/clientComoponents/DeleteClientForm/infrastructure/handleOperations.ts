import { useState } from 'react';
import { getClientById, deleteClientById } from './deleteClientOperations';
import type { DeleteClientState } from '../delivery/interface';
import { toast } from 'sonner';

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

    const handleSearch = async () => {
        if (!searchId.trim()) {
            addLog('❌ Introduce un ID válido');
            return;
        }
        setState((prev: DeleteClientState) => ({ ...prev, isDeleting: true }));

        try {
            const result = await getClientById(searchId.trim(), addLog);
            if (result.success && result.data) {
                addLog(`✅ Datos recibidos: ${JSON.stringify(result.data)}`);
                setState((prev: DeleteClientState) => ({
                    ...prev,
                    clientToDelete: result.data,
                    isDeleting: false,
                    deleteResult: null
                }));
                addLog(`✅ Estado actualizado - Cliente cargado para eliminación`);
            } else {
                setState((prev: DeleteClientState) => ({
                    ...prev,
                    isDeleting: false,
                    clientToDelete: null,
                    deleteResult: null
                }));
                toast.error(result.error || '❌ Error al buscar el cliente');
                addLog(`❌ Error al buscar el cliente: ${result.error}`);
            }
        } catch (error) {
            toast.error('❌ Error al buscar el cliente');
            addLog(`❌ Error al buscar el cliente: ${error}`);
            setState((prev: DeleteClientState) => ({
                ...prev,
                isDeleting: false,
                clientToDelete: null,
                deleteResult: false
            }));
        }
    };

    const handleDeleteRequest = () => {
        setShowConfirmModal(true);
    };

    const handleCancelDelete = () => {
        setShowConfirmModal(false);
        addLog('🚫 Eliminación cancelada por el usuario');
    };

    const handleConfirmDelete = async () => {
        if (!state.clientToDelete) {
            toast.error('❌ No hay cliente seleccionado para eliminar');
            addLog('❌ No hay cliente seleccionado para eliminar');
            return;
        }

        setState((prev: DeleteClientState) => ({ ...prev, isDeleting: true }));
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
            } else {
                toast.error(result.error || '❌ Error al eliminar el cliente');
                addLog(`❌ Error al eliminar el cliente: ${result.error}`);
                setState((prev: DeleteClientState) => ({
                    ...prev,
                    deleteResult: false,
                    isDeleting: false
                }));
                setShowConfirmModal(false);
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
        // Estados
        state,
        searchId,
        showConfirmModal,
        
        // Funciones
        setSearchId,
        handleSearch,
        handleDeleteRequest,
        handleCancelDelete,
        handleConfirmDelete,
        handleReset
    };
};