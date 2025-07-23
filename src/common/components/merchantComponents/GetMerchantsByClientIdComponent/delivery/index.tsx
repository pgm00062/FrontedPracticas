import GetMerchantsByClientIdComponent from '../../../pages/MerchantComponents/MerchantSearchByClientId';
import { searchMerchantsByClientIdServer } from '../infrastructure/merchantsClientIdSearchOperations';
import type { MerchantData } from '../../../../utils/commonInterface';

interface Props {
  searchParams?: { clientId?: string };
}

export default async function GetMerchantsByClientIdServer({ searchParams }: Props) {
  const clientId = searchParams?.clientId?.trim() || '';

  let merchants: MerchantData[] = [];
  if (clientId) {
    const result = await searchMerchantsByClientIdServer(clientId);
    merchants = Array.isArray(result.data) ? result.data : [];
  }

  return (
    <GetMerchantsByClientIdComponent
      initialClientId={clientId}
      initialMerchants={merchants}
    />
  );
}