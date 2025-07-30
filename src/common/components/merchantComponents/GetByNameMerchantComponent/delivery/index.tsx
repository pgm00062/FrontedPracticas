import { searchMerchantByNameServer } from '../infrastructure/merchantSearchOperations';
import GetByNameMerchantComponent from '../../../pages/MerchantComponents/MerchantSearchByName';
import { Suspense } from 'react';
import { Skeleton } from 'antd';

interface Props {
    searchParams: { name?: string };
}

export default async function GetMerchantByName({ searchParams }: Props) {
  const merchantName = searchParams?.name?.trim() || "";
  let searchResults;
  // Retardo artificial para mostrar el Skeleton
  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
  if (merchantName) {
    searchResults = await searchMerchantByNameServer(merchantName);
    if (!searchResults.data || searchResults.data.length === 0) {
      searchResults = await searchMerchantByNameServer("");
    }
    await delay(600); // 600ms de retardo
  } else {
    searchResults = await searchMerchantByNameServer("");
    await delay(600); // 600ms de retardo
  }
  return (
    <Suspense fallback={<Skeleton active paragraph={{ rows: 2 }} />}>
      <GetByNameMerchantComponent merchants={searchResults.data || []} />
    </Suspense>
  );
}