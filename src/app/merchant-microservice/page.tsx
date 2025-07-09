'use client';

import { useEffect, useState } from 'react';

import CreateMerchantComponent from '@/common/components/merchantComponents/CreateMerchantComponent/delivery';

export default function MerchantPage() {
  const [merchants, setMerchants] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081') 
      .then(res => res.json())
      .then(data => setMerchants(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container-page">
      {/* Header/Navbar */}
      <div className="navbar">
        <div className="container-main">
          <h1 className="heading-1 mb-0">Panel de Control</h1>
          <p className="text-muted">Gestión de comerciantes y conexiones</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-main py-8">
        {/* Hero Section */}
        <div className="card-hero mb-8">
          <h2 className="text-2xl font-bold mb-2">Bienvenido al Sistema</h2>
          <p className="text-white/80">
            Administra comerciantes, prueba conexiones y gestiona tu aplicación desde este panel centralizado.
          </p>
        </div>

          {/* Create Client Form */}
          <div className="gap-8 mb-8">
              <CreateMerchantComponent />
          </div>
        </div>
      </div>
  );
}
