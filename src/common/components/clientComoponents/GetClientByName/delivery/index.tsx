'use client';

import React, { useState } from 'react';
import { Card, Input, Typography } from 'antd';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

import { createLogEntry } from '../infrastructure/logOperations';
import type { LogEntry, ClientData } from './interface';
import { searchClientByName } from '../infrastructure/clientSearchOperations';

import SearchActions from './components/searchActions';
import ClientResultsList from './components/clientResult';
import NotFoundMessage from './components/notFoundMessage';
import LogDisplay from './components/logDisplay';

const { Title } = Typography;

const GetClientByName: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [lastResult, setLastResult] = useState<ClientData | null>(null);
  const [clientName, setClientName] = useState('');
  const [searchResults, setSearchResults] = useState<ClientData[]>([]);
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);

  const addLog = (message: string) => {
    const logEntry = createLogEntry(message);
    setLogs((prev) => [...prev, logEntry]);
  };

  const clearResults = () => {
    setLogs([]);
    setLastResult(null);
    setSearchResults([]);
    setSelectedClient(null);
  };

  const handleSearch = () => {
    if (clientName.trim()) {
      getClientByName(clientName.trim());
    } else {
      toast.error('❌ Por favor, introduce un nombre de cliente válido');
      addLog('Por favor, introduce un nombre de cliente válido');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSelectClient = (client: ClientData) => {
    setSelectedClient(client);
    setLastResult(client);
    addLog(`👤 Cliente seleccionado: ${client.name} ${client.surname} (ID: ${client.id})`);
  };

  const getClientByName = async (name: string) => {
    clearResults();
    setIsCreating(true);

    try {
      const result = await searchClientByName(name, addLog);

      if (result.success && result.data) {
        setSearchResults(result.data);
        setSelectedClient(result.data[0] || null);
        setLastResult(result.data[0] || null);
        toast.success(`✅ ${result.data.length} cliente(s) encontrado(s)`);
        addLog(`✅ ${result.data.length} cliente(s) encontrado(s)`);
      } else {
        toast.error('❌ No se encontraron clientes');
        setSearchResults([]);
      }
    } catch (error) {
      toast.error(`❌ Error al buscar cliente`);
      addLog(`❌ Error inesperado: ${error instanceof Error ? error.message : 'Error desconocido'}`);
      setSearchResults([]);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Card>
      <Title level={4}>👤 Buscar Cliente por Nombre</Title>

      <div className="space-y-4">
        {/* ✅ Input de búsqueda */}
        <Input.Search
          placeholder="Introduce nombre del cliente"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          onSearch={handleSearch}
          onKeyDown={handleKeyPress}
          loading={isCreating}
          enterButton="Buscar"
          size="large"
        />

        {/* ✅ Botón limpiar */}
        <SearchActions
          logs={logs}
          lastResult={lastResult}
          onClearResults={clearResults}
          isSearching={isCreating}
        />

        {/* ✅ Lista de clientes con animación */}
        <AnimatePresence mode="wait">
          {searchResults.length > 0 && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
            >
              <ClientResultsList
                clients={searchResults}
                selectedClient={selectedClient}
                onSelectClient={handleSelectClient}
              />
            </motion.div>
          )}

          {!searchResults.length && logs.length > 0 && !isCreating && (
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
                isSearching={isCreating}
                clientName={clientName}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ✅ Logs */}
        <LogDisplay logs={logs} />
      </div>
    </Card>
  );
};
export default GetClientByName;