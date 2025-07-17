'use client';

import React, { useState } from 'react';
import { Input, Button, Card, Typography } from 'antd';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

import type { LogEntry, ClientData } from './interface';
import { createLogEntry } from '../infrastructure/logOperations';
import { searchClientById } from '../infrastructure/clientSearchOperations';

import SearchActions from './components/searchActions';
import ClientResult from './components/clientResult';
import NotFoundMessage from './components/notFoundMessage';
import LogDisplay from './components/logDisplay';

const { Title } = Typography;

const GetByIdClientIDComponent: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [lastResult, setLastResult] = useState<ClientData | null>(null);
  const [clientId, setClientId] = useState('');

  const addLog = (message: string) => {
    const logEntry = createLogEntry(message);
    setLogs((prev) => [...prev, logEntry]);
  };

  const clearResults = () => {
    setLogs([]);
    setLastResult(null);
  };

  const getByIdClientID = async (clientId: string) => {
    clearResults();
    setIsCreating(true);

    try {
      const result = await searchClientById(clientId, addLog);

      if (result.success && result.data) {
        toast.success('✅ Cliente encontrado exitosamente');
        setLastResult(result.data);
      } else {
        toast.error('❌ Cliente no encontrado');
        setLastResult(null);
      }
    } catch (error) {
      toast.error('❌ Error al buscar cliente');
      addLog(
        `❌ Error inesperado: ${
          error instanceof Error ? error.message : 'Error desconocido'
        }`
      );
      setLastResult(null);
    } finally {
      setIsCreating(false);
    }
  };

  const handleSearch = () => {
    if (clientId.trim()) {
      getByIdClientID(clientId.trim());
    } else {
      toast.error('❌ Por favor, introduce un ID de cliente válido');
      addLog('Por favor, introduce un ID de cliente válido');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <Card>
      <Title level={4}>🆔 Buscar Cliente por ID (con JWT automático)</Title>

      <div className="space-y-4">
        {/* Campo de búsqueda */}
        <Input.Search
          placeholder="Introduce el ID del cliente"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          onSearch={handleSearch}
          onKeyDown={handleKeyPress}
          loading={isCreating}
          enterButton="Buscar"
          size="large"
        />

        {/* Acciones extra */}
        <SearchActions
          logs={logs}
          lastResult={lastResult}
          onClearResults={clearResults}
          isSearching={isCreating}
        />

        {/* Resultado (con animación) */}
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

          {!lastResult && logs.length > 0 && !isCreating && (
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
                clientId={clientId}
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
export default GetByIdClientIDComponent;