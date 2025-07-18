'use client';

import { useEffect, useState } from 'react';
import { Tabs } from "antd";
import { UserSwitchOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import CreateMerchantComponent from '@/common/components/merchantComponents/CreateMerchantComponent/delivery';
import HeaderComponent from '@/common/components/SharedComponents/HeaderComponen';
import TestBackendConnection from '@/common/components/SharedComponents/TestBackendConnection';
import  GetByIdMerchantComponent  from '@/common/components/merchantComponents/GetByIdMerchantComponent/delivery';
import GetByNameMerchantComponent from '@/common/components/merchantComponents/GetByNameMerchantComponent/delivery';
import UpdateMerchantComponent from '@/common/components/merchantComponents/UpdateMerchantComponent/delivery';
import GetMerchantsByClientIdComponent from '@/common/components/merchantComponents/GetMerchantsByClientIdComponent/delivery';

const tabItems = [
  { key: 'create', label: 'Crear Merchant', children: <CreateMerchantComponent /> },
  { key: 'getById', label: 'Buscar Merchant por ID', children: <GetByIdMerchantComponent /> },
  { key: 'getByName', label: 'Buscar Merchant por Nombre', children: <GetByNameMerchantComponent /> },
  { key: 'update', label: 'Actualizar Merchant', children: <UpdateMerchantComponent /> },
  { key: 'getByClientId', label: 'Buscar Merchants por Cliente ID', children: <GetMerchantsByClientIdComponent /> },
  { key: 'test', label: 'Test Backend', children: <TestBackendConnection scope="merchant" /> },
];

export default function MerchantPage() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [merchants, setMerchants] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081') 
      .then(res => res.json())
      .then(data => setMerchants(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <HeaderComponent />
      <div className="container-main py-8">
        <Tabs
          activeKey={activeKey ?? ''}
          onChange={setActiveKey}
          items={tabItems}
          type="card"
          tabBarStyle={{ marginBottom: 32, fontWeight: 500, fontSize: 16 }}
        />
        {/* Si no hay pestaña seleccionada, muestra el logo central */}
        {!activeKey && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 64 }}>
            <UserSwitchOutlined style={{ fontSize: 96, color: '#1677ff', marginBottom: 24 }} />
            <Title level={2} style={{ textAlign: 'center' }}>
              Selecciona una funcionalidad para empezar
            </Title>
          </div>
        )}
      </div>
    </div>
  );
}
