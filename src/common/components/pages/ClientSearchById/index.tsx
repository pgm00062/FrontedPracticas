'use client';
import React, { useState } from 'react';
import { Card, Typography } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';

import type { LogEntry, ClientData } from '../../../utils/commonInterface';
import SearchActions from './components/searchActions';
import ClientResult from './components/clientResult';
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

  const [lastResult] = useState<ClientData | null>(result);

  const clearResults = () => {
    setLogs([]);
  };

  return (
    <Card>
      <Title level={4}>🆔 Buscar Cliente por ID</Title>
      <div className="space-y-4">
        {/* Mensaje visual en vez de toast */}
        {clientId && (
          <div style={{ marginBottom: 12 }}>
            {result ? (
              <span style={{ color: 'green', fontWeight: 500 }}>
                ✅ Cliente encontrado para ID: {clientId}
              </span>
            ) : (
              <span style={{ color: 'red', fontWeight: 500 }}>
                ❌ No se encontró cliente para ID: {clientId}
              </span>
            )}
          </div>
        )}

        <SearchActions
          logs={logs}
          lastResult={lastResult}
          onClearResults={clearResults}
          isSearching={false}
        />

        <AnimatePresence mode="wait">
          {lastResult && (
            <motion.div
              key="found"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
            >
              <ClientResult client={lastResult} />
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

        <LogDisplay logs={logs} />
      </div>
    </Card>
  );
};
export default ClientResultById;