import TestBackendConnection from "@/common/components/TestBackendConnection";
import ButtonMerchantService from "@/common/components/ButtonMerchantService";
import ButtonClientService from "@/common/components/ButtonClientService";

export default function Home() {
  return (
    <div className="container-page">
      {/* Header/Navbar */}
      <div className="navbar">
        <div className="container-main">
          <h1 className="heading-1 mb-0">Panel de Control</h1>
          <p className="text-muted">Gestión de usuarios y conexiones</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-main py-8">
        {/* Hero Section */}
        <div className="card-hero mb-8">
          <h2 className="text-2xl font-bold mb-2">Bienvenido al Sistema</h2>
          <p className="text-white/80">
            Administra usuarios, prueba conexiones y gestiona tu aplicación desde este panel centralizado.
          </p>
        </div>

        {/* Button to Merchant Service */}
        <div className="mt-12 border-t border-gray-200 pt-8 ">
            <ButtonMerchantService />
        </div>

        {/* Button to Client Service */}
        <div className="mt-12 border-t border-gray-200 pt-8 ">
            <ButtonClientService />
        </div>

        {/* Development Section - Tests y Debugging */}
        <div className="mt-12 border-t border-gray-200 pt-8 ">
          <div className="mb-6">
            <h2 className="heading-2">🛠️ Herramientas de Desarrollo</h2>
            <p className="text-muted">
              Componentes de testing y debugging para desarrollo
            </p>
          </div>
          
          <div className="gap-8 mb-8">
            <TestBackendConnection />
          </div>
          
        </div>
      </div>
    </div>
  );
}