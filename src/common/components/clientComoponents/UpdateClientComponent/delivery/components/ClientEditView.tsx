'use client';

import React from 'react';
import type { ClientUpadateData } from '../interface';
import CurrentDataForm from './CurrentDataForm';
import EditableDataForm from './EditableDataForm';
import { Card, Button, Typography, Row, Col, Alert, Space } from 'antd';

const { Text } = Typography;

interface ClientEditViewProps {
  currentClient: ClientUpadateData;
  updatedClient: ClientUpadateData;
  isUpdating: boolean;
  showInstructions: boolean;
  onInputChange: (field: keyof ClientUpadateData, value: string | number) => void;
  onUpdate: () => void;
  onReset: () => void;
}

const ClientEditView: React.FC<ClientEditViewProps> = ({
  currentClient,
  updatedClient,
  isUpdating,
  showInstructions,
  onInputChange,
  onUpdate,
  onReset
}) => {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {/* ✅ Header con botón volver */}
      <Card
        bordered={false}
        bodyStyle={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px' }}
      >
        <Button onClick={onReset} disabled={isUpdating} className="hover-button">
          ← Buscar otro cliente
        </Button>
        <Text type="secondary">Cliente ID: {currentClient.id}</Text>
      </Card>

      {/* ✅ Split view */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <CurrentDataForm currentClient={currentClient} />
        </Col>
        <Col xs={24} lg={12}>
          <EditableDataForm
            updatedClient={updatedClient}
            isUpdating={isUpdating}
            onInputChange={onInputChange}
            onUpdate={onUpdate}
          />
        </Col>
      </Row>

      {/* ✅ Instrucciones */}
      {showInstructions && (
        <Alert
          message="💡 Instrucciones"
          description={
            <ul style={{ paddingLeft: 20, marginBottom: 0 }}>
              <li><strong>Izquierda:</strong> Datos actuales del cliente (solo lectura)</li>
              <li><strong>Derecha:</strong> Modifica los campos que quieras actualizar</li>
              <li>Los campos marcados con * son obligatorios</li>
              <li>Haz clic en "Actualizar Cliente" para guardar los cambios</li>
            </ul>
          }
          type="warning"
          showIcon
        />
      )}

      {/* ✅ Indicador de actualización */}
      {isUpdating && (
        <Alert
          message={
            <div className="flex items-center gap-2">
              🔄 <Text strong>Actualizando cliente...</Text>
            </div>
          }
          description="Por favor, espera mientras se guardan los cambios en la base de datos."
          type="info"
          showIcon
        />
      )}
    </Space>
  );
};
export default ClientEditView;