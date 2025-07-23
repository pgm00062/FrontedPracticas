import MerchantResultById from '../../../pages/MerchantComponents/MerchantSearchById';
import { searchMerchantByIdServer } from '../infrastructure/merchantSearchOperations';

interface Props {
  searchParams?: { clientId?: string; merchantId?: string };
}

export default async function GetByIdMerchantServer({ searchParams }: Props) {
  const clientId = searchParams?.clientId?.trim() || '';
  const merchantId = searchParams?.merchantId?.trim() || '';

    let result = null;
    if (clientId || merchantId) {
        const searchResult = await searchMerchantByIdServer(clientId, merchantId);
        result = searchResult.data || null; // <-- aquí se accede a .data
    }

  return (
    <MerchantResultById
      initialClientId={clientId}
      initialMerchantId={merchantId}
      initialResult={result}
    />
  );
}