'use client'

import React, { useState } from 'react';
import { MerchantFormData } from './interface';
import { DEFAULT_MERCHANT_DATA,generateRandomMerchant } from '../infrastructure/merchantDataOperations';
import { createMerchantWithJWT } from '../infrastructure/merchantCreationOperations';

import MerchantFormFields from './components/merchantFormFields';
import FormActions from './components/formActions';
import ResultDisplay from './components/resultDisplay';
import LogDisplay from './components/logDisplay';

const CreateMerchantComponent: React.FC = () => {

    const [merchantData, setMerchantData] = useState<MerchantFormData>(DEFAULT_MERCHANT_DATA);  
    const [logs, setLogs] = useState<string[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [lastResult, setLastResult] = useState<{ success: boolean; error?: string } | null>(null);

    const addLog = (message: string) => {
        const timestamp = new Date().toLocaleTimeString();
        setLogs(prev => [...prev, `${timestamp} - ${message}`]);
    };

    const clearResults = () => {
        setLogs([]);
        setLastResult(null);
    };

    const handleGenerateRandomMerchant = () => {
        setMerchantData(generateRandomMerchant);
        clearResults();
    };  

    const handleInputChange = (field: string, value: string | number) => {
        setMerchantData(prev => ({
            ...prev,
            [field]: value
        }));
        setLastResult(null);
    };

    const isFormValid = () => {
        return merchantData.name.trim() !== '' &&
               merchantData.address.trim() !== '' &&
               merchantData.merchantType !== null;
    };

    const createMerchant = async () => {
        setIsCreating(true);
        clearResults();

        try {
        const result = await createMerchantWithJWT(merchantData, addLog);
        setLastResult(result);
        } catch (error: any) {
        addLog(`❌ Error inesperado: ${error.message}`);
        setLastResult({ success: false, error: error.message });
        } finally {
        setIsCreating(false);
        addLog('🏁 Proceso completado');
        }
    };

    return(
        <div className="card">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">👤 Crear Nuevo Comerciante</h2>
            
            <div className="space-y-6">
                {/* ✅ Subcomponente: Campos del formulario */}
                <MerchantFormFields
                merchantData={merchantData}
                onInputChange={handleInputChange}
                onGenerateRandom={handleGenerateRandomMerchant}
                isDisabled={isCreating}
                />

                {/* ✅ Subcomponente: Botones y acciones */}
                <FormActions
                onCreateMerchant={createMerchant}
                isCreating={isCreating}
                isFormValid={isFormValid()}
                />

                {/* ✅ Subcomponente: Mostrar resultados */}
                <ResultDisplay result={lastResult} />

                <LogDisplay logs={logs} />

            </div>
        </div>
    );
};
export default CreateMerchantComponent;