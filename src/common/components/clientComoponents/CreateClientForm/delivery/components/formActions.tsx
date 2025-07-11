import React from 'react';

interface FormActionsProps {
  onCreateClient: () => void;
  isCreating: boolean;
  isFormValid: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({
  onCreateClient,
  isCreating,
  isFormValid
}) => {
  return (
    <>
      {/* Botón principal */}
      <button
        onClick={onCreateClient}
        disabled={isCreating || !isFormValid}
        className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
          isCreating || !isFormValid
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {isCreating ? '⏳ Creando cliente...' : '🚀 Crear Cliente'}
      </button>

      {/* Mensaje de validación */}
      {!isFormValid && (
        <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md">
          <p className="text-yellow-800 text-sm">
            ⚠️ Completa todos los campos requeridos
          </p>
        </div>
      )}
    </>
  );
};

export default FormActions;