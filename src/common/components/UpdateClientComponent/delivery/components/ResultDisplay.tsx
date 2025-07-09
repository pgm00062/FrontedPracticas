import React from 'react';

interface UpdateResultDisplayProps {
  result: {
    success: boolean;
    data?: any;
    error?: string;
  } | null;
}

const UpdateResultDisplay: React.FC<UpdateResultDisplayProps> = ({ result }) => {
  if (!result) return null;

  return (
    <div className="mt-4">
      {result.success ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <span className="text-green-600 text-xl">✅</span>
            <div className="flex-1">
              <p className="font-semibold text-green-800">
                Cliente actualizado exitosamente
              </p>
              <p className="text-sm text-green-600 mt-1">
                Los datos del cliente se han guardado correctamente en la base de datos.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <span className="text-red-600 text-xl">❌</span>
            <div className="flex-1">
              <p className="font-semibold text-red-800">
                Error al actualizar cliente
              </p>
              <p className="text-sm text-red-600 mt-1">
                {result.error || 'Ha ocurrido un error desconocido'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateResultDisplay;