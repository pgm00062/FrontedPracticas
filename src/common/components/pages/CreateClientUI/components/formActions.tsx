'use client';

import React from 'react';
import { Button, Alert, Space } from 'antd';
import { RocketOutlined, WarningOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';

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
    <Space direction="vertical" style={{ width: '100%' }} size="middle">
      {/* Botón principal */}
      <Button
        type="primary"
        block
        onClick={onCreateClient}
        loading={isCreating}
        disabled={!isFormValid}
        size="large"
        icon={<RocketOutlined />}
      >
        {isCreating ? 'Creando cliente...' : 'Crear Cliente'}
      </Button>

      {/* Mensaje de validación con animación */}
      <AnimatePresence>
        {!isFormValid && (
          <motion.div
            key="alert"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <Alert
              message="Completa todos los campos requeridos"
              type="warning"
              showIcon
              icon={<WarningOutlined />}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Space>
  );
};

export default FormActions;