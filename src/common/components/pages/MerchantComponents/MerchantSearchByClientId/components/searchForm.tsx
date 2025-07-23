import React from 'react';

interface SearchFormProps {
    clientId: string;
    onClientIdChange: (value: string) => void;
    onSearch: (clientId: string) => void;
    onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>, clientId: string) => void;
    isSearching: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({
    clientId,
    onClientIdChange,
    onSearch,
    onKeyPress,
    isSearching
}) => {
    return (
        <div>
            <label htmlFor="clientIdInput" className="block text-sm font-medium text-gray-700 mb-2">
                ID del Cliente
            </label>
            <div className="flex gap-2 flex-wrap">
                {/* Input Client ID */}
                <input
                    id="clientIdInput"
                    type="text"
                    value={clientId}
                    onChange={(e) => onClientIdChange(e.target.value)}
                    onKeyDown={(e) => onKeyPress(e, clientId)}
                    placeholder="Introduce el ID del cliente"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                    disabled={isSearching}
                />

                {/* Botón de búsqueda */}
                <button
                    onClick={() => onSearch(clientId)}
                    disabled={isSearching || !clientId.trim()}
                    className="btn-primary"
                >
                    {isSearching ? '🔄 Buscando...' : '🔍 Buscar'}
                </button>
            </div>
        </div>
    );
}
export default SearchForm;