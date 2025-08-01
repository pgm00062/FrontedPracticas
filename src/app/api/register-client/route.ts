import { NextResponse } from 'next/server';
import { createClientRegister } from '@/common/components/clientComoponents/ClientRegisterServer/infrastructure/clientCreationOperations';

export async function POST(request: Request) {
  const data = await request.json();
  const result = await createClientRegister(data);
  return NextResponse.json(result);
}