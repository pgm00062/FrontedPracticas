import { NextResponse } from 'next/server';
import { searchMerchantByNameServer } from '../../../common/components/merchantComponents/GetByNameMerchantComponent/infrastructure/merchantSearchOperations';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name') || '';
  const result = name ? await searchMerchantByNameServer(name) : { data: [] };
  console.log('API merchants:', result);
  return NextResponse.json({ merchants: result.data || [] });
}