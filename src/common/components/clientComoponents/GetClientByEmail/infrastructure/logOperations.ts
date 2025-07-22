import type { LogEntry } from '../../../../utils/commonInterface';

// Función para crear entrada de log
export const createLogEntry = (message: string): LogEntry => {
    const timestamp = new Date().toLocaleTimeString();
    return {
        id: `${Date.now()}-${Math.random()}`,
        message: `[${timestamp}] ${message}`
    };
};

// Función para obtener la clase CSS del log
export const getLogClassName = (log: LogEntry): string => {
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
    
    return logClassName;
};