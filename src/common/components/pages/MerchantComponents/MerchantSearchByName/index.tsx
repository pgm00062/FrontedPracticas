'use client'

import React, { useState } from 'react';
import { Skeleton } from 'antd';
import type { MerchantData, LogEntry } from '../../../../utils/commonInterface';
import {Input} from 'antd';
import SearchActions from './components/searchActions';
import {lazy } from 'react';
const MerchantResultsList = lazy(() => import('./components/merchantResult'));
import NotFoundMessage from './components/notFoundMessage';
import LogDisplay from './components/logDisplay';

interface Props{
    merchants: MerchantData[];
}

import { useRouter } from 'next/navigation';

const GetByNameMerchantComponent: React.FC<Props> = ({ merchants }) => {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [merchantName, setMerchantName] = useState('');
    const [lastResult, setLastResult] = useState<MerchantData | null>(null);
    const [selectedMerchant, setSelectedMerchant] = useState<MerchantData | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        setLoading(true);
        router.push(`?name=${encodeURIComponent(value)}`);
        // Simula un retardo 
        setTimeout(() => setLoading(false), 600);
    };

    const clearResults = () => {
        setLogs([]);
        setLastResult(null);
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
                    onChange={handleInputChange}
                    style={{ marginBottom: 16 }}
                />
                <SearchActions
                    onClearResults={clearResults}
                    isSearching={isCreating}
                    logs={logs}
                    lastResult={lastResult}
                />
                {loading ? (
                    <Skeleton active paragraph={{ rows: 2 }} />
                ) : (
                    <MerchantResultsList
                        merchants={merchants}
                        selectedMerchant={selectedMerchant}
                        onSelectMerchant={handleSelectMerchant}
                    />
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