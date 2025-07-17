import React from "react";
import { Card, Input, Typography, Form } from "antd";
import type { ClientUpadateData } from "../interface";

const { Title } = Typography;

interface CurrentDataFormProps {
  currentClient: ClientUpadateData;
}

const disabledInputStyle = {
  color: 'rgba(0, 0, 0, 0.85)',    
  backgroundColor: '#fafafa',      
  cursor: 'default',               
  userSelect: 'text' as const,              
};

const CurrentDataForm: React.FC<CurrentDataFormProps> = ({ currentClient }) => {
  return (
    //quiero cambiar la carta por un div
    <Card
      title={<Title level={4}>📋 Datos Actuales</Title>}
      bordered
      size="small"
      style={{ backgroundColor: "#fafafa", height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Form layout="vertical" style={{ flexGrow: 1 }}>
        <Form.Item label="Nombre">
          <Input value={currentClient.name} disabled style={disabledInputStyle} />
        </Form.Item>
        <Form.Item label="Apellido">
          <Input value={currentClient.surname} disabled style={disabledInputStyle} />
        </Form.Item>
        <Form.Item label="Email">
          <Input value={currentClient.email} disabled style={disabledInputStyle} />
        </Form.Item>
        <Form.Item label="Teléfono">
          <Input value={currentClient.phone} disabled style={disabledInputStyle} />
        </Form.Item>
        <Form.Item label="CIF/NIF/NIE">
          <Input value={currentClient.cifNifNie} disabled style={disabledInputStyle} />
        </Form.Item>
        <Form.Item label="Edad">
          <Input value={`${currentClient.age} años`} disabled style={disabledInputStyle} />
        </Form.Item>
      </Form>
    </Card>
  );
};
export default CurrentDataForm;