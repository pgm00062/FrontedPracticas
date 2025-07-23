'use client'

import React, { useState } from 'react';
import type { LogEntry, MerchantData } from '../../../../utils/commonInterface';
import SearchForm from './components/searchForm';
import SearchActions from './components/searchActions';
import MerchantResult from './components/merchantResult';
import NotFoundMessage from './components/notFoundMessage';
import LogDisplay from './components/logDisplay';
import { toast } from 'sonner';

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
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [lastResult, setLastResult] = useState<MerchantData | null>(initialResult);

  const handleSearch = async (searchClientId: string, searchMerchantId: string) => {
    if (!searchClientId.trim() && !searchMerchantId.trim()) return;
    setIsSearching(true);
    setLogs([]);
    setLastResult(null);

    const params = new URLSearchParams();
    if (searchClientId.trim()) params.append('clientId', searchClientId.trim());
    if (searchMerchantId.trim()) params.append('merchantId', searchMerchantId.trim());

    const response = await fetch(`/api/search-merchant-by-id?${params.toString()}`);
    const data = await response.json();

    setLastResult(data.merchant || null);

    setLogs([
      {
        id: crypto.randomUUID(),
        message: data.merchant
          ? `Comerciante encontrado para ${searchClientId ? 'ClientID' : 'MerchantID'}: ${searchClientId || searchMerchantId}`
          : `No se encontró comerciante para ${searchClientId ? 'ClientID' : 'MerchantID'}: ${searchClientId || searchMerchantId}`,
      },
    ]);

    if (data.merchant) {
      toast.success(
        `Comerciante encontrado para ${searchClientId ? 'ClientID' : 'MerchantID'}: ${searchClientId || searchMerchantId}`
      );
    } else {
      toast.error(
        `No se encontró comerciante para ${searchClientId ? 'ClientID' : 'MerchantID'}: ${searchClientId || searchMerchantId}`
      );
    }

    setIsSearching(false);
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    searchClientId: string,
    searchMerchantId: string
  ) => {
    if (e.key === 'Enter') {
      handleSearch(searchClientId, searchMerchantId);
    }
  };

  const clearResults = () => {
    setLogs([]);
    setLastResult(null);
    setClientId('');
    setMerchantId('');
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">🔎 Buscar Comerciante por ID o ClientID</h2>
      <div className="space-y-4">
        <SearchForm
          clientId={clientId}
          merchantId={merchantId}
          onClientIdChange={setClientId}
          onMerchantIdChange={setMerchantId}
          onSearch={handleSearch}
          onKeyPress={handleKeyPress}
          isSearching={isSearching}
        />
        <SearchActions
          logs={logs}
          lastResult={lastResult}
          onClearResults={clearResults}
          isSearching={isSearching}
        />
        <MerchantResult merchant={lastResult} />
        <NotFoundMessage
          logs={logs}
          lastResult={lastResult}
          isSearching={isSearching}
          merchantId={merchantId}
        />
        <LogDisplay logs={logs} />
      </div>
    </div>
  );
};

export default MerchantResultById;