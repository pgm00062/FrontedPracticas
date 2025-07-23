import {searchMerchantByNameServer} from '../infrastructure/merchantSearchOperations';
import GetByNameMerchantComponent from '../../../pages/MerchantComponents/MerchantSearchByName';

interface Props {
    searchParams: { name?: string };
}

export default async function GetMerchantByName({ searchParams }: Props) {
  const merchantName = searchParams?.name?.trim() || "";
    const searchResults = merchantName ? await searchMerchantByNameServer(merchantName) : { data: [] };
    return (
    <GetByNameMerchantComponent merchants={searchResults.data || []} />
    );
}