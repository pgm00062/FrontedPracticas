import React from 'react';
import type { ClientData } from '../interface';
import { Card, Typography, Badge } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';

const { Text } = Typography;

interface ClientResultsListProps {
  clients: ClientData[];
  selectedClient: ClientData | null;
  onSelectClient: (client: ClientData) => void;
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

// Altura aproximada para 3 tarjetas visibles 
const VISIBLE_CARDS = 3;
const CARD_MIN_HEIGHT = 80; 
const GAP = 9;

const ClientResultsList: React.FC<ClientResultsListProps> = ({
  clients,
  selectedClient,
  onSelectClient
}) => {
  if (clients.length === 0) return null;

  const containerHeight = VISIBLE_CARDS * (CARD_MIN_HEIGHT + GAP);

  return (
    <div>
      <Text type="secondary" style={{ marginBottom: 8, display: 'block' }}>
        📋 {clients.length} cliente(s) encontrado(s):
      </Text>

      <div
        style={{
          maxHeight: containerHeight,
          overflowY: clients.length > VISIBLE_CARDS ? 'auto' : 'visible',
          paddingRight: 8,
        }}
      >
        <AnimatePresence>
          {clients.map((client) => (
            <motion.div
              key={client.id}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={itemVariants}
              transition={{ duration: 0.3 }}
              style={{ marginBottom: GAP }}
            >
              <Card
                hoverable
                bordered={selectedClient?.id === client.id}
                onClick={() => onSelectClient(client)}
                style={{
                  borderColor: selectedClient?.id === client.id ? '#1890ff' : undefined,
                  boxShadow: selectedClient?.id === client.id ? '0 0 8px rgba(24, 144, 255, 0.6)' : undefined,
                  cursor: 'pointer',
                  minHeight: CARD_MIN_HEIGHT,
                  padding: '4px 14px', // Padding para que el contenido respire
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <Text strong style={{ fontSize: 16 }}>
                    {client.name} {client.surname}
                  </Text>
                  <br />
                  <Text type="secondary">{client.email}</Text>
                  {client.phone && (
                    <>
                      <br />
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        📞 {client.phone}
                      </Text>
                    </>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
export default ClientResultsList;