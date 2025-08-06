import { NextResponse } from 'next/server';
import { transformClientForCreation } from '@/common/components/clientComoponents/CreateClientForm/infrastructure/clientDataOperations';
import { clientServiceClient } from '@/common/utils/httpClient';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Obtener token del header Authorization
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '') || authHeader;
    
    if (!token) {
      return NextResponse.json({
        success: false,
        error: 'Token de autenticación requerido'
      }, { status: 401 });
    }

    // Transformar datos para creación
    const clientDataForCreation = transformClientForCreation(data);

    // Crear cliente usando el client HTTP con el token
    const createResponse = await clientServiceClient.post('/clients', clientDataForCreation, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      timeout: 10000,
      validateStatus: () => true
    });

    if (createResponse.status === 201) {
      return NextResponse.json({
        success: true,
        client: createResponse.data,
        jwt: token
      });
    } else if (createResponse.status === 409) {
      return NextResponse.json({
        success: false,
        error: 'Cliente ya existe con esos datos (email, CIF/NIF/NIE duplicado)'
      }, { status: 409 });
    } else if (createResponse.status === 400) {
      const errorMsg = createResponse.data?.error || 'Datos de entrada no válidos';
      return NextResponse.json({
        success: false,
        error: `Datos inválidos: ${errorMsg}`
      }, { status: 400 });
    } else if (createResponse.status === 500) {
      return NextResponse.json({
        success: false,
        error: 'Error interno del servidor. Inténtalo de nuevo.'
      }, { status: 500 });
    } else {
      return NextResponse.json({
        success: false,
        error: `Error inesperado: ${createResponse.status}`
      }, { status: createResponse.status });
    }
  } catch (error: any) {
    const errorMessage = error.message || 'Error desconocido';
    return NextResponse.json({
      success: false,
      error: `Error de conexión: ${errorMessage}`
    }, { status: 500 });
  }
}