import {NextResponse} from 'next/server';
import {createMerchantWithJWTServer} from '@/common/components/merchantComponents/CreateMerchantComponent/infrastructure/merchantCreationOperations';

export async function POST(request: Request) {
  const data = await request.json();
  const result = await createMerchantWithJWTServer(data);
  return NextResponse.json(result);
}