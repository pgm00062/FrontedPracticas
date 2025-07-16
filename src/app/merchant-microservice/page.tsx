'use client';

import { useEffect, useState } from 'react';

import CreateMerchantComponent from '@/common/components/merchantComponents/CreateMerchantComponent/delivery';
import HeaderComponent from '@/common/components/SharedComponents/HeaderComponen';
import TestBackendConnection from '@/common/components/SharedComponents/TestBackendConnection';
import  GetByIdMerchantComponent  from '@/common/components/merchantComponents/GetByIdMerchantComponent/delivery';
import GetByNameMerchantComponent from '@/common/components/merchantComponents/GetByNameMerchantComponent/delivery';
import UpdateMerchantComponent from '@/common/components/merchantComponents/UpdateMerchantComponent/delivery';
import GetMerchantsByClientIdComponent from '@/common/components/merchantComponents/GetMerchantsByClientIdComponent/delivery';

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


          {/* Create Merchant Form */}
          <div className="gap-8 mb-8">
              <CreateMerchantComponent />
          </div>

          {/* Create Merchant Form */}
          <div className="gap-8 mb-8">
              <GetByIdMerchantComponent />
          </div>

          {/* Search Merchant by Name */}
          <div className="gap-8 mb-8">
              <GetByNameMerchantComponent />
          </div>

          {/* Update merchant by id */}
          <div className="gap-8 mb-8">
              <UpdateMerchantComponent />
          </div>

          <div className="gap-8 mb-8">
              <GetMerchantsByClientIdComponent />
          </div>

          <div className="gap-8 mb-8">
              <TestBackendConnection scope="merchant"/>
          </div>
        </div>
      </div>
  );
}
