import React from 'react';
import { Button, Input, Form, InputNumber, Row, Col } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';
import type { ClientFormData } from '../interface';

interface ClientFormFieldsProps {
  clientData: ClientFormData;
  onInputChange: (field: keyof ClientFormData, value: string | number) => void;
  onGenerateRandom: () => void;
  isDisabled: boolean;
}

const ClientFormFields: React.FC<ClientFormFieldsProps> = ({
  clientData,
  onInputChange,
  onGenerateRandom,
  isDisabled = false,
}) => {
  return (
    <div>
      <div className="flex gap-2 mb-4">
        <Button
          type="primary"
          icon={<RollbackOutlined />}
          onClick={onGenerateRandom}
          disabled={isDisabled}
        >
          Generar Datos Aleatorios
        </Button>
      </div>
      <div className="bg-gray-50 p-4 rounded-md">
        <Form layout="vertical">
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item label="Nombre *"
                rules={[{ required: true, message: 'El nombre es obligatorio' }]}
                >
                <Input
                  value={clientData.name}
                  onChange={(e) => onInputChange('name', e.target.value)}
                  disabled={isDisabled}
                  placeholder="Ej: Juan"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Apellido *">
                <Input
                  value={clientData.surname}
                  onChange={(e) => onInputChange('surname', e.target.value)}
                  disabled={isDisabled}
                  placeholder="Ej: Pérez"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Email *">
                <Input
                  type="email"
                  value={clientData.email}
                  onChange={(e) => onInputChange('email', e.target.value)}
                  disabled={isDisabled}
                  placeholder="Ej: juan.perez@email.com"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Teléfono *">
                <Input
                  value={clientData.phone}
                  onChange={(e) => onInputChange('phone', e.target.value)}
                  disabled={isDisabled}
                  placeholder="Ej: 123456789"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="CIF/NIF/NIE *">
                <Input
                  value={clientData.cifNifNie}
                  onChange={(e) => onInputChange('cifNifNie', e.target.value)}
                  disabled={isDisabled}
                  placeholder="Ej: 12345678A"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Edad *">
                <InputNumber
                  min={18}
                  max={120}
                  value={clientData.age}
                  onChange={(value) => onInputChange('age', value || 18)}
                  disabled={isDisabled}
                  placeholder="Ej: 30"
                  className="w-full"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div className="text-xs text-gray-600 mt-2">* Campos requeridos</div>
      </div>
    </div>
  );
};
export default ClientFormFields;