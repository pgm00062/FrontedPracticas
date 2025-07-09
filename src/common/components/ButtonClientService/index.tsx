'use client';

import React from 'react';
import { useRouter } from 'next/navigation'; 

const ButtonClientService: React.FC = () => {
  const router = useRouter(); 

  return (
    <div className="card p-6">
    <h1 className="text-3xl font-bold mb-6">Redirección a la gestión de Clients</h1>
      <button
        onClick={() => router.push('/client-microservice')} 
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Gestionar Clients
      </button>
    </div>
  );
};

export default ButtonClientService;