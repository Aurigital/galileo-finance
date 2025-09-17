export async function GET() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    
    const response = await fetch('https://tipodecambio.paginasweb.cr/api', {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; Galileo-Finance/1.0)'
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      console.error('Exchange rate API failed:', response.status);
      return Response.json(
        { error: 'Failed to fetch exchange rates' }, 
        { status: 502 }
      );
    }
    
    const data = await response.json();
    
    if (!data || !data.compra || !data.venta || isNaN(data.compra) || isNaN(data.venta)) {
      console.error('Invalid exchange rate data:', data);
      return Response.json(
        { error: 'Invalid exchange rate data' }, 
        { status: 502 }
      );
    }
    
    return Response.json({
      compra: Number(data.compra),
      venta: Number(data.venta),
      fecha: data.fecha,
      timestamp: new Date().toISOString()
    }, {
      headers: {
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=60'
      }
    });
    
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Exchange rate API timeout');
      return Response.json(
        { error: 'Request timeout' }, 
        { status: 504 }
      );
    }
    
    console.error('Exchange rate API error:', error);
    return Response.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}