import UserManagement from "@/common/components/UserManagement";
import TestConnection from "../common/components/TestConnection";
import TestCreateClient from "@/common/components/TestCreateClient";
import TestBackendConnection from "@/common/components/TestBackendConnection";

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

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">2</div>
            <div className="text-sm text-muted">Servicios Activos</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">✓</div>
            <div className="text-sm text-muted">Conexión Estable</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
            <div className="text-sm text-muted">Monitoreo</div>
          </div>
        </div>

        {/* Main Components - UI Real */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Test Connection */}
          <div className="card">
            <h3 className="heading-3">Estado del Sistema</h3>
            <p className="text-muted mb-4">
              Verifica el estado de las conexiones con los microservicios.
            </p>
            <TestConnection />
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h3 className="heading-3">Acciones Rápidas</h3>
            <p className="text-muted mb-4">
              Accede rápidamente a las funciones principales del sistema.
            </p>
            <div className="flex flex-col gap-3">
              <button className="btn-primary">➕ Crear Cliente</button>
              <button className="btn-secondary">📋 Ver Listado</button>
              <button className="btn-outline">📊 Reportes</button>
            </div>
          </div>
        </div>

        {/* User Management Component - UI Principal */}
        <div className="mt-8">
          <UserManagement />
        </div>

        {/* Development Section - Tests y Debugging */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="mb-6">
            <h2 className="heading-2">🛠️ Herramientas de Desarrollo</h2>
            <p className="text-muted">
              Componentes de testing y debugging para desarrollo
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TestBackendConnection />
            <TestCreateClient />
          </div>
        </div>
      </div>
    </div>
  );
}