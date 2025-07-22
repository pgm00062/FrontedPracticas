import { NextResponse } from 'next/server';
import { searchClientByNameServer } from '@/common/components/clientComoponents/GetClientByName/infrastructure/clientSearchOperations';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name') || '';
  const clients = name ? await searchClientByNameServer(name) : [];
  return NextResponse.json({ clients });
}