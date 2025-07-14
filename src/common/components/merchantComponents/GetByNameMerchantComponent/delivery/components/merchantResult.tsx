import React from 'react';
import type { MerchantData } from '../interface';

interface MerchantResultsListProps {
  merchants: MerchantData[];
  selectedMerchant: MerchantData | null;
  onSelectMerchant: (merchant: MerchantData) => void;
}
const MerchantResultsList: React.FC<MerchantResultsListProps> = ({
  merchants,
  selectedMerchant,
  onSelectMerchant
}) => {
  // No mostrar nada si no hay resultados
  if (merchants.length === 0) return null;

  return (
    <div className="space-y-2">
      {/* Header con contador */}
      <h3 className="text-sm font-medium text-gray-700">
        📋 {merchants.length} comerciante(s) encontrado(s):
      </h3>
      
      {/* Lista de resultados */}
      <div className="grid gap-2">
        {merchants.map((merchant, index) => (
          <div 
            key={merchant.merchantId || index}
            className={`p-3 border rounded-lg cursor-pointer transition-colors ${
              selectedMerchant?.merchantId === merchant.merchantId
                ? 'border-blue-500 bg-blue-50 shadow-sm' 
                : 'border-gray-200 hover:bg-gray-50 hover:border-gray-300'
            }`}
            onClick={() => onSelectMerchant(merchant)}
          >
            <div className="flex justify-between items-center">
              {/* Información principal */}
              <div className="flex-1">
                <p className="font-medium text-gray-900">
                  {merchant.name}
                </p>
                {merchant.address && (
                  <p className="text-sm text-gray-600">{merchant.address}</p>
                )}
                {merchant.merchantType && (
                  <p className="text-xs text-gray-500 mt-1"> {merchant.merchantType}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};