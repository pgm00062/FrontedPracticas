'use client';

import React, { useState } from 'react';
import { Select } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';

import GetByIdClientIDComponent from '../../GetBClientIDComponent/delivery';
import GetClientByEmail from '../../GetClientByEmail/delivery';
import GetClientByName from '../../GetClientByName/delivery';

const { Option } = Select;

const SearchingClients: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const renderSearchComponent = () => {
    switch (selectedOption) {
      case 'id':
        return <GetByIdClientIDComponent />;
      case 'email':
        return <GetClientByEmail />;
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

      <Select
        placeholder="-- Selecciona una opción --"
        style={{ width: '100%' }}
        value={selectedOption || undefined}
        onChange={(value) => setSelectedOption(value)}
        size="large"
        className="mb-4"
      >
        <Option value="">-- Selecciona una opción --</Option>
        <Option value="id">🆔 Buscar por ID</Option>
        <Option value="email">📧 Buscar por Email</Option>
        <Option value="name">👤 Buscar por Nombre</Option>
      </Select>

      <AnimatePresence mode="wait">
        {selectedOption && (
          <motion.div
            key={selectedOption}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            {renderSearchComponent()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default SearchingClients;