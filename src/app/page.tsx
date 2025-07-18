import { Card } from "antd";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import { UserSwitchOutlined } from "@ant-design/icons";
import TestBackendConnection from "@/common/components/SharedComponents/TestBackendConnection";
import ButtonMerchantService from "@/common/components/ButtonMerchantService";
import ButtonClientService from "@/common/components/ButtonClientService";
import HeaderComponent from '@/common/components/SharedComponents/HeaderComponen';

export default function Home() {
  return (
    <div>
      <HeaderComponent />
      <div
        style={{
          minHeight: "calc(100vh - 64px)",
          height: "100%",
          width: "100%",
          background: "#f5f7fa",
        }}
      >
        <Card
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 0,
            boxShadow: "none",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
          bodyStyle={{ padding: 48, display: "flex", flexDirection: "column", height: "100%" }}
        >
          {/* Icono central y texto */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
            <UserSwitchOutlined style={{ fontSize: 96, color: "#1677ff", marginBottom: 24 }} />
            <Title level={2} style={{ marginBottom: 8, textAlign: "center" }}>
              Bienvenido al Sistema
            </Title>
            <Paragraph type="secondary" style={{ marginBottom: 0, textAlign: "center", maxWidth: 480 }}>
              Administra usuarios, prueba conexiones y gestiona tu aplicación desde este panel centralizado.
            </Paragraph>
          </div>
          {/* Botones arriba */}
          <div style={{ display: "flex", gap: 24, justifyContent: "center", marginBottom: 32 }}>
            <ButtonClientService />
            <ButtonMerchantService />
          </div>
        </Card>
        
      </div>
    </div>
  );
}