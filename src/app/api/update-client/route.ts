import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    
    // Extraer token del header
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token de autenticación requerido' },
        { status: 401 }
      );
    }

    // Extraer ID del objeto data
    const { id, ...updateData } = data;
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID del cliente es requerido' },
        { status: 400 }
      );
    }

    console.log(`🔄 Actualizando cliente ID: ${id}`);
    console.log(`📋 Datos a enviar:`, updateData);

    // Hacer petición PUT al backend
    const backendUrl = `${process.env.NEXT_PUBLIC_CLIENT_SERVICE_URL || 'http://localhost:8080'}/clients/${id}`;
    
    const response = await fetch(backendUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData), // Enviar solo los datos sin el ID
    });

    const responseText = await response.text();
    let responseData;
    
    try {
      responseData = responseText ? JSON.parse(responseText) : null;
    } catch {
      responseData = responseText;
    }

    console.log(`📡 Respuesta del backend: ${response.status} - ${response.statusText}`);

    if (response.ok) {
      return NextResponse.json({
        success: true,
        data: responseData,
        status: response.status,
        statusText: response.statusText
      });
    } else {
      return NextResponse.json({
        success: false,
        error: responseData?.message || `Error ${response.status}: ${response.statusText}`,
        status: response.status,
        statusText: response.statusText
      }, { status: response.status });
    }

  } catch (error: any) {
    console.error('Error en PUT /api/update-client:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error interno del servidor en la API route de actualización' 
      }, 
      { status: 500 }
    );
  }
}
