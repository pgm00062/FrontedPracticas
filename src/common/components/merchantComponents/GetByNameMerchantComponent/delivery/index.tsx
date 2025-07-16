'use client'

import React, { useState } from 'react';
import type { MerchantData, LogEntry } from './interface';
import { createLogEntry } from '../infrastructure/logOperations';
import { searchMerchantByName } from '../infrastructure/merchantSearchOperations';

import SearchForm from './components/searchForm';
import SearchActions from './components/searchActions';
import MerchantResultsList from './components/merchantResult';
import NotFoundMessage from './components/notFoundMessage';
import LogDisplay from './components/logDisplay';
import { toast } from 'sonner';

const GetByNameMerchantComponent: React.FC = () => {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [merchantName, setMerchantName] = useState('');
    const [searchResults, setSearchResults] = useState<MerchantData[]>([]);
    const [lastResult, setLastResult] = useState<MerchantData | null>(null);
    const [selectedMerchant, setSelectedMerchant] = useState<MerchantData | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const addLog = (message: string) => {
        const logEntry: LogEntry = createLogEntry(message);
        setLogs(prev => [...prev, logEntry]);
    };

    const clearResults = () => {
        setLogs([]);
        setLastResult(null);
        setSearchResults([]);
        setSelectedMerchant(null);
    };

    const handleSearch = () => {
        if(merchantName.trim()) {
            getMerchantByName(merchantName.trim());
        }else{
            toast.error('❌ Por favor, introduce un nombre de comerciante válido');
            addLog('Por favor, introduce un nombre de comerciante válido');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSelectMerchant = (merchant: MerchantData) => {
        setSelectedMerchant(merchant);
        setLastResult(merchant);
        addLog(`🏪 Comerciante seleccionado: ${merchant.name} (ID: ${merchant.merchantId})`);
    };

    const getMerchantByName = async (name: string) => {
        clearResults();
        setIsCreating(true);
        try{
            const result = await searchMerchantByName(name,addLog);

            if(result.success && result.data){
                setSearchResults(result.data);
                setSelectedMerchant(result.data[0] || null);
                setLastResult(result.data[0] || null);
                toast.success(`✅ Comerciante encontrado: ${result.data[0]?.name || 'N/A'}`);
                addLog(`✅ Comerciante encontrado: ${result.data[0]?.name || 'N/A'}`);
            }else{
                toast.error(result.error || '❌ No se encontraron comerciantes');
                addLog(`❌ Error al buscar comerciante: ${result.error || 'No se encontraron comerciantes'}`);
                setSearchResults([]);
                setSelectedMerchant(null);
                setLastResult(null);
            }
        }catch (error) {
            toast.error(`❌ Error al buscar comerciante: ${error instanceof Error ? error.message : 'Error desconocido'}`);
            addLog(`❌ Error al buscar comerciante: ${error instanceof Error ? error.message : 'Error desconocido'}`);
            setSearchResults([]);
            setSelectedMerchant(null);
            setLastResult(null);
        }finally {
            setIsCreating(false);
        }
    }

    return (
        <div className ="card">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
                🏪 Buscar Comerciante por nombre
            </h2>

            <div className="mb-4">
                <SearchForm
                    merchantName={merchantName}
                    onClientIdChange={setMerchantName}
                    onSearch={handleSearch}
                    onKeyPress={handleKeyPress}
                    isSearching={isCreating}
                />
                <SearchActions
                    onClearResults={clearResults}
                    isSearching={isCreating}
                    logs={logs}
                    lastResult={lastResult}
                />
                <MerchantResultsList
                    merchants={searchResults}
                    selectedMerchant={selectedMerchant}
                    onSelectMerchant={handleSelectMerchant}
                />
                <NotFoundMessage
                    logs={logs}
                    lastResult={lastResult}
                    isSearching={isCreating}
                    merchantName={merchantName}
                />
                <LogDisplay logs={logs} />

            </div>
        </div>
    );
}
export default GetByNameMerchantComponent;
