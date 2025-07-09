import React from "react";
import { ClientDeleteData } from "../interface";

interface DataClientDeletedProps {
    dataClientDeleted: ClientDeleteData;
    onDelete?: () => void;
    onReset?: () => void;
    isDeleting?: boolean;
}   

const DataClientDeletedForm: React.FC<DataClientDeletedProps> = ({ 
    dataClientDeleted,
    onDelete,
    onReset,
    isDeleting = false
}) => {
    return (
        <div className="space-y-4">
            {/* ✅ Título */}
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                📋 Datos del Cliente
            </h3>
            
            {/* ✅ Datos del cliente */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div>
                    <label className="text-sm font-medium text-gray-600">ID</label>
                    <div className="bg-white p-2 rounded border text-gray-800 font-mono">
                        {dataClientDeleted.id}
                    </div>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-600">Nombre</label>
                    <div className="bg-white p-2 rounded border text-gray-800">
                        {dataClientDeleted.name}
                    </div>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-600">Apellido</label>
                    <div className="bg-white p-2 rounded border text-gray-800">
                        {dataClientDeleted.surname}
                    </div>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <div className="bg-white p-2 rounded border text-gray-800">
                        {dataClientDeleted.email}
                    </div>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-600">Teléfono</label>
                    <div className="bg-white p-2 rounded border text-gray-800">
                        {dataClientDeleted.phone}
                    </div>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-600">CIF/NIF/NIE</label>
                    <div className="bg-white p-2 rounded border text-gray-800">
                        {dataClientDeleted.cifNifNie}
                    </div>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-600">Edad</label>
                    <div className="bg-white p-2 rounded border text-gray-800">
                        {dataClientDeleted.age} años
                    </div>
                </div>
            </div>

            {/* ✅ Botones de acción */}
            {onDelete && onReset && (
                <div className="flex gap-3 mt-4">
                    <button
                        onClick={onDelete}  // ✅ Ahora abrirá el modal
                        disabled={isDeleting}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50 flex items-center gap-2"
                    >
                        🗑️ Eliminar Cliente
                    </button>
                    <button
                        onClick={onReset}
                        disabled={isDeleting}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50"
                    >
                        ↻ Buscar otro cliente
                    </button>
                </div>
            )}

            {/* ✅ Mensaje de advertencia inicial */}
            {onDelete && (
                <div className="text-sm text-orange-600 bg-orange-50 p-3 rounded-lg border border-orange-200">
                    <p className="font-medium text-orange-800 mb-1">⚠️ Advertencia:</p>
                    <p>Al hacer clic en "Eliminar Cliente" se abrirá una ventana de confirmación final.</p>
                </div>
            )}
        </div>
    );
};

export default DataClientDeletedForm;