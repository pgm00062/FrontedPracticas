import React from "react";
import { ClientDeleteData } from "../interface";

interface ConfirmDeleteModalProps {
    isOpen: boolean;
    client: ClientDeleteData;
    isDeleting: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
    isOpen,
    client,
    isDeleting,
    onConfirm,
    onCancel
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
                
                {/* ✅ Header */}
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">⚠️</span>
                    <h3 className="text-lg font-bold text-red-800">
                        Confirmar Eliminación
                    </h3>
                </div>

                {/* ✅ Mensaje principal */}
                <div className="mb-4">
                    <p className="text-gray-700 mb-3">
                        ¿Estás seguro de que quieres eliminar <strong>permanentemente</strong> este cliente?
                    </p>
                    
                    {/* ✅ Datos del cliente */}
                    <div className="bg-gray-50 p-3 rounded-lg border">
                        <p className="text-sm font-medium text-gray-800">
                            <strong>ID:</strong> {client.id}
                        </p>
                        <p className="text-sm text-gray-800">
                            <strong>Cliente:</strong> {client.name} {client.surname}
                        </p>
                        <p className="text-sm text-gray-800">
                            <strong>Email:</strong> {client.email}
                        </p>
                    </div>
                </div>

                {/* ✅ Advertencia crítica */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-red-800">
                        <strong>🚨 ADVERTENCIA CRÍTICA:</strong>
                    </p>
                    <ul className="text-sm text-red-700 mt-1 list-disc list-inside space-y-1">
                        <li>Esta acción <strong>NO SE PUEDE DESHACER</strong></li>
                        <li>Se eliminará toda la información del cliente</li>
                        <li>Se perderán todos los datos asociados</li>
                        <li>No habrá forma de recuperar esta información</li>
                    </ul>
                </div>

                {/* ✅ Botones */}
                <div className="flex gap-3">
                    <button
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isDeleting ? (
                            <>
                                <span className="animate-spin">🗑️</span>
                                Eliminando...
                            </>
                        ) : (
                            <>
                                🗑️ SÍ, ELIMINAR PERMANENTEMENTE
                            </>
                        )}
                    </button>
                    <button
                        onClick={onCancel}
                        disabled={isDeleting}
                        className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50"
                    >
                        ❌ Cancelar
                    </button>
                </div>

                {/* ✅ Texto adicional */}
                <p className="text-xs text-gray-500 mt-3 text-center">
                    Por favor, confirma que realmente quieres proceder con esta acción irreversible.
                </p>
            </div>
        </div>
    );
};
export default ConfirmDeleteModal;