import CreateClientForm from "@/common/components/clientComoponents/CreateClientForm/delivery";
import UpdateClientComponent from "@/common/components/clientComoponents/UpdateClientComponent/delivery";
import DeleteClientForm from "@/common/components/clientComoponents/DeleteClientForm/delivery";
import FeignMerchantExistComponent from "@/common/components/clientComoponents/FeignMerchantExistComponent/delivery";
import SearchingClients from "@/common/components/clientComoponents/SearchingClients/delivery";
import TestBackendConnection from "@/common/components/SharedComponents/TestBackendConnection";
import HeaderComponent from '@/common/components/SharedComponents/HeaderComponen';
import ClientTabs from "@/common/components/clientComoponents/ClientTabs";

interface Props {
  searchParams?: { [key: string]: any };
}

export default function ClientPage({ searchParams }: Props) {
  const tabItems = [
    { key: "create", label: "Crear Cliente", children: <CreateClientForm /> },
    { key: "search", label: "Buscar Clientes", children: <SearchingClients searchParams={searchParams ?? {}} /> },
    { key: "update", label: "Actualizar Cliente", children: <UpdateClientComponent /> },
    { key: "delete", label: "Eliminar Cliente", children: <DeleteClientForm /> },
    { key: "merchant", label: "Buscar Merchant", children: <FeignMerchantExistComponent /> },
    { key: "test", label: "Test Backend", children: <TestBackendConnection scope="client" /> },
  ];

  return (
    <div>
      <HeaderComponent />
      <div className="container-main py-8">
        <ClientTabs tabItems={tabItems} />
      </div>
    </div>
  );
}