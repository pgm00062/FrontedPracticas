import CreateMerchantComponent from '@/common/components/merchantComponents/CreateMerchantComponent/delivery';
import HeaderComponent from '@/common/components/SharedComponents/HeaderComponen';
import TestBackendConnection from '@/common/components/SharedComponents/TestBackendConnection';
import  GetByIdMerchantComponent  from '@/common/components/merchantComponents/GetByIdMerchantComponent/delivery';
import GetByNameMerchantComponent from '@/common/components/merchantComponents/GetByNameMerchantComponent/delivery';
import UpdateMerchantComponent from '@/common/components/merchantComponents/UpdateMerchantComponent/delivery';
import GetMerchantsByClientIdComponent from '@/common/components/merchantComponents/GetMerchantsByClientIdComponent/delivery';
import MerchantTabs from '@/common/components/merchantComponents/MerchantTabs';

interface Props {
  searchParams?: { [key: string]: any };
}

export default function MerchantPage() {
  const tabItems = [
    { key: 'create', label: 'Crear Merchant', children: <CreateMerchantComponent /> },
    { key: 'getById', label: 'Buscar Merchant por ID', children: <GetByIdMerchantComponent /> },
    { key: 'getByName', label: 'Buscar Merchant por Nombre', children: <GetByNameMerchantComponent /> },
    { key: 'update', label: 'Actualizar Merchant', children: <UpdateMerchantComponent /> },
    { key: 'getByClientId', label: 'Buscar Merchants por Cliente ID', children: <GetMerchantsByClientIdComponent /> },
    { key: 'test', label: 'Test Backend', children: <TestBackendConnection scope="merchant" /> },
  ];

  return (
    <div>
      <HeaderComponent />
      <div className="container-main py-8">
        <MerchantTabs tabItems={tabItems} />
      </div>
    </div>
  );
}
