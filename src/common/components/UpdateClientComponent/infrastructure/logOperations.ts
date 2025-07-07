// Función para crear entrada de log con timestamp
export const createLogEntry = (message: string): string => {
    const timestamp = new Date().toLocaleTimeString();
    return `[${timestamp}] ${message}`;
};

// Función para obtener la clase CSS del log
export const getLogClassName = (log: string): string => {
    let logClassName = 'text-xs font-mono p-2 rounded ';
    
    if (log.includes('✅') || log.includes('exitosamente')) {
        logClassName += 'text-green-700 bg-green-100';
    } else if (log.includes('❌') || log.includes('Error')) {
        logClassName += 'text-red-700 bg-red-100';
    } else if (log.includes('🔑') || log.includes('🎫')) {
        logClassName += 'text-blue-700 bg-blue-100';
    } else if (log.includes('🚀') || log.includes('👤')) {
        logClassName += 'text-purple-700 bg-purple-100';
    } else {
        logClassName += 'text-gray-600 bg-white';
    }
    
    return logClassName;
};