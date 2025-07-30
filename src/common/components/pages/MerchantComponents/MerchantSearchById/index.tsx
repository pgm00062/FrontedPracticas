'use client'

import React, { useState } from 'react';
import { Skeleton } from 'antd';
import { useRouter } from 'next/navigation';
import type { LogEntry, MerchantData } from '../../../../utils/commonInterface';
import SearchForm from './components/searchForm';
import SearchActions from './components/searchActions';
import { Suspense, lazy } from 'react';
const MerchantResult = lazy(() => import('./components/merchantResult'));
import NotFoundMessage from './components/notFoundMessage';
import ButtonUpdateMerchant from '@/common/components/merchantComponents/ButtonUpdateMerchant/delivery';
import LogDisplay from './components/logDisplay';

interface Props {
  initialClientId?: string;
  initialMerchantId?: string;
  initialResult?: MerchantData | null;
}

const MerchantResultById: React.FC<Props> = ({
  initialClientId = '',
  initialMerchantId = '',
  initialResult = null,
}) => {
  const [clientId, setClientId] = useState(initialClientId);
  const [merchantId, setMerchantId] = useState(initialMerchantId);
  const router = useRouter();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [lastResult, setLastResult] = useState<MerchantData | null>(null);
  const [loading, setLoading] = useState(false);

  const clearResults = () => {
    setLogs([]);
    setLastResult(null);
    setClientId('');
    setMerchantId('');
  };

  const handleSearch = () => {
    setLogs([]);
    setLastResult(null);
    setLoading(true);
    const params = new URLSearchParams();
    if (clientId.trim()) params.append('clientId', clientId.trim());
    if (merchantId.trim()) params.append('merchantId', merchantId.trim());
    router.push(`?${params.toString()}`);
    setTimeout(() => setLoading(false), 600);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        🔎 Buscar Comerciante por ID o ClientID
      </h2>
      <div className="space-y-4">
        <SearchForm
          clientId={clientId}
          merchantId={merchantId}
          onClientIdChange={setClientId}
          onMerchantIdChange={setMerchantId}
          onSearch={handleSearch}
          onKeyPress={handleKeyPress}
          isSearching={loading}
        />
        <SearchActions
          logs={logs}
          lastResult={lastResult}
          onClearResults={clearResults}
          isSearching={loading}
        />
        {/* Skeleton de carga visual mientras loading es true */}
        {loading ? (
          <Skeleton active paragraph={{ rows: 2 }} />
        ) : (
          <>
            <MerchantResult merchant={initialResult} />
            {/* Botón de actualizar merchant si hay resultado */}
            <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
              {initialResult && initialResult.merchantId && (
                  <ButtonUpdateMerchant merchant={initialResult} onBack={clearResults} />
              )}
            </div>
            <NotFoundMessage
              logs={logs}
              lastResult={initialResult}
              isSearching={false}
              merchantId={merchantId}
            />
            <LogDisplay logs={logs} />
          </>
        )}
      </div>
    </div>
  );
};

export default MerchantResultById;