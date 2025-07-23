'use client'

import React, { useState,useEffect } from 'react';
import type { MerchantData, LogEntry } from '../../../../utils/commonInterface';
import {Input} from 'antd';
import SearchActions from './components/searchActions';
import MerchantResultsList from './components/merchantResult';
import NotFoundMessage from './components/notFoundMessage';
import LogDisplay from './components/logDisplay';

interface Props{
    merchants: MerchantData[];
}

const GetByNameMerchantComponent: React.FC<Props> = ({ merchants }) => {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [merchantName, setMerchantName] = useState('');
    const [searchResults, setSearchResults] = useState<MerchantData[]>(merchants);
    const [lastResult, setLastResult] = useState<MerchantData | null>(null);
    const [selectedMerchant, setSelectedMerchant] = useState<MerchantData | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (query.trim().length > 1) {
                setLoading(true);
                    fetch(`/api/search-merchant-by-name?name=${encodeURIComponent(query)}`)
                    .then((response) => response.json())
                    .then((data) => {
                        console.log('API merchants:', data.merchants);
                        setSearchResults(Array.isArray(data.merchants) ? data.merchants : []);
                        setLastResult(
                        Array.isArray(data.merchants) && data.merchants.length > 0
                            ? data.merchants[data.merchants.length - 1]
                            : null
                        );
                    })
                    .catch((error) => { /* ... */ })
                    .finally(() => {
                        setLoading(false);
                    });
            } else {
                setSearchResults([]);
            }
        }, 300);
        return () => clearTimeout(timeout);
    }, [query]);

    const clearResults = () => {
        setLogs([]);
        setLastResult(null);
        setSearchResults([]);
        setSelectedMerchant(null);
    };

    const addLog = (message: string) => {
        setLogs((prev) => [
        ...prev,
        {
            id: crypto.randomUUID(),
            message,
            timestamp: new Date().toLocaleTimeString(),
        }
        ]);
    };

    const handleSelectMerchant = (merchant: MerchantData) => {
        setSelectedMerchant(merchant);
        addLog(`🏪 Comerciante seleccionado: ${merchant.name} (ID: ${merchant.merchantId})`);
    };

    return (
        <div className ="card">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
                🏪 Buscar Comerciante por nombre
            </h2>

            <div className="mb-4">
                <Input
                    placeholder="Introduce el nombre del cliente..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    style={{ marginBottom: 16 }}
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