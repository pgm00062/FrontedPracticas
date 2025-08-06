import { searchMerchantByNameServer } from '../infrastructure/merchantSearchOperations';
import GetByNameMerchantComponent from '../../../pages/MerchantComponents/MerchantSearchByName';
import { Suspense } from 'react';
import { Skeleton } from 'antd';
import { Props } from './interface';

export default async function GetMerchantByName({ searchParams }: Props) {
  const merchantName = searchParams?.name?.trim() || "";
  let searchResults;
  // Retardo  para mostrar el Skeleton
  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
  if (merchantName) {
    searchResults = await searchMerchantByNameServer(merchantName);
    if (!searchResults.data || searchResults.data.length === 0) {
      searchResults = await searchMerchantByNameServer("");
    }
    await delay(600); 
  } else {
    searchResults = await searchMerchantByNameServer("");
    await delay(600); 
  }
  return (
    <Suspense fallback={<Skeleton active paragraph={{ rows: 2 }} />}>
      <GetByNameMerchantComponent merchants={searchResults.data || []} />
    </Suspense>
  );
}