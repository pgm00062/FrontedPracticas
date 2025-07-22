import React from 'react';

interface SearchFormProps {
  clientEmail: string;
  onClientIdChange: (value: string) => void;
  onSearch: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  isSearching: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({
  clientEmail,
  onClientIdChange,
  onSearch,
  onKeyPress,
  isSearching
}) => {
  return (
    <div>
      <label htmlFor="clientEmailInput" className="block text-sm font-medium text-gray-700 mb-2">
        Email del Cliente
      </label>
      <div className="flex gap-2">
        <input
          id="clientIdInput"
          type="text"
          value={clientEmail}
          onChange={(e) => onClientIdChange(e.target.value)}
          onKeyDown={onKeyPress}
          placeholder="Introduce el email del cliente (ej: client@example.com)"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          disabled={isSearching}
        />
        <button
          onClick={onSearch}
          disabled={isSearching || !clientEmail.trim()}
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