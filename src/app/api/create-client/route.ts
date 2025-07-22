import { NextResponse } from 'next/server';
import { createClientWithJWTServer } from '@/common/components/clientComoponents/CreateClientForm/infrastructure/clientCreationOperations';

export async function POST(request: Request) {
  const data = await request.json();
  const result = await createClientWithJWTServer(data);
  return NextResponse.json(result);
}