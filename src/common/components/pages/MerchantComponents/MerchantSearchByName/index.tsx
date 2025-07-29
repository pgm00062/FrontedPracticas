'use client'

import React, { useState, useEffect, useMemo } from 'react';
import { Skeleton } from 'antd';
import debounce from 'lodash.debounce';
import type { MerchantData, LogEntry } from '../../../../utils/commonInterface';
import {Input} from 'antd';
import SearchActions from './components/searchActions';
import { Suspense, lazy } from 'react';
const MerchantResultsList = lazy(() => import('./components/merchantResult'));
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

    // Debounced search function
    const debouncedSearch = useMemo(() =>
        debounce((searchTerm: string) => {
            if (searchTerm.trim().length > 1) {
                setLoading(true);
                fetch(`/api/search-merchant-by-name?name=${encodeURIComponent(searchTerm)}`)
                    .then((response) => response.json())
                    .then((data) => {
                        setSearchResults(Array.isArray(data.merchants) ? data.merchants : []);
                        setLastResult(
                            Array.isArray(data.merchants) && data.merchants.length > 0
                                ? data.merchants[data.merchants.length - 1]
                                : null
                        );
                    })
                    .catch(() => {})
                    .finally(() => {
                        setLoading(false);
                    });
            } else {
                setSearchResults([]);
            }
        }, 300)
    , []);

    useEffect(() => {
        debouncedSearch(query);
        return () => {
            debouncedSearch.cancel();
        };
    }, [query, debouncedSearch]);

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
                {/* Skeleton de carga visual mientras loading es true */}
                {loading ? (
                    <div style={{ marginBottom: 16 }}>
                        <Skeleton active paragraph={{ rows: 2 }} />
                    </div>
                ) : (
                    <Suspense fallback={<Skeleton active paragraph={{ rows: 2 }} />}>
                        <MerchantResultsList
                            merchants={searchResults}
                            selectedMerchant={selectedMerchant}
                            onSelectMerchant={handleSelectMerchant}
                        />
                    </Suspense>
                )}
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