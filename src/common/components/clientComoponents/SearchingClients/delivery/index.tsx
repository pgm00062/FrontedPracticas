'use client'

import React, { useState } from 'react';

import GetByIdClientIDComponent from '../../GetBClientIDComponent/delivery';
import GetClientByEmail from '../../GetClientByEmail/delivery';
import GetClientByName from '../../GetClientByName/delivery';

const  SearchingClients: React.FC = () => {

const [selectedOption, setSelectedOption] = useState<string>('');

  const renderSearchComponent = () => {
    switch (selectedOption) {
      case 'id':
        return <GetByIdClientIDComponent />;
      case 'email':
        return <GetClientByEmail/>;
      case 'name':
        return <GetClientByName />;
      default:
        return null;
    }
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        🔎 Selecciona el tipo de búsqueda :
      </h2>
      <select
        id="search-option"
        className="w-full p-2 border rounded mb-4"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="">-- Selecciona una opción --</option>
        <option value="id">Buscar por ID</option>
        <option value="email">Buscar por Email</option>
        <option value="name">Buscar por Nombre</option>
      </select>

      <div className="mt-4">{renderSearchComponent()}</div>
    </div>
  );
}
export default SearchingClients;
