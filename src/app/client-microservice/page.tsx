import CreateClientForm from "@/common/components/CreateClientForm/delivery";
import GetBClientIDComponent from "@/common/components/GetBClientIDComponent/delivery";
import GetClientByEmail from "@/common/components/GetClientByEmail/delivery";
import GetClientByName from "@/common/components/GetClientByName/delivery";
import UpdateClientComponent from "@/common/components/UpdateClientComponent/delivery";
import DeleteClientForm from "@/common/components/DeleteClientForm/delivery";
import FeignMerchantExistComponent from "@/common/components/FeignMerchantExistComponent/delivery";

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

        {/* Create Client Form */}
        <div className="gap-8 mb-8">
            <CreateClientForm />
        </div>

        {/* Get a client by ID */}
        <div className="gap-8 mb-8">
            <GetBClientIDComponent />
        </div>

        {/* Get a client by email */}
        <div className="gap-8 mb-8">
            <GetClientByEmail />
        </div>

        {/* Get a client by name */}
        <div className="gap-8 mb-8">
            <GetClientByName />
        </div>

        {/* Update a client by ID */}
        <div className="gap-8 mb-8">
            <UpdateClientComponent />
        </div>

        {/* Delete a client by ID */}
        <div className="gap-8 mb-8">
            <DeleteClientForm />
        </div>

        {/* Get a merchant by feing */}
        <div className="gap-8 mb-8">
            <FeignMerchantExistComponent />
        </div>
      </div>
    </div>
  );
}