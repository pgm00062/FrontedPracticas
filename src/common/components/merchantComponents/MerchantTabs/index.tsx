'use client';
import { useState } from "react";
import { Tabs } from "antd";
import Title from "antd/es/typography/Title";
import { UserSwitchOutlined } from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";
import type { TabItem, MerchantTabsProps } from "./interface";

export default function MerchantTabs({ tabItems }: MerchantTabsProps) {
  const [activeKey, setActiveKey] = useState<string | undefined>(undefined);
  const router = useRouter();
  const pathname = usePathname();

  const handleTabChange = (key: string) => {
    setActiveKey(key);
    // Si el tab NO es el de búsqueda, limpia los parámetros de la URL
    if (key !== "search") {
      router.replace(pathname); // Elimina los query params
    }
  };

  return (
    <>
      <Tabs
        items={tabItems}
        type="card"
        tabBarStyle={{ marginBottom: 32, fontWeight: 500, fontSize: 16 }}
        activeKey={activeKey}
        onChange={handleTabChange}
      />
      {activeKey === undefined && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 64 }}>
          <UserSwitchOutlined style={{ fontSize: 96, color: "#1677ff", marginBottom: 24 }} />
          <Title level={2} style={{ textAlign: "center" }}>
            Selecciona una funcionalidad para empezar
          </Title>
        </div>
      )}
    </>
  );
}