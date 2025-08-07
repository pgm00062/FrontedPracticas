"use client";
import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { useRouter } from 'next/navigation';
import { useService } from '@/common/hooks/useService';
import { setCookie } from '@/common/utils/auth';
import type { LoginFormProps } from './interface';

const { Title } = Typography;

export default function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { executeUseCase } = useService();

  const onFinish = async (values: any) => {
    setIsLoggingIn(true);
    
    try {
      const response: any = await executeUseCase('loginClient', values);
      
      if (response.data?.success) {
        message.success('✅ Login exitoso');
        
        if (response.data.jwt) {
          setCookie('authToken', response.data.jwt, 7); 
        }
        
        form.resetFields();
        
        const hide = message.loading({
          content: '🏠 Redirigiendo a la página principal...',
          duration: 1.5,
        });
        
        // Redireccionar a la página principal
        setTimeout(() => {
          hide();
          router.push('/');
        }, 1500);
        
      } else {
        const errorMessage = response.data?.error || 'Error desconocido al hacer login';
        message.error(`❌ ${errorMessage}`);
      }
    } catch (error: any) {
      let errorMessage = 'Error de conexión. Verifica tu conexión a internet.';
      
      // Manejar errores específicos de la respuesta
      if (error.body) {
        errorMessage = error.body.error || error.statusText || errorMessage;
      }
      
      message.error(`❌ ${errorMessage}`);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error('Por favor, completa todos los campos obligatorios');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <Title level={2} className="!mb-4">Iniciar sesión</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ margin: 0 }}
      >
        <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Introduce un email válido" }]} style={{ marginBottom: 12 }}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Contraseña" rules={[{ required: true, message: "Introduce tu contraseña" }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700"
            loading={isLoggingIn}
            disabled={isLoggingIn}
          >
            {isLoggingIn ? 'Iniciando sesión...' : 'Entrar'}
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