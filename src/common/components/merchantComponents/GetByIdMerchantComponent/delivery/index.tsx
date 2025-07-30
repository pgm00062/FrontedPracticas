import MerchantResultById from '../../../pages/MerchantComponents/MerchantSearchById';
import { searchMerchantByIdServer } from '../infrastructure/merchantSearchOperations';
import { Suspense } from 'react';
import { Skeleton } from 'antd';

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function GetByIdMerchantServer({ searchParams }: Props) {
  const clientId = (typeof searchParams?.clientId === 'string' ? searchParams.clientId.trim() : '') || '';
  const merchantId = (typeof searchParams?.merchantId === 'string' ? searchParams.merchantId.trim() : '') || '';

  let result = null;
  if (clientId || merchantId) {
    const searchResult = await searchMerchantByIdServer(clientId, merchantId);
    result = (searchResult && searchResult.success && searchResult.data) ? searchResult.data : null;
  }

  return (
    <Suspense fallback={<Skeleton active paragraph={{ rows: 2 }} />}>
      <MerchantResultById
        initialClientId={clientId}
        initialMerchantId={merchantId}
        initialResult={result}
      />
    </Suspense>
  );
}