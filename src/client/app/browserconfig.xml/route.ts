import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const baseUrl = process.env.NODE_ENV === 'production' ? 'https://inbola.uz' : 'http://localhost:3000'
  
  const browserConfigXml = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square70x70logo src="${baseUrl}/mstile-70x70.png"/>
      <square150x150logo src="${baseUrl}/mstile-150x150.png"/>
      <square310x310logo src="${baseUrl}/mstile-310x310.png"/>
      <wide310x150logo src="${baseUrl}/mstile-310x150.png"/>
      <TileColor>#ec4899</TileColor>
    </tile>
  </msapplication>
</browserconfig>`

  return new NextResponse(browserConfigXml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400',
    },
  })
}
