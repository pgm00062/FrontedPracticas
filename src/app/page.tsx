import { Card } from "antd";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import { UserSwitchOutlined } from "@ant-design/icons";
import ButtonMerchantService from "@/common/components/ButtonMerchantService";
import ButtonClientService from "@/common/components/ButtonClientService";
import HeaderComponent from '@/common/components/SharedComponents/HeaderComponen';

export default function Home() {
  return (
    <div>
      <HeaderComponent />
      <div className="min-h-[calc(100vh-64px)] h-full w-full bg-gray-50 dark:bg-gray-900">
        <Card
          className="w-full h-full rounded-none shadow-none p-0 flex flex-col justify-start bg-white dark:bg-gray-800"
          bodyStyle={{ padding: 48, display: "flex", flexDirection: "column", height: "100%", background: "inherit" }}
        >
          {/* Icono central y texto */}
          <div className="flex flex-col items-center flex-1">
            <UserSwitchOutlined style={{ fontSize: 96, color: "#1677ff", marginBottom: 24 }} />
            <Title level={2} style={{ marginBottom: 8, textAlign: "center" }} className="text-gray-900 dark:text-gray-100">
              Bienvenido al Sistema
            </Title>
            <Paragraph type="secondary" style={{ marginBottom: 0, textAlign: "center", maxWidth: 480 }} className="text-gray-600 dark:text-gray-300">
              Administra usuarios, prueba conexiones y gestiona tu aplicación desde este panel centralizado.
            </Paragraph>
          </div>
          {/* Botones arriba */}
          <div className="flex gap-6 justify-center mb-8">
            <ButtonClientService />
            <ButtonMerchantService />
          </div>
        </Card>
      </div>
    </div>
  );
}