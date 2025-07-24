'use client';

import React, { useState, useEffect } from 'react';
import { Card, Typography, Input } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';

import SearchActions from './components/searchActions';
import ClientResultsList from './components/clientResult';
import NotFoundMessage from './components/notFoundMessage';
import LogDisplay from './components/logDisplay';

import type { LogEntry, ClientData } from '../../../utils/commonInterface';

const { Title } = Typography;

interface Props {
  initialClients: ClientData[];
  initialQuery: string;
}

const ClientResultsClient: React.FC<Props> = ({ initialClients, initialQuery }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);
  const [query, setQuery] = useState(initialQuery);
  const [clients, setClients] = useState<ClientData[]>(initialClients);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (query.trim() === '') {
      setClients(initialClients); // ← Muestra los recientes si el input está vacío
      return;
    }
    const timeout = setTimeout(async () => {
      setLoading(true);
      const res = await fetch(`/api/search-client-by-name?name=${encodeURIComponent(query)}`);
      const data = await res.json();
      setClients(data.clients || []);
      setLoading(false);
    }, 350);
    return () => clearTimeout(timeout);
  }, [query, initialClients]);

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
        onChange={e => setQuery(e.target.value)}
        allowClear
        style={{ marginBottom: 16 }}
      />
      <SearchActions
        logs={logs}
        lastResult={selectedClient}
        onClearResults={clearResults}
        isSearching={loading}
      />

      <AnimatePresence mode="wait">
        {clients.length > 0 ? (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
          >
            <ClientResultsList
              clients={clients}
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
              isSearching={loading}
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