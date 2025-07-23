import React from 'react';
import type { MerchantData } from '../../../../../utils/commonInterface';
import { Card, Typography } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';

const { Text } = Typography;

interface MerchantResultsListProps {
  merchants: MerchantData[];
  selectedMerchant: MerchantData | null;
  onSelectMerchant: (merchant: MerchantData) => void;
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const VISIBLE_CARDS = 3;
const CARD_MIN_HEIGHT = 80;
const GAP = 9;

const MerchantResultsList: React.FC<MerchantResultsListProps> = ({
  merchants,
  selectedMerchant,
  onSelectMerchant
}) => {
  if (!Array.isArray(merchants) || merchants.length === 0) return null;

  const containerHeight = VISIBLE_CARDS * (CARD_MIN_HEIGHT + GAP);

  return (
    <div>
      <Text type="secondary" style={{ marginBottom: 8, display: 'block' }}>
        📋 {merchants.length} comerciante(s) encontrado(s):
      </Text>

      <div
        style={{
          maxHeight: containerHeight,
          overflowY: merchants.length > VISIBLE_CARDS ? 'auto' : 'visible',
          paddingRight: 8,
        }}
      >
        <AnimatePresence>
          {merchants.map((merchant) => (
            <motion.div
              key={merchant.merchantId}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={itemVariants}
              transition={{ duration: 0.3 }}
              style={{ marginBottom: GAP }}
            >
              <Card
                hoverable
                bordered={selectedMerchant?.merchantId === merchant.merchantId}
                onClick={() => onSelectMerchant(merchant)}
                style={{
                  borderColor: selectedMerchant?.merchantId === merchant.merchantId ? '#1890ff' : undefined,
                  boxShadow: selectedMerchant?.merchantId === merchant.merchantId ? '0 0 8px rgba(24, 144, 255, 0.6)' : undefined,
                  cursor: 'pointer',
                  minHeight: CARD_MIN_HEIGHT,
                  padding: '4px 14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <Text strong style={{ fontSize: 16 }}>
                    {merchant.name}
                  </Text>
                  <br />
                  <Text type="secondary">{merchant.address}</Text>
                  {merchant.merchantType && (
                    <>
                      <br />
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        🏷️ {merchant.merchantType}
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

export default MerchantResultsList;