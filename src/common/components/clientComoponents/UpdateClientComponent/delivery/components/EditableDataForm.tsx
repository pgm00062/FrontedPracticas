import React from 'react';
import { Button, Form, Input, InputNumber, Typography, Card } from 'antd';
import type { ClientUpadateData } from '../interface';

const { Title } = Typography;

interface EditableDataFormProps {
  updatedClient: ClientUpadateData;
  isUpdating: boolean;
  onInputChange: (field: keyof ClientUpadateData, value: string | number) => void;
  onUpdate: () => void;
}

const EditableDataForm: React.FC<EditableDataFormProps> = ({
  updatedClient,
  isUpdating,
  onInputChange,
  onUpdate
}) => {
  return (
    <Card
      title={<Title level={4}>✏️ Nuevos Datos</Title>}
      bordered
      size="small"
      style={{ backgroundColor: '#f0f5ff', height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <Form layout="vertical">
        <Form.Item label="Nombre *">
          <Input
            value={updatedClient.name}
            onChange={(e) => onInputChange('name', e.target.value)}
            placeholder="Introduce el nombre"
            disabled={isUpdating}
          />
        </Form.Item>

        <Form.Item label="Apellido *">
          <Input
            value={updatedClient.surname}
            onChange={(e) => onInputChange('surname', e.target.value)}
            placeholder="Introduce el apellido"
            disabled={isUpdating}
          />
        </Form.Item>

        <Form.Item label="Email *">
          <Input
            type="email"
            value={updatedClient.email}
            onChange={(e) => onInputChange('email', e.target.value)}
            placeholder="ejemplo@correo.com"
            disabled={isUpdating}
          />
        </Form.Item>

        <Form.Item label="Teléfono">
          <Input
            value={updatedClient.phone}
            onChange={(e) => onInputChange('phone', e.target.value)}
            placeholder="123456789"
            disabled={isUpdating}
          />
        </Form.Item>

        <Form.Item label="CIF/NIF/NIE">
          <Input
            value={updatedClient.cifNifNie}
            onChange={(e) => onInputChange('cifNifNie', e.target.value)}
            placeholder="12345678A"
            disabled={isUpdating}
          />
        </Form.Item>

        <Form.Item label="Edad">
          <InputNumber
            min={18}
            max={120}
            value={updatedClient.age}
            onChange={(value) => onInputChange('age', value ?? 18)}
            style={{ width: '100%' }}
            disabled={isUpdating}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            block
            onClick={onUpdate}
            disabled={
              isUpdating ||
              !updatedClient.name.trim() ||
              !updatedClient.email.trim()
            }
            loading={isUpdating}
          >
            💾 {isUpdating ? 'Actualizando...' : 'Actualizar Cliente'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
export default EditableDataForm;