'use client'

import SearchAndDeleteForm from './components/SearchAndDeleteForm'
import DataClientDeletedForm from './components/DataClientDeletedForm'
import DeleteResultDisplay from './components/DeleteResultDisplay'
import ConfirmDeleteModal from './components/ConfirmDeleteModal'
import {useDeleteClient } from '../infrastructure/handleOperations'

const DeleteClientForm: React.FC = () => {
        const {
        // Estados
        state,
        searchId,
        showConfirmModal,
        
        // Funciones
        setSearchId,
        handleSearch,
        handleDeleteRequest,
        handleCancelDelete,
        handleConfirmDelete,
        handleReset
    } = useDeleteClient();

    return (
        <div className="space-y-6">
            {/* ✅ PASO 1: Formulario de búsqueda */}
            <SearchAndDeleteForm
                searchId={searchId}
                isSearching={state.isDeleting}
                onSearchIdChange={setSearchId}
                onSearch={handleSearch}
                onKeyPress={(e => e.key === 'Enter' && handleSearch())}
            />

            {/* ✅ PASO 2: Mostrar cliente encontrado */}
            {state.clientToDelete && !state.deleteResult && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-yellow-800 mb-3">
                        👤 Cliente encontrado - ¿Confirmar eliminación?
                    </h3>
                    <DataClientDeletedForm
                        dataClientDeleted={state.clientToDelete}
                        onDelete={handleDeleteRequest}  // ✅ CAMBIO: Abre modal
                        onReset={handleReset}
                        isDeleting={state.isDeleting}
                    />
                </div>
            )}

            {/* ✅ PASO 3: Mostrar resultado */}
            <DeleteResultDisplay result={state.deleteResult} />

            {/* ✅ DEBUG: Mostrar logs */}
            {state.logs.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">📋 Logs:</h3>
                    <div className="bg-gray-50 p-3 rounded-lg max-h-64 overflow-y-auto">
                        {state.logs.map((log, index) => (
                            <div key={index} className="text-xs text-gray-600 font-mono">
                                {log}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ✅ NUEVO: Modal de confirmación */}
            {state.clientToDelete && (
                <ConfirmDeleteModal
                    isOpen={showConfirmModal}
                    client={state.clientToDelete}
                    isDeleting={state.isDeleting}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
        </div>
    );
}

export default DeleteClientForm;