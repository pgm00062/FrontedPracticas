'use client';

import React, { useState, lazy } from 'react';
import { Card, Typography, Input} from 'antd';
import { motion, AnimatePresence } from 'framer-motion';

import SearchActions from './components/searchActions';
const ClientResultsList = lazy(() => import('./components/clientResult'));
import NotFoundMessage from './components/notFoundMessage';
import LogDisplay from './components/logDisplay';

import type { LogEntry, ClientData } from '../../../utils/commonInterface';

const { Title } = Typography;

interface Props {
  initialClients: ClientData[];
  initialQuery: string;
}

import { useRouter } from 'next/navigation';

const ClientResultsClient: React.FC<Props> = ({ initialClients, initialQuery }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    router.push(`?type=name&value=${encodeURIComponent(value)}`);
  };

  const addLog = (message: string) => {
    setLogs((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        message,
        timestamp: new Date().toLocaleTimeString(),
      }
    ]);
  };

  const clearResults = () => {
    setLogs([]);
    setSelectedClient(null);
    setQuery('');
  };

  const handleSelectClient = (client: ClientData) => {
    setSelectedClient(client);
    addLog(`👤 Cliente seleccionado: ${client.name} ${client.surname} (ID: ${client.id})`);
  };

  return (
    <Card>
      <Title level={4}>👤 Buscar clientes por nombre</Title>
      <Input
        placeholder="Introduce el nombre del cliente..."
        value={query}
        onChange={handleInputChange}
        allowClear
        style={{ marginBottom: 16 }}
      />
      <SearchActions
        logs={logs}
        lastResult={selectedClient}
        onClearResults={clearResults}
        isSearching={false}
      />
      <AnimatePresence mode="wait">
        {initialClients.length > 0 ? (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
          >
            <ClientResultsList
              clients={initialClients}
              selectedClient={selectedClient}
              onSelectClient={handleSelectClient}
            />
          </motion.div>
        ) : (
          <motion.div
            key="notfound"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
          >
            <NotFoundMessage
              logs={logs}
              lastResult={selectedClient}
              isSearching={false}
              clientName={query}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <LogDisplay logs={logs} />
    </Card>
  );
};
export default ClientResultsClient;