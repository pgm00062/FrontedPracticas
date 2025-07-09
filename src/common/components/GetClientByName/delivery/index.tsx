'use client'

import React, { useState } from 'react';
import { createLogEntry } from '../infrastructure/logOperations';
import type { LogEntry, ClientData } from './interface';
import { searchClientByName } from '../infrastructure/clientSearchOperations';

import SearchForm from './components/searchForm';
import SearchActions from './components/searchActions';
import ClientResultsList from './components/clientResult';
import NotFoundMessage from './components/notFoundMessage';
import LogDisplay from './components/logDisplay';

const GetClientByName: React.FC = () => {

    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [lastResult, setLastResult] = useState<ClientData | null>(null);
    const [clientName, setClientName] = useState('');

    const [searchResults, setSearchResults] = useState<ClientData[]>([]);
    const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);

    //Añade mensajes al log usando la función de infrastructure
    const addLog = (message: string) => {
        const logEntry = createLogEntry(message);
        setLogs(prev => [...prev, logEntry]);
    };

    //Limpia el log y resultados anteriores
    const clearResults = () => {
        setLogs([]);
        setLastResult(null);
        setSearchResults([]);      // ✅ Limpiar lista
        setSelectedClient(null);   // ✅ Limpiar selección
    };

    // ⭐ Función para manejar la búsqueda
    const handleSearch = () => {
        if (clientName.trim()) {
            getClientByName(clientName.trim());
        } else {
            addLog('Por favor, introduce un nombre de cliente válido');
        }
    };
    
    // ⭐ Función para manejar Enter en el input
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // ✅ Función para seleccionar cliente de la lista
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
                
                setSearchResults(result.data);  // ✅ Guardar array completo
                setSelectedClient(result.data[0] || null);  // ✅ Seleccionar el primero
                setLastResult(result.data[0] || null);  // ✅ Para compatibilidad con componentes existentes
                
                addLog(`✅ ${result.data.length} cliente(s) encontrado(s)`);
            } else {
                setSearchResults([]);
                setSelectedClient(null);
                setLastResult(null);
            }
        } catch (error) {
            addLog(`❌ Error inesperado: ${error instanceof Error ? error.message : 'Error desconocido'}`);
            setSearchResults([]);
            setSelectedClient(null);
            setLastResult(null);
        } finally {
            setIsCreating(false);
        }
    }
  
    return (
        <div className="card">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">👤 Buscar Cliente por nombre (con JWT automático)</h2>
            
            <div className="space-y-4">
                {/* ✅ Subcomponente: Formulario de búsqueda */}
                <SearchForm
                    clientName={clientName}
                    onClientIdChange={setClientName}
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

                {/* ✅ NUEVO: Componente de lista de resultados */}
                <ClientResultsList 
                    clients={searchResults}
                    selectedClient={selectedClient}
                    onSelectClient={handleSelectClient}
                />

                {/* ✅ Subcomponente: Mensaje cliente no encontrado */}
                <NotFoundMessage
                    logs={logs}
                    lastResult={lastResult}
                    isSearching={isCreating}
                    clientName={clientName}
                />

                {/* ✅ Subcomponente: Mostrar logs */}
                <LogDisplay logs={logs} />
            </div>
        </div>
    );
}

export default GetClientByName;
