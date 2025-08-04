"use client";
import React, { useState } from 'react';
import { Form, Input, Button, Typography, message, InputNumber } from "antd";
import { useRouter } from 'next/navigation';

const { Title } = Typography;

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const [form] = Form.useForm();
  const router = useRouter();

  const [isCreating, setIsCreating] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  const onFinish = async (values: any) => {
    setIsCreating(true);
    
    try {
      const response = await fetch('/api/register-client', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      });
      
      const data = await response.json();
      
      if (data.success) {
        message.success('✅ Registro completado con éxito');
        form.resetFields();
        setIsRedirecting(true);
        
        const hide = message.loading({
          content: '🏠 Redirigiendo a la página principal en 2 segundos...',
          duration: 2,
          onClose: () => {
            router.push('/');
          }
        });
        
        // Redireccionar automáticamente después de 2 segundos
        setTimeout(() => {
          hide();
          router.push('/');
        }, 2000);
      } else {
        const errorMessage = data.error || 'Error desconocido al registrar el cliente';
        message.error(`❌ ${errorMessage}`);
      }
    } catch (error) {
      const errorMessage = 'Error de conexión. Verifica tu conexión a internet.';
      message.error(errorMessage);
    } finally {
      setIsCreating(false);
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
          <Button 
            type="primary" 
            htmlType="submit" 
            className="w-full bg-green-600 hover:bg-green-700"
            loading={isCreating}
            disabled={isCreating || isRedirecting}
          >
            {(() => {
              if (isRedirecting) return 'Redirigiendo...';
              if (isCreating) return 'Registrando...';
              return 'Registrarse';
            })()}
          </Button>
        </Form.Item>
      </Form>
      
      {isRedirecting && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-green-700 text-center mb-3">
            ¡Registro exitoso! 🎉
          </p>
          <Button 
            type="primary" 
            onClick={() => router.push('/')}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Ir a la página principal ahora
          </Button>
        </div>
      )}
      
      <div className="mt-6 text-center">
        <span>¿Ya tienes cuenta?</span>
        <Button type="link" onClick={onSwitchToLogin} className="ml-2 text-green-600">
          Inicia sesión aquí
        </Button>
      </div>
    </div>
  );
}
