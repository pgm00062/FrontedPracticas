'use client'

import React, { useState } from 'react';
import type { MerchantFormData, CreateMerchantResult } from '../../../../utils/commonInterface';
import { DEFAULT_MERCHANT_DATA, generateRandomMerchant } from './infrastructure/merchantDataOperations';
import { toast } from 'sonner';
import { Button, Spin, Skeleton } from 'antd';
import MerchantFormFields from './components/merchantFormFields';
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
        <div style={{ position: 'relative' }}>
            {/* Overlay de carga */}
            {isCreating && (
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.6)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Spin size="large" tip="Creando comerciante..." />
                </div>
            )}
            <div style={{ opacity: isCreating ? 0.5 : 1 }}>
                <MerchantFormFields
                    merchantData={merchantData}
                    onInputChange={handleInputChange}
                    onGenerateRandom={handleGenerateRandomMerchant}
                    isDisabled={isCreating}
                />
                {/* Botón con Spinner y deshabilitado */}
                <Button
                    type="primary"
                    disabled={!isFormValid() || isCreating}
                    onClick={createMerchant}
                    block
                >
                    {isCreating ? <Spin size="small" /> : 'Crear Comerciante'}
                </Button>
                {/* Skeleton en el resultado */}
                {isCreating ? (
                    <Skeleton active paragraph={{ rows: 1 }} />
                ) : (
                    <ResultDisplay result={lastResult} />
                )}
                <LogDisplay logs={logs} />
            </div>
        </div>
    );
};
export default CreateMerchantComponent;