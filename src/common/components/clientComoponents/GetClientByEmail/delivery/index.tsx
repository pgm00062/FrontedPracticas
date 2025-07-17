'use client';

import React, { useState } from 'react';
import { Card, Input, Typography } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

import { createLogEntry } from '../infrastructure/logOperations';
import type { LogEntry, ClientData } from './interface';
import { searchClientByEmail } from '../infrastructure/clientSearchOperations';

import SearchActions from './components/searchActions';
import ClientResult from './components/clientResult';
import NotFoundMessage from './components/notFoundMessage';
import LogDisplay from './components/logDisplay';

const { Title } = Typography;

const GetClientByEmail: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [lastResult, setLastResult] = useState<ClientData | null>(null);
  const [clientEmail, setClientEmail] = useState('');

  const addLog = (message: string) => {
    const logEntry = createLogEntry(message);
    setLogs((prev) => [...prev, logEntry]);
  };

  const clearResults = () => {
    setLogs([]);
    setLastResult(null);
  };

  const getClientByEmail = async (email: string) => {
    clearResults();
    setIsCreating(true);

    try {
      const result = await searchClientByEmail(email, addLog);

      if (result.success && result.data) {
        toast.success('✅ Cliente encontrado exitosamente');
        setLastResult(result.data);
      } else {
        toast.error('❌ Cliente no encontrado');
        setLastResult(null);
      }
    } catch (error) {
      toast.error('❌ Error inesperado');
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
    if (clientEmail.trim()) {
      getClientByEmail(clientEmail.trim());
    } else {
      toast.error('❌ Por favor, introduce un email de cliente válido');
      addLog('Por favor, introduce un email de cliente válido');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Card>
      <Title level={4}>📧 Buscar Cliente por Email (con JWT automático)</Title>

      <div className="space-y-4">
        {/* Campo búsqueda */}
        <Input.Search
          placeholder="Introduce el email del cliente"
          value={clientEmail}
          onChange={(e) => setClientEmail(e.target.value)}
          onSearch={handleSearch}
          onKeyDown={handleKeyPress}
          loading={isCreating}
          enterButton="Buscar"
          size="large"
        />

        {/* Botón limpiar y estado actual */}
        <SearchActions
          logs={logs}
          lastResult={lastResult}
          onClearResults={clearResults}
          isSearching={isCreating}
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
                clientEmail={clientEmail}
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
export default GetClientByEmail;