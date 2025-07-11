'use client';

import { useEffect, useState } from 'react';

import CreateMerchantComponent from '@/common/components/merchantComponents/CreateMerchantComponent/delivery';
import HeaderComponent from '@/common/components/SharedComponents/HeaderComponen';
import TestBackendConnection from '@/common/components/SharedComponents/TestBackendConnection';

export default function MerchantPage() {
  const [merchants, setMerchants] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081') 
      .then(res => res.json())
      .then(data => setMerchants(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div >
      <HeaderComponent />

      {/* Main Content */}
      <div className="container-main py-8">


          {/* Create Client Form */}
          <div className="gap-8 mb-8">
            <p>Antes del formulario</p>
              <CreateMerchantComponent />
          </div>
          <div className="gap-8 mb-8">
              <TestBackendConnection scope="merchant"/>
          </div>
        </div>
      </div>
  );
}
