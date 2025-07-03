import React from 'react';

interface SearchFormProps {
  clientId: string;
  onClientIdChange: (value: string) => void;
  onSearch: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  isSearching: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({
  clientId,
  onClientIdChange,
  onSearch,
  onKeyPress,
  isSearching
}) => {
  return (
    <div>
      <label htmlFor="clientIdInput" className="block text-sm font-medium text-gray-700 mb-2">
        ID del Cliente
      </label>
      <div className="flex gap-2">
        <input
          id="clientIdInput"
          type="text"
          value={clientId}
          onChange={(e) => onClientIdChange(e.target.value)}
          onKeyDown={onKeyPress}
          placeholder="Introduce el ID del cliente (ej: 12345)"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          disabled={isSearching}
        />
        <button
          onClick={onSearch}
          disabled={isSearching || !clientId.trim()}
          className="btn-primary"
        >
          {isSearching ? '🔄 Buscando...' : '🔍 Buscar'}
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-1">
        Presiona Enter o haz clic en Buscar
      </p>
    </div>
  );
};

export default SearchForm;