'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchForm: React.FC = () => {
  const [clientName, setClientName] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  const handleSearch = () => {
    if (clientName.trim()) {
      setIsSearching(true);
      router.push(`/client-microservice?name=${encodeURIComponent(clientName.trim())}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <label htmlFor="clientNameInput" className="block text-sm font-medium text-gray-700 mb-2">
        Nombre del Cliente
      </label>
      <div className="flex gap-2">
        <input
          id="clientNameInput"
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Introduce el nombre del cliente (busqueda parcial del nombre)"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          disabled={isSearching}
        />
        <button
          onClick={handleSearch}
          disabled={isSearching || !clientName.trim()}
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