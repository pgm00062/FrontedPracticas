'use client';

import React, { useState } from 'react';

const TestConnection: React.FC = () => {
  const [testResult, setTestResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const testClientService = async () => {
    setIsLoading(true);
    setTestResult('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_SERVICE_URL}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.text();
        setTestResult(`✅ Client Service conectado: ${data}`);
      } else {
        setTestResult(`❌ Error Client Service: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      setTestResult(`❌ Error Client Service: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testMerchantService = async () => {
    setIsLoading(true);
    setTestResult('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_MERCHANT_SERVICE_URL}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.text();
        setTestResult(`✅ Merchant Service conectado: ${data}`);
      } else {
        setTestResult(`❌ Error Merchant Service: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      setTestResult(`❌ Error Merchant Service: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Configuración Actual */}
      <div className="card-compact">
        <h3 className="heading-3">Configuración Actual</h3>
        <div className="space-y-2 text-sm bg-gray-100 p-4 rounded-lg">
          <p><strong>Client Service:</strong> {process.env.NEXT_PUBLIC_CLIENT_SERVICE_URL}</p>
          <p><strong>Merchant Service:</strong> {process.env.NEXT_PUBLIC_MERCHANT_SERVICE_URL}</p>
        </div>
      </div>

      {/* Botones de Test */}
      <div className="card-compact">
        <div className="flex flex-wrap gap-3 mb-4">
          <button
            onClick={testClientService}
            disabled={isLoading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="spinner"></div>
                Conectando...
              </span>
            ) : (
              'Test Client Service'
            )}
          </button>
          <button
            onClick={testMerchantService}
            disabled={isLoading}
            className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="spinner"></div>
                Conectando...
              </span>
            ) : (
              'Test Merchant Service'
            )}
          </button>
        </div>

        {/* Resultado */}
        {testResult && (
          <div className={`p-4 rounded-lg border ${
            testResult.includes('✅') 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <p className="font-mono text-sm">{testResult}</p>
          </div>
        )}
      </div>


    </div>
  );
};

export default TestConnection;