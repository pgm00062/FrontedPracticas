import React from 'react';

interface SearchMerchantFormProps {
  merchantId: string;
  onMerchantIdChange: (value: string) => void;
  onSearch: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  isSearching: boolean;
}

const SearchMerchantForm: React.FC<SearchMerchantFormProps> = ({
  merchantId,
  onMerchantIdChange,
  onSearch,
  onKeyPress,
  isSearching
}) => {
  return (
    <div>
      <label htmlFor="merchantIdInput" className="block text-sm font-medium text-gray-700 mb-2">
        ID del Merchant
      </label>
      <div className="flex gap-2">
        <input
          id="merchantIdInput"
          type="text"
          value={merchantId}
          onChange={(e) => onMerchantIdChange(e.target.value)}
          onKeyDown={onKeyPress}
          placeholder="Introduce el ID del merchant (ej: 12345)"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          disabled={isSearching}
        />
        <button
          onClick={onSearch}
          disabled={isSearching || !merchantId.trim()}
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
};

export default SearchMerchantForm;