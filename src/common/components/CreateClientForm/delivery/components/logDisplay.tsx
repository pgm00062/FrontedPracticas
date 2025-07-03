import React from 'react';

interface LogDisplayProps {
  logs: string[];
}

const LogDisplay: React.FC<LogDisplayProps> = ({ logs }) => {
  if (logs.length === 0) return null;

  return (
    <details className="bg-gray-50 p-3 rounded-md">
      <summary className="cursor-pointer text-sm font-medium text-gray-700">
        📋 Ver logs detallados ({logs.length} entradas)
      </summary>
      <div className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-xs overflow-x-auto max-h-60 overflow-y-auto mt-2">
        {logs.map((log, index) => (
          <div key={`log-${Date.now()}-${index}`} className="mb-1">
            {log}
          </div>
        ))}
      </div>
    </details>
  );
};

export default LogDisplay;