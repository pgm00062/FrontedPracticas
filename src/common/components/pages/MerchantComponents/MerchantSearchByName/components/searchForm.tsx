import React from 'react';

interface SearchFormProps {
  merchantName: string;
  onClientIdChange: (value: string) => void;
  onSearch: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  isSearching: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({
  merchantName,
  onClientIdChange,
  onSearch,
  onKeyPress,
  isSearching
}) => {
  return (
    <div>
      <label htmlFor="clientNameInput" className="block text-sm font-medium text-gray-700 mb-2">
        Nombre del Comerciante
      </label>
      <div className="flex gap-2">
        <input
          id="clientIdInput"
          type="text"
          value={merchantName}
          onChange={(e) => onClientIdChange(e.target.value)}
          onKeyDown={onKeyPress}
          placeholder="Introduce el nombre del comerciante (busqueda parcial del nombre)"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          disabled={isSearching}
        />
        <button
          onClick={onSearch}
          disabled={isSearching || !merchantName.trim()}
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