import React from 'react';
import type { FeignMerchantData } from '../interface';

interface MerchantResultProps {
  merchant: FeignMerchantData | null;
}

const FeignMerchantResult: React.FC<MerchantResultProps> = ({ merchant }) => {
  if (!merchant) return null;

  return (
    <div className="bg-green-50 border border-green-200 p-4 rounded-md">
      <h3 className="text-green-800 font-medium mb-3">✅ Merchant encontrado</h3>
      <div className="bg-white p-4 rounded border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <p className="text-sm text-gray-600">ID del Merchant</p>
            <p className="font-medium">{merchant.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Nombre Completo</p>
            <p className="font-medium">{merchant.name} </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Direccion</p>
            <p className="font-medium">{merchant.address}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Tipo de Merchant</p>
            <p className="font-medium">{merchant.merchantType}</p>
          </div>
        </div>
      </div>
      
      {/* Datos técnicos expandibles */}
      <details className="mt-3">
        <summary className="cursor-pointer text-sm text-green-700 hover:text-green-800">
          📄 Ver datos técnicos completos
        </summary>
        <pre className="text-xs text-green-700 bg-green-100 p-3 rounded overflow-x-auto mt-2">
          {JSON.stringify(merchant, null, 2)}
        </pre>
      </details>
    </div>
  );
};

export default FeignMerchantResult;