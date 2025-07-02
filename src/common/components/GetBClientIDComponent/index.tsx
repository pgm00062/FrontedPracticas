'use client';

import React, { useState } from 'react';
import { clientServiceClient } from '@/common/utils/httpClient';

const GetByIdClientIDComponent: React.FC = () => {

    const [logs, setLogs] = useState<Array<{id: string, message: string}>>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [lastResult, setLastResult] = useState<any>(null);

    const [clientId, setClientId] = useState('');

    //Añade mensajes al log
    const addLog = (message: string) => {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = { id: `${Date.now()}-${Math.random()}`, message: `[${timestamp}] ${message}` };
        setLogs(prev => [...prev, logEntry]);
    };

    //Limpia el log y resultados anteriores
    const clearResults = () => {
        setLogs([]);
        setLastResult(null);
    };

    const getByIdClientID = async (clientId: string) => {
        clearResults();
        setIsCreating(true);
        addLog(`🚀 Iniciando búsqueda de cliente con ID: ${clientId}`);

        try {
            // 🔑 Generar JWT automáticamente antes de la búsqueda
            addLog('🔑 Solicitando JWT al backend...');
            
            const testClientData = {
                name: 'Debug Cliente',
                surname: 'Test',
                age: 30,
                cifNifNie: '12345678A',
                email: 'debug@test.com',
                phone: '123456789',
                merchantType: null
            };
            
            const jwtResponse = await clientServiceClient.post('/api/auth/generate-token-client', testClientData);
            addLog(`✅ JWT recibido del backend: ${jwtResponse.status}`);

            const jwt = jwtResponse.data.token;
            addLog(`🎫 JWT generado correctamente`);

            // 👤 Buscar cliente con JWT
            addLog(`🔍 Buscando cliente con ID: ${clientId} usando JWT...`);
            
            const response = await clientServiceClient.get(`/clients/${clientId}`, {
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                },
                timeout: 5000,
                validateStatus: () => true // Aceptar cualquier status code
            });

            if (response.status === 200) {
                setLastResult(response.data);
                addLog(`✅ Cliente encontrado exitosamente: ${JSON.stringify(response.data)}`);
            } else if (response.status === 404) {
                addLog(`❌ Cliente no encontrado: ${response.status} - No existe un cliente con ID ${clientId}`);
            } else {
                addLog(`❌ Error al obtener cliente: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            addLog(`❌ Error en la petición: ${error instanceof Error ? error.message : 'Error desconocido'}`);
        } finally {
            setIsCreating(false);
        }
    }

    // ⭐ Función para manejar la búsqueda
    const handleSearch = () => {
        if (clientId.trim()) {
            getByIdClientID(clientId.trim());
        } else {
            addLog('Por favor, introduce un ID de cliente válido');
        }
    };

// ⭐ Función para manejar Enter en el input
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return(
        <div className="card">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">� Buscar Cliente por ID (con JWT automático)</h2>
            
            <div className="space-y-4">
                {/*Buscador por ID*/}
                <div>
                    <label htmlFor="clientIdInput" className="block text-sm font-medium text-gray-700 mb-2">
                        ID del Cliente
                    </label>
                    <div className="flex gap-2">
                        <input
                            id="clientIdInput"
                            type="text"
                            value={clientId}
                            onChange={(e) => setClientId(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Introduce el ID del cliente (ej: 12345)"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            disabled={isCreating}
                        />
                        <button
                            onClick={handleSearch}
                            disabled={isCreating || !clientId.trim()}
                            className="btn-primary"
                        >
                            {isCreating ? '🔄 Buscando...' : '🔍 Buscar'}
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                        Presiona Enter o haz clic en Buscar
                    </p>
                </div>

                {/* ⭐ Botón para limpiar resultados */}
                {(logs.length > 0 || lastResult) && (
                    <button
                        onClick={clearResults}
                        className="btn-secondary btn-small"
                        disabled={isCreating}
                    >
                        🗑️ Limpiar Resultados
                    </button>
                )}

                {/* ⭐ Mostrar cliente encontrado */}
                {lastResult && (
                    <div className="bg-green-50 border border-green-200 p-4 rounded-md">
                        <h3 className="text-green-800 font-medium mb-3">✅ Cliente encontrado</h3>
                        <div className="bg-white p-4 rounded border">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                    <p className="text-sm text-gray-600">ID del Cliente</p>
                                    <p className="font-medium">{lastResult.id}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Nombre Completo</p>
                                    <p className="font-medium">{lastResult.name} {lastResult.surname}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Email</p>
                                    <p className="font-medium">{lastResult.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Teléfono</p>
                                    <p className="font-medium">{lastResult.phone}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Edad</p>
                                    <p className="font-medium">{lastResult.age} años</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">DNI/CIF/NIE</p>
                                    <p className="font-medium">{lastResult.cifNifNie}</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Datos técnicos expandibles */}
                        <details className="mt-3">
                            <summary className="cursor-pointer text-sm text-green-700 hover:text-green-800">
                                📄 Ver datos técnicos completos
                            </summary>
                            <pre className="text-xs text-green-700 bg-green-100 p-3 rounded overflow-x-auto mt-2">
                                {JSON.stringify(lastResult, null, 2)}
                            </pre>
                        </details>
                    </div>
                )}

                {/* ⭐ Mostrar mensaje si no encuentra el cliente */}
                {logs.length > 0 && !lastResult && !isCreating && (
                    <div className="bg-red-50 border border-red-200 p-4 rounded-md">
                        <h3 className="text-red-800 font-medium mb-2">❌ Cliente no encontrado</h3>
                        <p className="text-red-700">
                            No se encontró ningún cliente con el ID: <strong>"{clientId}"</strong>
                        </p>
                        <p className="text-sm text-red-600 mt-2">
                            • Verifica que el ID sea correcto<br/>
                            • Asegúrate de que el cliente existe en la base de datos<br/>
                            • Revisa los logs de la operación más abajo para más detalles
                        </p>
                    </div>
                )}

                {/* ⭐ Mostrar logs de la operación */}
                {logs.length > 0 && (
                    <div className="bg-gray-50 border border-gray-200 p-4 rounded-md">
                        <h3 className="text-gray-800 font-medium mb-2">📋 Logs de la operación</h3>
                        <div className="space-y-1 max-h-48 overflow-y-auto">
                            {logs.map((log) => {
                                let logClassName = 'text-xs font-mono p-2 rounded ';
                                
                                if (log.message.includes('✅') || log.message.includes('exitosamente')) {
                                    logClassName += 'text-green-700 bg-green-100';
                                } else if (log.message.includes('❌') || log.message.includes('Error')) {
                                    logClassName += 'text-red-700 bg-red-100';
                                } else if (log.message.includes('🔑') || log.message.includes('🎫')) {
                                    logClassName += 'text-blue-700 bg-blue-100';
                                } else {
                                    logClassName += 'text-gray-600 bg-white';
                                }
                                
                                return (
                                    <div key={log.id} className={logClassName}>
                                        {log.message}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )

}

export default GetByIdClientIDComponent;