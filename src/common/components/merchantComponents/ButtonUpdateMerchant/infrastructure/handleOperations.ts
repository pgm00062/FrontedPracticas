import {useState} from 'react';
import {updateMerchant} from './updateMerchantOperations';
import type { UpdateMerchantData, UpdateMerchantState } from '@/common/utils/commonInterface';
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
                state.searchMerchantId.trim(),
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

    const initializeUpdateMerchant = (merchant: UpdateMerchantData) => {
        setState(prev => ({
            ...prev,
            updatedMerchant: {...merchant},
            searchClientId: merchant.clientId,
            searchMerchantId: merchant.merchantId || '',
        }));
    }

    return {
        state,
        handleUpdate,
        handleInputChange,
        handleReset,
        initializeUpdateMerchant,
    }
}