import { NextResponse } from 'next/server';
import { clientLogin } from '@/common/components/clientComoponents/ClientLoginServer/infrastructure/clientLoginOperations';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const result = await clientLogin(data);
    
    // Asegurar que la respuesta tenga el status code correcto
    if (result.success) {
      return NextResponse.json(result, { status: 200 });
    } else {
      // Determinar el status code basado en el tipo de error
      let statusCode = 400;
      if (result.error?.includes('Email o contraseña incorrectos')) {
        statusCode = 401;
      } else if (result.error?.includes('No existe una cuenta')) {
        statusCode = 404;
      }
      
      return NextResponse.json(result, { status: statusCode });
    }
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error interno del servidor en la API route de login' 
      }, 
      { status: 500 }
    );
  }
}
