'use client';
import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Skeleton } from 'antd';
import { Card,Typography } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import SearchActions from './components/searchActions';
const ClientResult = lazy(() => import('./components/clientResult'));
import NotFoundMessage from './components/notFoundMessage';
import LogDisplay from './components/logDisplay';

import type { LogEntry, ClientData } from '../../../utils/commonInterface';

interface Props {
  result: ClientData | null;
  email: string;
}

const ClientResultEmail: React.FC<Props> = ({ result, email }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [lastResult, setLastResult] = useState<ClientData | null>(result);
  const [loading, setLoading] = useState(false);


  const { Title } = Typography;
  useEffect(() => {
    setLoading(true);
    setLastResult(result);
    if (email) {
      if (result) {
        toast.success(`Cliente encontrado para email: ${email}`);
      } else {
        toast.error(`No se encontró cliente para email: ${email}`);
      }
    }
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 segundo de Skeleton
    return () => clearTimeout(timer);
  }, [result, email]);

  const clearResults = () => {
    setLogs([]);
    setLastResult(null);
  };
  return (
    <Card>
      <div className="space-y-4">
        <Title level={4}>📧 Buscar Cliente por Email</Title>
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
        )}
        <LogDisplay logs={logs} />
      </div>
    </Card>
  );
};
export default ClientResultEmail;