import { clientServiceClient } from '@/common/utils/httpClient';
import type { ClientData, JWTClientData } from '../delivery/interface';

// Datos por defecto para generar JWT
const DEFAULT_JWT_CLIENT_DATA: JWTClientData = {
    name: 'Debug Cliente',
    surname: 'Test',
    age: 30,
    cifNifNie: '12345678A',
    email: 'debug@test.com',
    phone: '123456789',
    merchantType: null
};

// Resultado de la búsqueda
export interface SearchResult {
    success: boolean;
    data?: ClientData[];
    error?: string;
    statusCode?: number;
}

// Función para generar JWT
export const generateJWTForSearch = async (clientData: JWTClientData): Promise<string> => {
    const response = await clientServiceClient.post('/api/auth/generate-token-client', clientData);
    return response.data.token;
};

// Función principal para buscar cliente por nombre parcial
export const searchClientByName = async (
    name: string,
    onLog: (message: string) => void
): Promise<SearchResult> => {
    onLog(`🚀 Iniciando búsqueda de cliente con nombre: ${name}`);

    try {
        // 🔑 Generar JWT automáticamente antes de la búsqueda
        onLog('🔑 Solicitando JWT al backend...');

        // Datos de cliente para generar el JWT
        const testClientData = DEFAULT_JWT_CLIENT_DATA;

        const jwtResponse = await clientServiceClient.post('/api/auth/generate-token-client', testClientData);
        onLog(`✅ JWT recibido del backend: ${jwtResponse.status}`);

        const jwt = jwtResponse.data.token;
        onLog(`🎫 JWT generado correctamente`);

        // 👤 Buscar cliente con JWT
        onLog(`🔍 Buscando cliente con nombre: ${name} usando JWT...`);
        
        const response = await clientServiceClient.get(`/clients/name?name=${name}`, {
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            },
            timeout: 5000,
            validateStatus: () => true // Aceptar cualquier status code
        });

        if (response.status === 200) {
            const clients: ClientData[] = response.data;//ahora devolvemos una lista de clientes
            onLog(`✅ Clientes encontrados exitosamente: ${JSON.stringify(response.data)}`);

            // ✅ Log de cada cliente encontrado
            clients.forEach((client, index) => {
                onLog(`👤 Cliente ${index + 1}: ${client.name} ${client.surname} (${client.email})`);
            });

            return {
                success: true,
                data: response.data,
                statusCode: response.status
            };
        } else if (response.status === 404) {
            onLog(`❌ Cliente no encontrado: ${response.status} - No existe ningun cliente con nombre ${name}`);
            return {
                success: false,
                error: `Cliente no encontrado: No existen clientes con nombre ${name}`,
                statusCode: response.status
            };
        } else {
            onLog(`❌ Error al obtener cliente: ${response.status} - ${response.statusText}`);
            return {
                success: false,
                error: `Error al obtener cliente: ${response.status} - ${response.statusText}`,
                statusCode: response.status
            };
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        onLog(`❌ Error en la petición: ${errorMessage}`);
        return {
            success: false,
            error: `Error en la petición: ${errorMessage}`,
            statusCode: 0
        };
    }
};