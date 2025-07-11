import CreateClientForm from "@/common/components/clientComoponents/CreateClientForm/delivery";
import UpdateClientComponent from "@/common/components/clientComoponents/UpdateClientComponent/delivery";
import DeleteClientForm from "@/common/components/clientComoponents/DeleteClientForm/delivery";
import FeignMerchantExistComponent from "@/common/components/clientComoponents/FeignMerchantExistComponent/delivery";
import SearchingClients from "@/common/components/clientComoponents/SearchingClients/delivery";
import HeaderComponent from '@/common/components/SharedComponents/HeaderComponen';
import TestBackendConnection from "@/common/components/SharedComponents/TestBackendConnection";

export default function Home() {
  return (
    <div >
      <HeaderComponent />

      {/* Main Content */}
      <div className="container-main py-8">

        {/* Create Client Form */}
        <div className="gap-8 mb-8">
            <CreateClientForm />
        </div>

        {/* Searching Clients Section */}
        <div className="gap-8 mb-8">
          <SearchingClients />
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

        <div className="gap-8 mb-8">
            <TestBackendConnection scope="client"/>
        </div>
      </div>
    </div>
  );
}