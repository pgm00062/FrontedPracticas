"use client";
import React, { useState } from 'react';
import { Form, Input, Button, Typography, message, InputNumber } from "antd";

const { Title } = Typography;

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const [form] = Form.useForm();

    const [logs, setLogs] = useState<string[]>([]);
    const [isCreating, setIsCreating] = useState(false);
  
  const onFinish = async (values: any) => {
    console.log('Valores del formulario:', values);
    setIsCreating(true);
    const response = await fetch('/api/register-client', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    setIsCreating(false);
    setLogs((prev) => [...prev, JSON.stringify(data)]);
    if (data.success) {
      message.success('Registro completado con éxito');
      form.resetFields();
    } else {
      message.error(data.error || 'Error al registrar el cliente');
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Error en validación:', errorInfo);
    message.error('Por favor, completa todos los campos obligatorios');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <Title level={2} className="!mb-4">Registro</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ margin: 0 }}
      >
        <Form.Item name="nombre" label="Nombre" rules={[{ required: true, message: "Introduce tu nombre" }]} style={{ marginBottom: 12 }}>
          <Input />
        </Form.Item>
        <Form.Item name="apellidos" label="Apellidos" rules={[{ required: true, message: "Introduce tus apellidos" }]} style={{ marginBottom: 12 }}>
          <Input />
        </Form.Item>
        <Form.Item name="dni" label="DNI" rules={[{ required: true, message: "Introduce tu DNI" }]} style={{ marginBottom: 12 }}>
          <Input />
        </Form.Item>
        <Form.Item name="telefono" label="Teléfono" rules={[{ required: true, message: "Introduce tu teléfono" }]} style={{ marginBottom: 12 }}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Introduce un email válido" }]} style={{ marginBottom: 12 }}>
          <Input />
        </Form.Item>
        <Form.Item name="edad" label="Edad" rules={[{ required: true, message: "Introduce tu edad" }]} style={{ marginBottom: 12 }}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="password" label="Contraseña" rules={[{ required: true, message: "Introduce una contraseña" }]} style={{ marginBottom: 12 }}>
          <Input.Password />
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
          <Button type="primary" htmlType="submit" className="w-full bg-green-600 hover:bg-green-700">
            Registrarse
          </Button>
        </Form.Item>
      </Form>
      <div className="mt-6 text-center">
        <span>¿Ya tienes cuenta?</span>
        <Button type="link" onClick={onSwitchToLogin} className="ml-2 text-green-600">
          Inicia sesión aquí
        </Button>
      </div>
    </div>
  );
}
