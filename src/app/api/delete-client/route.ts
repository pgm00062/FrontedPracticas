import {NextResponse} from 'next/server';

export async function DELETE(request: Request) {
    try {
        const data = await request.json();

        const authHeader = request.headers.get('authorization');
        const token = authHeader?.replace('Bearer ', '');
        if (!token) {
            return NextResponse.json(
                { success: false, error: 'Token de autenticación requerido' },
                { status: 401 }
            );
        }
        const { id } = data;
        if (!id) {
            return NextResponse.json(
                { success: false, error: 'ID del cliente es requerido' },
                { status: 400 }
            );
        }
        console.log(`🗑️ Eliminando cliente ID: ${id}`);
        const backendUrl = `${process.env.NEXT_PUBLIC_CLIENT_SERVICE_URL || 'http://localhost:8080'}/clients/${id}`;
        const response = await fetch(backendUrl, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }), 
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
        }else{
            return NextResponse.json({
                success: false,
                error: responseData?.message || 'Error al eliminar cliente',
                status: response.status,
                statusText: response.statusText
            }, { status: response.status });
        }
    } catch (error) {
        console.error('Error al eliminar cliente:', error);
        return NextResponse.json(
            { success: false, error: 'Error al eliminar cliente' },
            { status: 500 }
        );
    }
}