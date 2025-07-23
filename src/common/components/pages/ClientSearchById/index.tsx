'use client';
import React, { useState, useEffect } from 'react';
import { Card, Typography, Button,Input } from 'antd';
import { toast } from 'sonner';
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
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [lastResult, setLastResult] = useState<ClientData | null>(result);

  useEffect(() => {
    setLastResult(result);
    if (clientId) {
      setLogs((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          message: result
            ? `Cliente encontrado para ID: ${clientId}`
            : `No se encontró cliente para ID: ${clientId}`,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
      if (result) {
        toast.success(`Cliente encontrado para ID: ${clientId}`);
      } else {
        toast.error(`No se encontró cliente para ID: ${clientId}`);
      }
    }
  }, [result, clientId]);

  const clearResults = () => {
    setLogs([]);
    setLastResult(null);
  };

  return (
    <Card>
      <Title level={4}>🆔 Buscar Cliente por ID</Title>
      <div className="space-y-4">
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