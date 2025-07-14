import React from "react";

interface SearchFormProps {
  clientId: string;
  merchantId: string;
  onClientIdChange: (value: string) => void;
  onMerchantIdChange: (value: string) => void;
  onSearch: (clientId: string, merchantId: string) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>, clientId: string, merchantId: string) => void;
  isSearching: boolean;
}


const SearchForm: React.FC<SearchFormProps> = ({
    clientId,
    merchantId,
    onClientIdChange,
    onMerchantIdChange,
    onSearch,
    onKeyPress,
    isSearching
}) => { 
    return (
    <div>
      <label htmlFor="merchantIdInput" className="block text-sm font-medium text-gray-700 mb-2">
        ID del Comerciante
      </label>
      <div className="flex gap-2 flex-wrap">
          {/* Input Client ID */}
          <input
            id="clientIdInput"
            type="text"
            value={clientId}
            onChange={(e) => onClientIdChange(e.target.value)}
            onKeyDown={(e) => onKeyPress(e, clientId, merchantId)}
            placeholder="Introduce el ID del cliente"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
            disabled={isSearching}
          />

          {/* Input Merchant ID */}
          <input
            id="merchantIdInput"
            type="text"
            value={merchantId}
            onChange={(e) => onMerchantIdChange(e.target.value)}
            onKeyDown={(e) => onKeyPress(e, clientId, merchantId)}
            placeholder="Introduce el ID del comerciante"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
            disabled={isSearching}
          />

          {/* Botón de búsqueda */}
          <button
            onClick={() => onSearch(clientId, merchantId)}
            disabled={isSearching || !clientId.trim() || !merchantId.trim()}
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
}
export default SearchForm;