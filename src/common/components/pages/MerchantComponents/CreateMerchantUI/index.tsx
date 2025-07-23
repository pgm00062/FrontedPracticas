'use client'

import React, { useState } from 'react';
import type { MerchantFormData, CreateMerchantResult } from '../../../../utils/commonInterface';
import { DEFAULT_MERCHANT_DATA, generateRandomMerchant } from './infrastructure/merchantDataOperations';
import { toast } from 'sonner';

import MerchantFormFields from './components/merchantFormFields';
import FormActions from './components/formActions';
import ResultDisplay from './components/resultDisplay';
import LogDisplay from './components/logDisplay';

const CreateMerchantComponent: React.FC = () => {
    const [logs, setLogs] = useState<string[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [lastResult, setLastResult] = useState<CreateMerchantResult | null>(null);
    const [merchantData, setMerchantData] = useState<MerchantFormData>(DEFAULT_MERCHANT_DATA);

    const handleInputChange = (field: keyof MerchantFormData, value: string | number) =>{
        setMerchantData(prev => ({ ...prev, [field]: value }));
    };

    const handleGenerateRandomMerchant = () => {
        setMerchantData(generateRandomMerchant());
    };

    const isFormValid = (): boolean => {
        return (
            merchantData.name.trim() !== '' &&
            merchantData.address.trim() !== '' &&
            merchantData.merchantType !== null
        );
    };

    const createMerchant = async () => {
        setIsCreating(true);
        const response = await fetch('/api/create-merchant', {
            method: 'POST',
            body: JSON.stringify(merchantData),
            headers: { 'Content-Type': 'application/json' }
        });
        const result: CreateMerchantResult = await response.json();
        setLastResult(result);
        setIsCreating(false);

        if (!result.success) {
            toast.error(result.error || '❌ Error desconocido al crear comerciante');
        } else {
            toast.success('Comerciante creado correctamente');
        }
    };

    return (
        <div>
            <MerchantFormFields
                merchantData={merchantData}
                onInputChange={handleInputChange}
                onGenerateRandom={handleGenerateRandomMerchant}
                isDisabled={isCreating}
            />
            <FormActions
                onCreateMerchant={createMerchant}
                isCreating={isCreating}
                isFormValid={isFormValid()}
            />
            <ResultDisplay result={lastResult} />
            <LogDisplay logs={logs} />
        </div>
    );
};
export default CreateMerchantComponent;