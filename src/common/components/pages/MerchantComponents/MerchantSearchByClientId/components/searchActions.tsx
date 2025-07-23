import React from 'react';
import type { LogEntry, MerchantData } from '../../../../../utils/commonInterface';

interface SearchActionsProps {
  logs: LogEntry[];
  lastResult: MerchantData[] | null;
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