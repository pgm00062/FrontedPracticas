'use client'
import { useState } from "react";
import { Tabs } from "antd";
import Title from "antd/es/typography/Title";
import { UserSwitchOutlined } from "@ant-design/icons";
import CreateClientForm from "@/common/components/clientComoponents/CreateClientForm/delivery";
import UpdateClientComponent from "@/common/components/clientComoponents/UpdateClientComponent/delivery";
import DeleteClientForm from "@/common/components/clientComoponents/DeleteClientForm/delivery";
import FeignMerchantExistComponent from "@/common/components/clientComoponents/FeignMerchantExistComponent/delivery";
import SearchingClients from "@/common/components/clientComoponents/SearchingClients/delivery";
import TestBackendConnection from "@/common/components/SharedComponents/TestBackendConnection";
import HeaderComponent from '@/common/components/SharedComponents/HeaderComponen';

const tabItems = [
  { key: "create", label: "Crear Cliente", children: <CreateClientForm /> },
  { key: "search", label: "Buscar Clientes", children: <SearchingClients /> },
  { key: "update", label: "Actualizar Cliente", children: <UpdateClientComponent /> },
  { key: "delete", label: "Eliminar Cliente", children: <DeleteClientForm /> },
  { key: "merchant", label: "Buscar Merchant", children: <FeignMerchantExistComponent /> },
  { key: "test", label: "Test Backend", children: <TestBackendConnection scope="client" /> },
];

export default function ClientPage() {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  return (
    <div>
      <HeaderComponent />
      <div className="container-main py-8">
        <Tabs
          activeKey={activeKey ?? ""}
          onChange={setActiveKey}
          items={tabItems}
          type="card"
          tabBarStyle={{ marginBottom: 32, fontWeight: 500, fontSize: 16 }}
        />
        {!activeKey && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 64 }}>
            <UserSwitchOutlined style={{ fontSize: 96, color: "#1677ff", marginBottom: 24 }} />
            <Title level={2} style={{ textAlign: "center" }}>
              Selecciona una funcionalidad para empezar
            </Title>
          </div>
        )}
      </div>
    </div>
  );
}