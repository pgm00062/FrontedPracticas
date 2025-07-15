import React from "react";
import type { UpdateMerchantData } from '../interface';

interface SearchAndUpdateDataFormProps {
  clientId: string;
  merchantId: string;
  isSearching: boolean;
  currentMerchant: UpdateMerchantData | null;

  onClientIdChange: (id: string) => void;
  onMerchantIdChange: (id: string) => void;
  onSearch: () => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchAndUpdateDataForm: React.FC<SearchAndUpdateDataFormProps> = ({
  clientId,
  merchantId,
  isSearching,
  currentMerchant,
  onClientIdChange,
  onMerchantIdChange,
  onSearch,
  onKeyPress,
}) => {
  return (
    <div className="card">
      {/* ✅ Header */}
      <div className="card-header">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          🔄 Actualizar Merchant
        </h2>
        <p className="text-muted">
          {!currentMerchant
            ? "Introduce el ID del merchant y del cliente para buscar y editar"
            : `Editando merchant: ${currentMerchant.name}`}
        </p>
      </div>

      {/* ✅ Contenido principal */}
      <div className="space-y-4">
        {/* ✅ PASO 1: Buscar merchant */}
        {!currentMerchant && (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-2">
              <input
                type="text"
                value={clientId}
                onChange={(e) => onClientIdChange(e.target.value)}
                className="form-input flex-1"
                placeholder="ID del Cliente"
                disabled={isSearching}
                onKeyDown={onKeyPress}
              />
              <input
                type="text"
                value={merchantId}
                onChange={(e) => onMerchantIdChange(e.target.value)}
                className="form-input flex-1"
                placeholder="ID del Comerciante"
                disabled={isSearching}
                onKeyDown={onKeyPress}
              />
              <button
                onClick={onSearch}
                disabled={isSearching || !clientId.trim() || !merchantId.trim()}
                className="btn btn-primary"
              >
                {isSearching ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">🔍</span>
                    Buscando...
                  </span>
                ) : (
                  "Buscar"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default SearchAndUpdateDataForm; 