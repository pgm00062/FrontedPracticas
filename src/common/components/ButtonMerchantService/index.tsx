'use client';

import React from 'react';
import { useRouter } from 'next/navigation'; 

const ButtonMerchantService: React.FC = () => {
  const router = useRouter();

  return (
    <div className="card p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Redirección a la gestión de Merchants</h1>

      <button
        onClick={() => router.push('/merchant-microservice')}
        className="bg-blue-600 dark:bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-900 transition"
      >
        Gestionar Merchants
      </button>
    </div>
  );
};
export default ButtonMerchantService;