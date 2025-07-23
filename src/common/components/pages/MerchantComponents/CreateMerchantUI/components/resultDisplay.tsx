import React from 'react';
import type { CreateMerchantResult } from '../../../../../utils/commonInterface';

interface ResultDisplayProps {
  result: CreateMerchantResult | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  if (!result) return null;

  if (result.success) {
    return (
      <div className="bg-green-50 border border-green-200 p-4 rounded-md">
        <h3 className="text-green-800 font-medium mb-2">✅ Comerciante creado exitosamente</h3>
        
        <div className="mb-3">
          <p className="text-sm font-medium text-green-700 mb-1">JWT generado:</p>
          <div className="bg-green-100 p-2 rounded text-xs font-mono break-all text-green-600">
            {result.jwt}
          </div>
        </div>
        
        <div>
          <p className="text-sm font-medium text-green-700 mb-1">Comerciante creado:</p>
          <pre className="text-sm text-green-700 bg-green-100 p-2 rounded overflow-x-auto">
            {JSON.stringify(result.merchant, null, 2)}
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-red-50 border border-red-200 p-4 rounded-md">
      <h3 className="text-red-800 font-medium mb-2">❌ Error al crear comerciante</h3>
      <p className="text-red-700 text-sm">
        {result.error}
      </p>
    </div>
  );
};

export default ResultDisplay;