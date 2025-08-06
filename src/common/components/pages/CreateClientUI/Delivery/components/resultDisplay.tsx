'use client';

import React from 'react';
import { Alert, Card, Typography } from 'antd';
import type { CreateClientResult } from '../../../../../utils/commonInterface';
import { motion, AnimatePresence } from 'framer-motion';

const { Paragraph, Text } = Typography;

interface ResultDisplayProps {
  result: CreateClientResult | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  return (
    <AnimatePresence mode="wait">
      {result && (
        <motion.div
          key={result.success ? 'success' : 'error'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          {result.success ? (
            <>
              <Alert
                message="✅ Cliente creado exitosamente"
                type="success"
                showIcon
                className="mb-4"
              />

              <Card title="🧑 Cliente creado" size="small">
                <pre
                  style={{
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    fontSize: 13,
                    backgroundColor: '#f6ffed',
                    padding: '8px',
                    borderRadius: 6,
                  }}
                >
                  {JSON.stringify(result.client, null, 2)}
                </pre>
              </Card>
            </>
          ) : (
            <Alert
              message="❌ Error al crear cliente"
              description={
                <Text type="danger" style={{ fontSize: 14 }}>
                  {result.error}
                </Text>
              }
              type="error"
              showIcon
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default ResultDisplay;