import React from 'react';
import { Alert, Typography } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';

const { Paragraph } = Typography;

interface UpdateResultDisplayProps {
  result: {
    success: boolean;
    data?: any;
    error?: string;
  } | null;
}

const fadeVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 }
};

const UpdateResultDisplay: React.FC<UpdateResultDisplayProps> = ({ result }) => {
  return (
    <div style={{ marginTop: '1rem' }}>
      <AnimatePresence>
        {result && (
          <motion.div
            key={result.success ? 'success' : 'error'}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeVariant}
            transition={{ duration: 0.3 }}
          >
            <Alert
              message={
                result.success
                  ? '✅ Cliente actualizado exitosamente'
                  : '❌ Error al actualizar cliente'
              }
              description={
                <Paragraph
                  type={result.success ? 'secondary' : 'danger'}
                  style={{ marginBottom: 0 }}
                >
                  {result.success
                    ? 'Los datos del cliente se han guardado correctamente en la base de datos.'
                    : result.error || 'Ha ocurrido un error desconocido'}
                </Paragraph>
              }
              type={result.success ? 'success' : 'error'}
              showIcon
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default UpdateResultDisplay;