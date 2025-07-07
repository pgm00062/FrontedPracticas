import React from 'react';
import type { ClientUpadateData } from '../interface';

interface SearchAndUpdateFormProps {
    searchId: string;
    isSearching: boolean;
    currentClient: ClientUpadateData | null;

    onSearchIdChange: (id: string) => void;
    onSearch: () => void;
    onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchAndUpdateForm: React.FC<SearchAndUpdateFormProps> = ({
  searchId,
  isSearching,
  currentClient,
  onSearchIdChange,
  onSearch,
  onKeyPress
}) => {
  return (
    <div className="card">
      {/* ✅ Header */}
      <div className="card-header">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          🔄 Actualizar Cliente
        </h2>
        <p className="text-muted">
          {!currentClient 
            ? "Introduce el ID del cliente para buscar y editar"
            : `Editando cliente: ${currentClient.name} ${currentClient.surname}`
          }
        </p>
      </div>

      {/* ✅ Contenido principal */}
      <div className="space-y-4">
        {/* ✅ PASO 1: Buscar cliente (solo si no hay cliente cargado) */}
        {!currentClient && (
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
                  '🔍 Buscar'
                )}
              </button>
            </div>
            
            {/* ✅ Información adicional */}
            <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
              <p className="font-medium text-blue-800 mb-1">💡 Instrucciones:</p>
              <ul className="text-blue-700 space-y-1">
                <li>• Introduce el ID numérico del cliente que quieres actualizar</li>
                <li>• Puedes usar Enter para buscar rápidamente</li>
                <li>• Una vez encontrado, podrás editar sus datos</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAndUpdateForm;