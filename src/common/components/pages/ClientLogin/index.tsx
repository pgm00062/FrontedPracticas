"use client";
import React from "react";
import { Form, Input, Button, Typography } from "antd";

const { Title } = Typography;

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export default function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    // Aquí puedes manejar el login con los datos del formulario
    console.log("Datos de login:", values);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <Title level={2} className="!mb-4">Iniciar sesión</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Introduce tu email" }]}> <Input /> </Form.Item>
        <Form.Item name="password" label="Contraseña" rules={[{ required: true, message: "Introduce tu contraseña" }]}> <Input.Password /> </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Entrar
          </Button>
        </Form.Item>
      </Form>
      <div className="mt-6 text-center">
        <span>¿Aún no estás registrado?</span>
        <Button type="link" onClick={onSwitchToRegister} className="ml-2 text-blue-600">
          Regístrate aquí
        </Button>
      </div>
    </div>
  );
}