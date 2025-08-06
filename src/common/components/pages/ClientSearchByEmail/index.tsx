'use client';
import React, {useState, Suspense, lazy } from 'react';
import { Skeleton } from 'antd';
import { Card,Typography } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import SearchActions from './components/searchActions';
const ClientResult = lazy(() => import('./components/clientResult'));
import NotFoundMessage from './components/notFoundMessage';
import LogDisplay from './components/logDisplay';
import { useService } from '@/common/hooks/useService';
import { toast } from 'sonner';
import type { LogEntry, ClientData } from '../../../utils/commonInterface';
import type { Props } from './interface';

const ClientResultEmail: React.FC<Props> = ({ result, email }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [lastResult, setLastResult] = useState<ClientData | null>(null);
  const [loading, setLoading] = useState(false);
  const [inputEmail, setInputEmail] = useState(email);
  const router = require('next/navigation').useRouter();
  const { Title } = Typography;
  const {executeUseCase} = useService();

  const handleSearch = () => {
    setLogs([]);
    setLastResult(null);
    setLoading(true);

    try{
      const client: any = executeUseCase('getClientByEmail', { email: inputEmail });
      setLastResult(client);
    }catch (error: any) {
      const errorMessage = error.body?.error || error.statusText || 'Error al buscar cliente';
      toast.error(`❌ ${errorMessage}`);
    } finally {
      setLoading(false);
      router.push(`?email=${encodeURIComponent(inputEmail)}`);
    }
  };

  const clearResults = () => {
    setLogs([]);
    setLastResult(null);
    setInputEmail('');
  };
  return (
    <Card>
      <div className="space-y-4">
        <Title level={4}>📧 Buscar Cliente por Email</Title>
        <input
          type="text"
          value={inputEmail}
          onChange={e => setInputEmail(e.target.value)}
          placeholder="Introduce el email del cliente..."
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
                  clientEmail={inputEmail}
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