import React from 'react';
import type { ClientFormData } from '../interface';

interface ClientFormFieldsProps {
  clientData: ClientFormData;
  onInputChange: (field: keyof ClientFormData, value: string | number) => void;
  onGenerateRandom: () => void;
  isDisabled?: boolean;
}

const ClientFormFields: React.FC<ClientFormFieldsProps> = ({
  clientData,
  onInputChange,
  onGenerateRandom,
  isDisabled = false
}) => {
  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button
          onClick={onGenerateRandom}
          className="btn-secondary"
          disabled={isDisabled}
        >
          🎲 Generar Datos Aleatorios
        </button>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-md space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre *
            </label>
            <input
              id="name"
              type="text"
              value={clientData.name}
              onChange={(e) => onInputChange('name', e.target.value)}
              disabled={isDisabled}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              placeholder="Ej: Juan"
            />
          </div>
          
          <div>
            <label htmlFor="surname" className="block text-sm font-medium text-gray-700 mb-1">
              Apellido *
            </label>
            <input
              id="surname"
              type="text"
              value={clientData.surname}
              onChange={(e) => onInputChange('surname', e.target.value)}
              disabled={isDisabled}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              placeholder="Ej: Pérez"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              id="email"
              type="email"
              value={clientData.email}
              onChange={(e) => onInputChange('email', e.target.value)}
              disabled={isDisabled}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              placeholder="Ej: juan.perez@email.com"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono *
            </label>
            <input
              id="phone"
              type="text"
              value={clientData.phone}
              onChange={(e) => onInputChange('phone', e.target.value)}
              disabled={isDisabled}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              placeholder="Ej: 123456789"
            />
          </div>
          
          <div>
            <label htmlFor="cifNifNie" className="block text-sm font-medium text-gray-700 mb-1">
              CIF/NIF/NIE *
            </label>
            <input
              id="cifNifNie"
              type="text"
              value={clientData.cifNifNie}
              onChange={(e) => onInputChange('cifNifNie', e.target.value)}
              disabled={isDisabled}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              placeholder="Ej: 12345678A"
            />
          </div>
          
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
              Edad *
            </label>
            <input
              id="age"
              type="number"
              min="18"
              max="120"
              value={clientData.age}
              onChange={(e) => onInputChange('age', parseInt(e.target.value) || 18)}
              disabled={isDisabled}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              placeholder="Ej: 30"
            />
          </div>
        </div>
        
        <div className="text-xs text-gray-600">
          * Campos requeridos
        </div>
      </div>
    </div>
  );
};

export default ClientFormFields;