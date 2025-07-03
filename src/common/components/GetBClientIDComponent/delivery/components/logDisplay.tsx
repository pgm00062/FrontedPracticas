import React from 'react';
import type { LogEntry } from '../interface';
import { getLogClassName } from '../../infrastructure/logOperations';

interface LogDisplayProps {
  logs: LogEntry[];
}

const LogDisplay: React.FC<LogDisplayProps> = ({ logs }) => {
  if (logs.length === 0) return null;

  return (
    <div className="bg-gray-50 border border-gray-200 p-4 rounded-md">
      <h3 className="text-gray-800 font-medium mb-2">📋 Logs de la operación</h3>
      <div className="space-y-1 max-h-48 overflow-y-auto">
        {logs.map((log) => (
          <div key={log.id} className={getLogClassName(log)}>
            {log.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogDisplay;