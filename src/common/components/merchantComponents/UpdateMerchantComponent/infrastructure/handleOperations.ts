import {useState} from 'react';
import { getMerchantById, updateMerchant } from './updateMerchantOperations';
import type { UpdateMerchantData, UpdateMerchantState } from '../delivery/interface';
import { toast } from 'sonner';

export const handleOperations = () => {
    const [state, setState] = useState<UpdateMerchantState>({
        searchClientId: '',
        searchMerchantId: '',
        isSearching: false,
        currentMerchant: null,
        updatedMerchant: null,
        isUpdating: false,
        logs: [],
        result: null,
        showInstructions: true,
    });

    const addLog = (message: string) => {
        setState(prev => ({
            ...prev,
            logs: [...prev.logs, `${new Date().toLocaleTimeString()}: ${message}`]
        }));
    }; 
    const handleSearch = async () => {
        setState(prev => ({ 
            ...prev, 
            isSearching: true,
            showInstructions: true  // Mostrar instrucciones al buscar
        }));
        
        if (!state.searchClientId.trim()) {
            toast.error('❌ Introduce un ID de cliente válido');
            addLog('❌ Introduce un ID de cliente válido');
            return;  
        }else if (!state.searchMerchantId.trim()) {
            toast.error('❌ Introduce un ID de comerciante válido');
            addLog('❌ Introduce un ID de comerciante válido');
            return;
        }

        setState(prev => ({ ...prev, isSearching: true, logs: [] }));

        try {
            const result = await getMerchantById(
                state.searchClientId.trim(),
                state.searchMerchantId.trim(),
                addLog
            );
            
            if (result.success && result.data) {
                addLog(`✅ Datos recibidos: ${JSON.stringify(result.data)}`);
                
                setState(prev => ({
                    ...prev,
                    currentMerchant: result.data,
                    updatedMerchant: { ...result.data }, // Copia para editar
                    isSearching: false
                }));
                
                addLog(`✅ Estado actualizado - Merchant cargado para edición`);
            } else {
                setState(prev => ({
                    ...prev,
                    isSearching: false,
                    currentMerchant: null
                }));
                addLog(`❌ Error al buscar merchant: ${result.error}`);
            }
        } catch (error) {
            setState(prev => ({ ...prev, isSearching: false }));
            addLog(`❌ Error al buscar merchant: ${error}`);
        }
    }

    const handleUpdate = async () => {
        setState(prev => ({ ...prev, isUpdating: true }));

        if (!state.updatedMerchant) {
            toast.error('❌ No hay datos para actualizar');
            addLog('❌ No hay datos para actualizar');
            setState(prev => ({
                ...prev,
                isUpdating: false,
                result: {
                    success: false,
                    error: 'No hay datos para actualizar'
                }
            }));
            return;
        }

        try {
            const result = await updateMerchant(
                state.searchClientId.trim(),
                state.updatedMerchant.id,
                state.updatedMerchant,
                addLog
            );

            if (result.success && result.data) {
                const merchantActualizado = result.data;

                setState(prev => ({
                    ...prev,
                    updatedMerchant: merchantActualizado,
                    isUpdating: false,
                    result: {
                        success: true,
                        merchant: merchantActualizado,
                        message: 'Merchant actualizado exitosamente'
                    }
                }));
                toast.success('✅ Merchant actualizado exitosamente');
                addLog('✅ Merchant actualizado exitosamente');
            } else {
                setState(prev => ({
                    ...prev,
                    isUpdating: false,
                    result: {
                        success: false,
                        error: result.error || 'Error desconocido al actualizar el merchant'
                    }
                }));
                toast.error(result.error || '❌ Error desconocido al actualizar merchant');
                addLog(`❌ Error al actualizar merchant: ${result.error}`);
            }
        } catch (error: any) {
            setState(prev => ({
                ...prev,
                isUpdating: false,
                result: {
                    success: false,
                    error: error.message || 'Excepción desconocida al actualizar'
                }
            }));
            toast.error(error.message || '❌ Excepción desconocida al actualizar merchant');
            addLog(`❌ Error al actualizar merchant: ${error}`);
        }
    };

    const handleInputChange = (field: keyof UpdateMerchantData, value: string | number) => {
        setState(prev => ({
            ...prev,
            updatedMerchant:prev.updatedMerchant ? {
                ...prev.updatedMerchant,
                [field]: value
            } : null
        }));
    };

    const handleClientIdChange = (value: string) => {
        setState(prev => ({ ...prev, searchClientId: value }));
    };

    const handleMerchantIdChange = (value: string) => {
        setState(prev => ({ ...prev, searchMerchantId: value }));
    };

    const handleReset = () => {
        setState({
            searchClientId: '',
            searchMerchantId: '',
            isSearching: false,
            currentMerchant: null,
            updatedMerchant: null,
            isUpdating: false,
            logs: [],
            result: null,
            showInstructions: true // Para mostrar u ocultar instrucciones
        });
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    }
    return {
        state,
        handleSearch,
        handleUpdate,
        handleInputChange,
        handleReset,
        handleClientIdChange,
        handleMerchantIdChange,
        handleKeyPress,
        addLog
    };
}