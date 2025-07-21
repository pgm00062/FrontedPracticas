'use client';

import React, { useState } from 'react';
import { Card, Typography } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';

import SearchActions from './components/searchActions';
import ClientResultsList from './components/clientResult';
import NotFoundMessage from './components/notFoundMessage';
import LogDisplay from './components/logDisplay';

import type { LogEntry,ClientData } from '../ClientSearchByName/interface';

const { Title } = Typography;

interface Props {
  clients: ClientData[];
}

const ClientResultsClient: React.FC<Props> = ({ clients }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);

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
  };

  const handleSelectClient = (client: ClientData) => {
    setSelectedClient(client);
    addLog(`👤 Cliente seleccionado: ${client.name} ${client.surname} (ID: ${client.id})`);
  };

  return (
    <Card>
      <Title level={4}>👤 Resultados de búsqueda</Title>
      <SearchActions
        logs={logs}
        lastResult={selectedClient}
        onClearResults={clearResults}
        isSearching={false}
      />

      <AnimatePresence mode="wait">
        {clients.length > 0 && (
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
        )}

        {!clients.length && logs.length > 0 && (
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
              clientName={""}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <LogDisplay logs={logs} />
    </Card>
  );
};
export default ClientResultsClient;