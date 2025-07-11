'use client'

import React, { useState } from 'react';
import type { LogEntry, FeignMerchantData,FeignMerchantExistState } from './interface';
import {searchMerchantById} from '../infrastructure/feignMerchantExistOperations';

import FeignMerchantResult from './components/merchantResult';
import SearchMerchantActions from './components/searchMerchantActions';
import SearchMerchantForm from './components/searchMerchantForm';
import NotFoundMessage from './components/notFoundMessage';

const FeignMerchantExistComponent: React.FC = () => {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [lastResult, setLastResult] = useState<FeignMerchantData | null>(null);
    const [merchantId, setMerchantId] = useState('');


    // Añade mensajes al log
    const addLog = (message: string) => {
        const logEntry: LogEntry = { id: crypto.randomUUID(), message };
        setLogs(prev => [...prev, logEntry]);
    };

    // Limpia el log y resultados anteriores
    const clearResults = () => {
        setLogs([]);
        setLastResult(null);
    };

    // Función principal para buscar el comercio por ID
    const getByIdMerchant = async (merchantId: string) => {
        clearResults();
        setIsSearching(true);

        try {
            const result = await searchMerchantById(merchantId, addLog);
            
            if (result.success && result.data) {
                setLastResult(result.data);
            } else {
                setLastResult(null);
            }
        } catch (error) {
            addLog(`❌ Error inesperado: ${error instanceof Error ? error.message : 'Error desconocido'}`);
            setLastResult(null);
        } finally {
            setIsSearching(false);
        }
    };

    // Maneja la búsqueda
    const handleSearch = () => {
        if (merchantId.trim()) {
            getByIdMerchant(merchantId.trim());
        } else {
            addLog('Por favor, introduce un ID de comercio válido');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="card"> 
            <h2 className="text-xl font-semibold mb-4 text-gray-800">👤 Buscar Merchant con Feign por ID (con JWT automático)</h2>
            <div className="space-y-4"> 
                <SearchMerchantForm 
                    merchantId={merchantId} 
                    onMerchantIdChange={setMerchantId} 
                    onSearch={handleSearch} 
                    onKeyPress={handleKeyPress}
                    isSearching={isSearching}
                />
                <SearchMerchantActions
                    logs={logs}
                    lastResult={lastResult}
                    onClearResults={clearResults}
                    isSearching={isSearching}
                />
                
                <FeignMerchantResult merchant={lastResult}/>
                
                <NotFoundMessage
                    logs={logs}
                    lastResult={lastResult}
                    isSearching={isSearching}
                    clientId={merchantId}
                />
            </div>
        </div>
            
    );
}
export default FeignMerchantExistComponent;