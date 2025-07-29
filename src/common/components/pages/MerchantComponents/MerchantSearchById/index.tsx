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
  const [logs, setLogs] = useState<LogEntry[]>(() => {
    const searchId = initialClientId || initialMerchantId;
    if (searchId) {
      const searchType = initialClientId ? 'ClientID' : 'MerchantID';
      const message = initialResult
        ? `Comerciante encontrado para ${searchType}: ${searchId}`
        : `No se encontró comerciante para ${searchType}: ${searchId}`;
      return [
        {
          id: crypto.randomUUID(),
          message,
        },
      ];
    }
    return [];
  });

  const [lastResult, setLastResult] = useState<MerchantData | null>(initialResult);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    // Re-inicializa logs y resultado cuando cambian los props
    const searchId = initialClientId || initialMerchantId;
    if (searchId) {
      const searchType = initialClientId ? 'ClientID' : 'MerchantID';
      const message = initialResult
        ? `Comerciante encontrado para ${searchType}: ${searchId}`
        : `No se encontró comerciante para ${searchType}: ${searchId}`;
      setLogs([
        {
          id: crypto.randomUUID(),
          message,
        },
      ]);
      setLastResult(initialResult);
    } else {
      setLogs([]);
      setLastResult(null);
    }
  }, [initialResult, initialClientId, initialMerchantId]);

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
    // Simula la carga SSR, desactiva el Skeleton después de un breve tiempo
    setTimeout(() => {
      setLoading(false);
    }, 1200);
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
          <div style={{ marginBottom: 16 }}>
            <Skeleton active paragraph={{ rows: 2 }} />
          </div>
        ) : (
          <>
            <Suspense fallback={<Skeleton active paragraph={{ rows: 2 }} />}>
              <MerchantResult merchant={lastResult} />
            </Suspense>
            <NotFoundMessage
              logs={logs}
              lastResult={lastResult}
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