import React from 'react';
import {Input, Form, Row, Col } from 'antd';
import type { MerchantFormData } from '@/common/utils/commonInterface';

interface MerchantFormFieldsProps {
    merchantData: MerchantFormData;
    onInputChange: (field: keyof MerchantFormData, value: string | number) => void;
    isDisabled?: boolean;
}

const MerchantFormFields: React.FC<MerchantFormFieldsProps> = ({
    merchantData,
    onInputChange,
    isDisabled = false,
}) => { 
    return(
        <div>
            <div className="flex gap-2 mb-4"></div>
            <div className="bg-gray-50 p-4 rounded-md">
                <Form layout="vertical">
                    <Row gutter={16}>
                        <Col xs={24} md={12}>
                            <Form.Item label="Nombre del Comercio *"
                                rules={[{ required: true, message: 'El nombre del comercio es obligatorio' }]}
                            >
                                <Input
                                    value={merchantData.name}
                                    onChange={(e) => onInputChange('name', e.target.value)}
                                    disabled={isDisabled}
                                    placeholder="Ej: Mi Comercio"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item label="Dirección *">
                                <Input
                                    type="address"
                                    value={merchantData.address}
                                    onChange={(e) => onInputChange('address', e.target.value)}
                                    disabled={isDisabled}
                                    placeholder="Ej: Calle Falsa 123"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item label="Tipo de comercio *">
                                <select
                                    className="ant-input"
                                    value={merchantData.merchantType}
                                    onChange={(e) => onInputChange('merchantType', e.target.value)}
                                    disabled={isDisabled}
                                >
                                    <option value="">Seleccione una opción</option>
                                    <option value="MERCHANT_TYPE_FINANCIAL_SERVICES">Finanzas</option>
                                    <option value="MERCHANT_TYPE_PERSONAL_SERVICES">Personal</option>
                                </select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    )
}
export default MerchantFormFields;