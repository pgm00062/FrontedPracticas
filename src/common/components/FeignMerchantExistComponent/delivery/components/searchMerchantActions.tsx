import React from 'react';
import type { LogEntry, FeignMerchantData } from '../interface';

interface SearchActionsProps {
  logs: LogEntry[];
  lastResult: FeignMerchantData | null;
  onClearResults: () => void;
  isSearching: boolean;
}

const SearchMerchantActions: React.FC<SearchActionsProps> = ({
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

export default SearchMerchantActions;