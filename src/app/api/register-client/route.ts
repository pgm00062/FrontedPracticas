import { NextResponse } from 'next/server';
import { createClientRegister } from '@/common/components/clientComoponents/ClientRegisterServer/infrastructure/clientCreationOperations';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const result = await createClientRegister(data);
    
    if (result.success) {
      return NextResponse.json(result, { status: 201 });
    } else {
      return NextResponse.json(result, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error interno del servidor en la API route' 
      }, 
      { status: 500 }
    );
  }
}