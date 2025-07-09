import React from 'react';
import type{ MerchantFormData } from '../interface';

interface MerchantFormFieldsProps {
  merchantData: MerchantFormData;
  onInputChange: (field: keyof MerchantFormData, value: string | number) => void;
  onGenerateRandom: () => void;
  isDisabled?: boolean;
}

const ClientFormFields: React.FC<MerchantFormFieldsProps> = ({
  merchantData,
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
              value={merchantData.name}
              onChange={(e) => onInputChange('name', e.target.value)}
              disabled={isDisabled}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              placeholder="Ej: Juan"
            />
          </div>
          
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Dirección *
            </label>
            <input
              id="address"
              type="text"
              value={merchantData.address}
              onChange={(e) => onInputChange('address', e.target.value)}
              disabled={isDisabled}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              placeholder="Ej: C/alle Pérez 1"
            />
          </div>
          
            <div>
                <label htmlFor="merchantType" className="block text-sm font-medium text-gray-700 mb-1">
                    Merchant Type *
                </label>
                <select
                    id="merchantType"
                    value={merchantData.merchantType ?? ''} // por si está en null
                    onChange={(e) => onInputChange('merchantType', e.target.value)}
                    disabled={isDisabled}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                >
                    <option value="" disabled>Selecciona un tipo</option>
                    <option value="MERCHANT_TYPE_PERSONAL_SERVICES">Personal</option>
                    <option value="MERCHANT_TYPE_FINANCIAL_SERVICES">Finanzas</option>
                </select>
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