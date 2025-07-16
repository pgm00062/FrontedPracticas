'use client'

import React, { useState } from 'react';
import type { LogEntry, MerchantData } from './interface';
import { searchMerchantById } from '../infrastructure/merchantSearchOperations';
import SearchForm from './components/searchForm';
import SearchActions from './components/searchActions';
import MerchantResult from './components/merchantResult';
import NotFoundMessage from './components/notFoundMessage';
import LogDisplay from './components/logDisplay';
import { toast } from 'sonner';

const GetByIdMerchantComponent: React.FC = () => {

    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [lastResult, setLastResult] = useState<MerchantData | null>(null);
    const [merchantId, setMerchantId] = useState('');
    const [clientId, setClientId] = useState('');

    const addLog = (message: string) => {
        const logEntry = { id: new Date().toISOString(), message };
        setLogs(prev => [...prev, logEntry]);
    }

    const clearResults = () => {
        setLogs([]);
        setLastResult(null);
    };

    const getByIdMerchantId = async (clientId: string, merchantId: string) => {
        clearResults();
        setIsCreating(true);

        try{
            const result = await searchMerchantById(clientId, merchantId, addLog);

            if (result.success && result.data) {
                toast.success('✅ Comerciante encontrado exitosamente');
                setLastResult(result.data);
            } else {
                toast.error('❌ No se encontró el comerciante');
                setLastResult(null);
            }
        }catch (error) {
            toast.error('❌ Error al buscar el comerciante');
            addLog(`❌ Error inesperado: ${error instanceof Error ? error.message : 'Error desconocido'}`);
            setLastResult(null);
        } finally {
            setIsCreating(false);
        }
    };

    const handleSearch = (clientId: string, merchantId: string) => {
        if (clientId.trim() && merchantId.trim()) {
            getByIdMerchantId(clientId.trim(), merchantId.trim());
        } else {
            addLog('❌ Ambos campos son obligatorios');
        }
    };


    const handleKeyPress = (
        event: React.KeyboardEvent<HTMLInputElement>,
        clientId: string,
        merchantId: string
        ) => {
        if (event.key === 'Enter') {
            handleSearch(clientId, merchantId);
        }
    };


    return(
        <div className="card">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">🆔 Buscar Comerciante por ID</h2>
            <div className="space-y-4">
                <SearchForm
                    clientId={clientId}
                    merchantId={merchantId}
                    onClientIdChange={setClientId}
                    onMerchantIdChange={setMerchantId}
                    onSearch={handleSearch}
                    onKeyPress={handleKeyPress}
                    isSearching={isCreating}
                />
                <SearchActions
                    logs={logs}
                    lastResult={lastResult}
                    onClearResults={clearResults}
                    isSearching={isCreating} 
                />
                <MerchantResult merchant={lastResult} />

                <NotFoundMessage
                    logs={logs}
                    lastResult={lastResult}
                    isSearching={isCreating}
                    merchantId={merchantId}
                />

                <LogDisplay logs={logs} />
            </div>
        </div>          
    )
}
export default GetByIdMerchantComponent;