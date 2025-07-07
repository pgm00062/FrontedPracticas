'use client';

import React, { useState } from 'react';
import { createLogEntry } from '../infrastructure/logOperations';
import type { LogEntry, ClientData} from './interface';
import { searchClientByEmail } from '../infrastructure/clientSearchOperations'

import SearchForm from './components/searchForm';
import SearchActions from './components/searchActions';
import ClientResult from './components/clientResult';
import NotFoundMessage from './components/notFoundMessage';
import LogDisplay from './components/logDisplay';

const GetClientByEmail: React.FC = () => {

    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [lastResult, setLastResult] = useState<ClientData | null>(null);
    const [clientEmail, setClientEmail] = useState('');

    //Añade mensajes al log usando la función de infrastructure
    const addLog = (message: string) => {
        const logEntry = createLogEntry(message);
        setLogs(prev => [...prev, logEntry]);
    };

    //Limpia el log y resultados anteriores
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
                setLastResult(result.data);
            } else {
                setLastResult(null);
            }
        } catch (error) {
            addLog(`❌ Error inesperado: ${error instanceof Error ? error.message : 'Error desconocido'}`);
            setLastResult(null);
        } finally {
            setIsCreating(false);
        }
    }

    // ⭐ Función para manejar la búsqueda
    const handleSearch = () => {
        if (clientEmail.trim()) {
            getClientByEmail(clientEmail.trim());
        } else {
            addLog('Por favor, introduce un email de cliente válido');
        }
    };
    
    // ⭐ Función para manejar Enter en el input
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
        
    return (
        <div className="card">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">👤 Buscar Cliente por email (con JWT automático)</h2>
            
            <div className="space-y-4">
                {/* ✅ Subcomponente: Formulario de búsqueda */}
                <SearchForm
                    clientEmail={clientEmail}
                    onClientIdChange={setClientEmail}
                    onSearch={handleSearch}
                    onKeyPress={handleKeyPress}
                    isSearching={isCreating}
                />

                {/* ✅ Subcomponente: Botón limpiar resultados */}
                <SearchActions
                    logs={logs}
                    lastResult={lastResult}
                    onClearResults={clearResults}
                    isSearching={isCreating}
                />

                {/* ✅ Subcomponente: Mostrar cliente encontrado */}
                <ClientResult client={lastResult} />

                {/* ✅ Subcomponente: Mensaje cliente no encontrado */}
                <NotFoundMessage
                    logs={logs}
                    lastResult={lastResult}
                    isSearching={isCreating}
                    clientEmail={clientEmail}
                />

                {/* ✅ Subcomponente: Mostrar logs */}
                <LogDisplay logs={logs} />
            </div>
        </div>
    );


}

export default GetClientByEmail;