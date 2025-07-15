import React from 'react';
import type { UpdateMerchantData } from '../interface';

interface CurrentDataFormProps {
  currentMerchant: UpdateMerchantData;
} 

const CurrentDataForm: React.FC<CurrentDataFormProps> = ({ currentMerchant }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
        📋 Datos Actuales
      </h3>
      <div className="bg-gray-50 p-4 rounded-lg space-y-3">
        <div>
          <label className="text-sm font-medium text-gray-600">Nombre</label>
          <div className="bg-white p-2 rounded border text-gray-800">
            {currentMerchant.name}
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Dirección</label>
          <div className="bg-white p-2 rounded border text-gray-800">
            {currentMerchant.address}
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Tipo de Comercio</label>
          <div className="bg-white p-2 rounded border text-gray-800">
            {currentMerchant.merchantType}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CurrentDataForm;