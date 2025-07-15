'use client'

import SearchAndUpdateForm from './components/seatchAndUpdateForm';
import MerchanEditWiew from './components/merchantEditView';
import ResultDisplay from './components/resultDisplay';
import { handleOperations } from '../infrastructure/handleOperations';
import LogDisplay from './components/logDisplay';

const UpdateMerchantComponent: React.FC = () => {
    const{
        state,
        handleSearch,
        handleKeyPress,
        handleInputChange,
        handleUpdate,
        handleReset,
        handleClientIdChange,
        handleMerchantIdChange,
    }= handleOperations();

    console.log('🔍Estado actual:',state);

    return (
        <div className="space-y-6">
            {/* ✅ COMPONENTE 1: Búsqueda */}
            <SearchAndUpdateForm
                clientId={state.searchClientId}
                merchantId={state.searchMerchantId}
                isSearching={state.isSearching}
                currentMerchant={state.currentMerchant}
                onClientIdChange={handleClientIdChange}
                onMerchantIdChange={handleMerchantIdChange}
                onSearch={handleSearch}
                onKeyPress={handleKeyPress}
            />

            {/* ✅ COMPONENTE 2: Edición (split view) */}
            {state.currentMerchant && state.updatedMerchant && (
                <MerchanEditWiew
                    currentMerchant={state.currentMerchant}
                    updatedMerchant={state.updatedMerchant}
                    isUpdating={state.isUpdating}
                    showInstructions={state.showInstructions} 
                    onInputChange={handleInputChange}
                    onUpdate={handleUpdate}
                    onReset={handleReset}
                />
            )}
            {/* ... resto de componentes (resultado, logs) ... */}
            <ResultDisplay result={state.result} />

            <LogDisplay logs={state.logs} />

            {/* ✅ Botón de reinicio */}
        </div>
    );
};
export default UpdateMerchantComponent;