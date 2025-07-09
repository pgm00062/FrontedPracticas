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

  // ✅ LOG PARA DEBUG - ver el estado actual
  console.log('🔍 Estado actual:', state);

  return (
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
  );
};

export default UpdateClientComponent;