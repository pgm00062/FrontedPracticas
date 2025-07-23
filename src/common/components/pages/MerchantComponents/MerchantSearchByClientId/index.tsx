'use client'

import React, { useState } from 'react';
import type { LogEntry, MerchantData } from '../../../../utils/commonInterface';

import SearchActions from './components/searchActions';
import MerchantsResults from './components/merchantsResults';
import LogDisplay from './components/logDisplay';
import NotFoundMessage from './components/notFoundMessage';

interface Props {
  initialClientId?: string;
  initialMerchants?: MerchantData[] | null;
}

const GetMerchantsByClientIdComponent: React.FC<Props> = ({
  initialClientId = '',
  initialMerchants = null,
}) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [merchants] = useState<MerchantData[] | null>(initialMerchants);
  const [clientId] = useState(initialClientId);

  // Opcional: log inicial si hay datos
  React.useEffect(() => {
    if (clientId) {
      setLogs([
        {
          id: crypto.randomUUID(),
          message: merchants && merchants.length > 0
            ? `Se encontraron ${merchants.length} comerciantes para el ClientID: ${clientId}`
            : `No se encontraron comerciantes para el ClientID: ${clientId}`,
        },
      ]);
    }
  }, [clientId, merchants]);

  const clearResults = () => {
    setLogs([]);
    // No puedes limpiar merchants ni clientId porque vienen de SSR
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        🆔 Comerciantes asociados al ClientID: {clientId}
      </h2>
      <SearchActions
        logs={logs}
        lastResult={merchants}
        onClearResults={clearResults}
        isSearching={false}
      />
      <MerchantsResults merchants={merchants} />
      <NotFoundMessage
        logs={logs}
        lastResult={merchants}
        isSearching={false}
        clientId={clientId}
      />
      <LogDisplay logs={logs} />
    </div>
  );
};

export default GetMerchantsByClientIdComponent;