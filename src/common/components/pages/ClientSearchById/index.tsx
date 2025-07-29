'use client';
import React, { useState, Suspense, lazy } from 'react';
import { Skeleton } from 'antd';
import { Card, Typography } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';

import type { LogEntry, ClientData } from '../../../utils/commonInterface';
import SearchActions from './components/searchActions';
const ClientResult = lazy(() => import('./components/clientResult'));
import NotFoundMessage from './components/notFoundMessage';
import LogDisplay from './components/logDisplay';
import ButtonDeleteClient from "@/common/components/clientComoponents/SearchDeleteClientButton/delivery";
import ButtonUpdateClient from "@/common/components/clientComoponents/searchUpdateButtonComponent/delivery";

const { Title } = Typography;

interface Props {
  result: ClientData | null;
  clientId: string;
}

const ClientResultById: React.FC<Props> = ({ result, clientId }) => {
  const [logs, setLogs] = useState<LogEntry[]>(() => {
    if (clientId) {
      return [
        {
          id: crypto.randomUUID(),
          message: result
            ? `Cliente encontrado para ID: ${clientId}`
            : `No se encontró cliente para ID: ${clientId}`,
          timestamp: new Date().toLocaleTimeString(),
        },
      ];
    }
    return [];
  });

  const [lastResult, setLastResult] = useState<ClientData | null>(result);
  const [loading, setLoading] = useState(false);

  // Simula la carga visual cuando cambia el clientId o el resultado
  React.useEffect(() => {
    if (clientId) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000); // 1 segundo de Skeleton
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [clientId, result]);

  const clearResults = () => {
    setLogs([]);
    setLastResult(null); // Resetea también el resultado del cliente
  };

  return (
    <Card>
      <Title level={4}>🆔 Buscar Cliente por ID</Title>
      <div className="space-y-4">
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
          <AnimatePresence mode="wait">
            {lastResult && (
              <motion.div
                key="found"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3 }}
              >
                <Suspense fallback={<Skeleton active paragraph={{ rows: 2 }} />}>
                  <ClientResult client={lastResult} />
                </Suspense>
                <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
                  {lastResult && lastResult.id && (
                    <>
                      <ButtonDeleteClient client={lastResult} onDeleted={clearResults} />
                      <ButtonUpdateClient client={lastResult} onBack={clearResults} />
                    </>
                  )}
                </div>
              </motion.div>
            )}
            {!lastResult && logs.length > 0 && (
              <motion.div
                key="notfound"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3 }}
              >
                <NotFoundMessage
                  logs={logs}
                  lastResult={lastResult}
                  isSearching={false}
                  clientId={clientId}
                />
              </motion.div>
            )}
          </AnimatePresence>
        )}
        <LogDisplay logs={logs} />
      </div>
    </Card>
  );
};
export default ClientResultById;