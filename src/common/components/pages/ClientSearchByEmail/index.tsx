'use client';
import React, { useEffect,useState } from 'react';
import { Card,Typography } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import SearchActions from './components/searchActions';
import ClientResult from './components/clientResult';
import NotFoundMessage from './components/notFoundMessage';
import LogDisplay from './components/logDisplay';

import type { LogEntry, ClientData } from './interface';

interface Props {
  result: ClientData | null;
  email: string;
}

const ClientResultEmail: React.FC<Props> = ({ result, email }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [lastResult, setLastResult] = useState<ClientData | null>(result);


  const { Title } = Typography;
  useEffect(() => {
    setLastResult(result);

    if (email) {
      if (result) {
        toast.success(`Cliente encontrado para email: ${email}`);
      } else {
        toast.error(`No se encontró cliente para email: ${email}`);
      }
    }
  }, [result, email]);

  const clearResults = () => {
    setLogs([]);
    setLastResult(null);
  };
  return (
    <Card>
      <div className="space-y-4">
      <Title level={4}>📧 Buscar Cliente por Email</Title>
        {/* Botón limpiar y estado actual */}
        <SearchActions
          logs={logs}
          lastResult={lastResult}
          onClearResults={clearResults}
          isSearching={false}
        />

        {/* Resultado o mensaje de error con animación */}
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
                clientEmail={email}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Logs */}
        <LogDisplay logs={logs} />
      </div>
    </Card>
  );
};
export default ClientResultEmail;