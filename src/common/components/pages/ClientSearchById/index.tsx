'use client';
import React, { useState, Suspense, lazy } from 'react';
import { Skeleton } from 'antd';
import { Card, Typography } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { useService } from '@/common/hooks/useService';
import type { LogEntry, ClientData } from '../../../utils/commonInterface';
import SearchActions from './components/searchActions';
const ClientResult = lazy(() => import('./components/clientResult'));
import NotFoundMessage from './components/notFoundMessage';
import LogDisplay from './components/logDisplay';
import ButtonDeleteClient from "@/common/components/clientComoponents/SearchDeleteClientButton/delivery";
import ButtonUpdateClient from "@/common/components/clientComoponents/searchUpdateButtonComponent/delivery";
import { toast } from 'sonner';
import type { Props } from './interface';
const { Title } = Typography;

const ClientResultById: React.FC<Props> = ({ result, clientId }) => {
  console.log('Props recibidas en ClientResultById:', { result, clientId });
  
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [lastResult, setLastResult] = useState<ClientData | null>(null);
  const [loading, setLoading] = useState(false);
  const [inputId, setInputId] = useState(clientId);
  const router = require('next/navigation').useRouter();
  const { executeUseCase} = useService();

  const handleSearch = async () => {
    setLogs([]);
    setLastResult(null);
    setLoading(true);

    try {
      const client: any = await executeUseCase('getClientById', { id: inputId });
      setLastResult(client);
    } catch (error: any) {
        const errorMessage = error.body?.error || error.statusText || 'Error al buscar cliente';
        toast.error(`❌ ${errorMessage}`);
    } finally {
      setLoading(false);
      router.push(`?clientId=${encodeURIComponent(inputId)}`);
    }
  };

  const clearResults = () => {
    setLogs([]);
    setLastResult(null);
    setInputId('');
  };

  return (
    <Card>
      <Title level={4}>🆔 Buscar Cliente por ID</Title>
      <div className="space-y-4">
        <input
          type="text"
          value={inputId}
          onChange={e => setInputId(e.target.value)}
          placeholder="Introduce el ID del cliente..."
          style={{ marginBottom: 16, width: '100%' }}
        />
        <button onClick={handleSearch} disabled={loading} style={{ marginBottom: 16 }}>
          Buscar
        </button>
        <SearchActions
          logs={logs}
          lastResult={lastResult}
          onClearResults={clearResults}
          isSearching={loading}
        />
        {loading ? (
          <Skeleton active paragraph={{ rows: 2 }} />
        ) : (
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                key="found"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3 }}
              >
                <Suspense fallback={<Skeleton active paragraph={{ rows: 2 }} />}>
                  <ClientResult client={result} />
                </Suspense>
                <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
                  {result && result.id && (
                    <>
                      <ButtonDeleteClient client={result} onDeleted={clearResults} />
                      <ButtonUpdateClient client={result} onBack={clearResults} />
                    </>
                  )}
                </div>
              </motion.div>
            )}
            {!result && logs.length > 0 && (
              <motion.div
                key="notfound"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3 }}
              >
                <NotFoundMessage
                  logs={logs}
                  lastResult={result}
                  isSearching={false}
                  clientId={inputId}
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