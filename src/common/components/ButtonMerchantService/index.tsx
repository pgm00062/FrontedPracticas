'use client';

import React from 'react';
import { useRouter } from 'next/navigation'; // ✅ App Router usa este

const ButtonMerchantService: React.FC = () => {
  const router = useRouter(); // ✅ válido en client components

  return (
    <div className="card p-6">
      <h1 className="text-3xl font-bold mb-6">Redirección a la gestión de Merchants</h1>

      <button
        onClick={() => router.push('/merchant-microservice')} 
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Gestionar Merchants
      </button>
    </div>
  );
};

export default ButtonMerchantService;


