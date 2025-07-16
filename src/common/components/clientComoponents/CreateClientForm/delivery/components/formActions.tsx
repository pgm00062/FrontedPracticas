import React from 'react';
import { Button, Alert } from 'antd';

interface FormActionsProps {
  onCreateClient: () => void;
  isCreating: boolean;
  isFormValid: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({
  onCreateClient,
  isCreating,
  isFormValid,
}) => {
  return (
    <>
      {/* Botón principal */}
      <Button
        type="primary"
        block
        onClick={onCreateClient}
        loading={isCreating}
        disabled={!isFormValid}
        size="large"
      >
        {isCreating ? 'Creando cliente...' : '🚀 Crear Cliente'}
      </Button>

      {/* Mensaje de validación */}
      {!isFormValid && (
        <div className="mt-4">
          <Alert
            message="⚠️ Completa todos los campos requeridos"
            type="warning"
            showIcon
          />
        </div>
      )}
    </>
  );
};

export default FormActions;