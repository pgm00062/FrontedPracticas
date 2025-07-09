import React from "react";

interface SearchAndDeleteFormProps {
    searchId: string;
    isSearching: boolean;
    onSearchIdChange: (id: string) => void;
    onSearch: () => void;
    onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchAndDeleteForm: React.FC<SearchAndDeleteFormProps> = ({
    searchId,
    isSearching,
    onSearchIdChange,
    onSearch,
    onKeyPress
}) => {
    return (
        <div className="card">
            <div className="card-header">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    🗑️ Eliminar Cliente
                </h2>
                <p className="text-muted">
                    Introduce el ID del cliente que deseas eliminar
                </p>
            </div>

            <div className="space-y-4">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={searchId}
                        onChange={(e) => onSearchIdChange(e.target.value)}
                        className="form-input flex-1"
                        placeholder="Introduce el ID del cliente (ej: 1751879096509)"
                        disabled={isSearching}
                        onKeyPress={onKeyPress}
                    />
                    <button
                        onClick={onSearch}
                        disabled={isSearching || !searchId.trim()}
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
        </div>
    );
}
export default SearchAndDeleteForm;