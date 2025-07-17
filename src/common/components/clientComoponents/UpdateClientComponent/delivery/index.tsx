'use client'

import SearchAndUpdateForm from './components/SearchAndUpdateForm';
import ClientEditView from './components/ClientEditView';
import ResultDisplay from './components/ResultDisplay';
import { handleOperations } from '../infrastructure/handleOperations';

const UpdateClientComponent: React.FC = () => {
  const{
    state,
    handleSearchIdChange,
    handleSearch,
    handleKeyPress,
    handleInputChange,
    handleUpdate,
    handleReset
  }= handleOperations();

  return (
     <div className="card">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">🔄 Actualizar Cliente</h2>
          <div className="space-y-6">
                  {/* ✅ COMPONENTE 1: Búsqueda */}
                  <SearchAndUpdateForm
                    searchId={state.searchId}
                    isSearching={state.isSearching}
                    currentClient={state.currentClient}
                    onSearchIdChange={handleSearchIdChange}
                    onSearch={handleSearch}
                    onKeyPress={handleKeyPress}
                  />

                  {/* ✅ COMPONENTE 2: Edición (split view) */}
                  {state.currentClient && state.updatedClient && (
                    <ClientEditView
                      currentClient={state.currentClient}
                      updatedClient={state.updatedClient}
                      isUpdating={state.isUpdating}
                      showInstructions={state.showInstructions} 
                      onInputChange={handleInputChange}
                      onUpdate={handleUpdate}
                      onReset={handleReset}
                    />
                  )}

            {/* ... resto de componentes (resultado, logs) ... */}
            <ResultDisplay result={state.result} />

          </div>
    </div>
  );
};

export default UpdateClientComponent;