import React from 'react';
import type { LogEntry, ClientData } from '../../../../utils/commonInterface';

interface SearchActionsProps {
  logs: LogEntry[];
  lastResult: ClientData | null;
  onClearResults: () => void;
  isSearching: boolean;
}

const SearchActions: React.FC<SearchActionsProps> = ({
  logs,
  lastResult,
  onClearResults,
  isSearching
}) => {
  if (logs.length === 0 && !lastResult) return null;

  return (
    <button
      onClick={onClearResults}
      className="btn-secondary btn-small"
      disabled={isSearching}
    >
      🗑️ Limpiar Resultados
    </button>
  );
};

export default SearchActions;