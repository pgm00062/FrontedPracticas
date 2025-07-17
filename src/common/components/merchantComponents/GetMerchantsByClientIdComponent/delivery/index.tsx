'use client'

import React, { useState } from 'react';
import type { LogEntry, MerchantData } from './interface';
import { searchMerchantsByClientId } from '../infrastructure/merchantsClientIdSearchOperations';

import SearchForm from './components/searchForm';
import SearchActions from './components/searchActions';
import MerchantsResults from './components/merchantsResults';
import LogDisplay from './components/logDisplay';
import NotFoundMessage from './components/notFoundMessage';
import { toast } from 'sonner';

const GetMerchantsByClientIdComponent: React.FC = () => {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [merchants, setMerchants] = useState<MerchantData[] | null>(null);
    const [clientId, setClientId] = useState('');

    const addLog = (message: string) => {
        const logEntry = { id: new Date().toISOString(), message };
        setLogs(prev => [...prev, logEntry]);
    };

    const clearResults = () => {
        setLogs([]);
        setMerchants(null);
    };

    const getMerchantsByClientId = async (clientId: string) => {
        clearResults();
        setIsSearching(true);

        try {
            const result = await searchMerchantsByClientId(clientId, addLog);

            if (result.success && result.data) {
                toast.success('✅ Comercios encontrados exitosamente');
                setMerchants(result.data);
            } else {
                toast.error('❌ No se encontraron comercios');
                setMerchants(null);
            }
        } catch (error) {
            toast.error('❌ Error al buscar los comercios');
            addLog(`❌ Error inesperado: ${error instanceof Error ? error.message : 'Error desconocido'}`);
            setMerchants(null);
        } finally {
            setIsSearching(false);
        }
    };

    const handleSearch = (clientId: string) => {
        if (clientId.trim()) {
            getMerchantsByClientId(clientId.trim());
        } else {
            addLog('❌ El campo de ID de cliente es obligatorio');
        }
    };

    const handleKeyPress = (
        event: React.KeyboardEvent<HTMLInputElement>,
        clientId: string,
        ) => {
        if (event.key === 'Enter') {
            handleSearch(clientId);
        }
    };

    return (
        <div className="card">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">🆔 Buscar Comerciantes por ID de cliente asociado</h2>
            <div className="space-y-4">
                <SearchForm
                    clientId={clientId}
                    onClientIdChange={setClientId}
                    onSearch={handleSearch}
                    onKeyPress={handleKeyPress}
                    isSearching={isSearching}
                />
                <SearchActions
                    logs={logs}
                    lastResult={merchants}
                    onClearResults={clearResults}
                    isSearching={isSearching} 
                />
                <MerchantsResults merchants={merchants} />

                <NotFoundMessage
                    logs={logs}
                    lastResult={merchants}
                    isSearching={isSearching}
                    clientId={clientId}
                />

                <LogDisplay logs={logs} />
            </div>
        </div>   
    )
};
export default GetMerchantsByClientIdComponent;