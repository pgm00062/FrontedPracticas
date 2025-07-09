import React from "react";

interface DeleteResultDisplayProps {
    result: boolean | null;
}

const DeleteResultDisplay: React.FC<DeleteResultDisplayProps> = ({ result }) => {
    // ✅ No mostrar nada si no hay resultado
    if (result === null) {
        return null;
    }

    // ✅ Resultado exitoso
    if (result === true) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                    <span className="text-green-600 text-xl">✅</span>
                    <div className="flex-1">
                        <p className="font-semibold text-green-800">
                            Cliente eliminado exitosamente
                        </p>
                        <p className="text-sm text-green-600 mt-1">
                            El cliente ha sido eliminado permanentemente de la base de datos.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // ✅ Resultado con error
    return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
                <span className="text-red-600 text-xl">❌</span>
                <div className="flex-1">
                    <p className="font-semibold text-red-800">
                        Error al eliminar el cliente
                    </p>
                    <p className="text-sm text-red-600 mt-1">
                        Ha ocurrido un error durante la eliminación. Por favor, inténtalo de nuevo.
                    </p>
                    <div className="mt-3 text-xs text-red-700 bg-red-100 p-2 rounded">
                        <strong>Posibles causas:</strong>
                        <ul className="mt-1 list-disc list-inside space-y-1">
                            <li>El cliente no existe en la base de datos</li>
                            <li>Error de conexión con el servidor</li>
                            <li>Permisos insuficientes para eliminar</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteResultDisplay;