import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  // Validate URL format to prevent SSRF
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
    return NextResponse.json({ error: 'Only HTTP(S) URLs are allowed' }, { status: 400 });
  }

  try {
    const response = await fetch(url);
    const html = await response.text();

    const getMetaContent = (property: string): string | null => {
      const match = html.match(
        new RegExp(`<meta[^>]*(?:property|name)=["']${property}["'][^>]*content=["']([^"']*)["']`, 'i')
      );
      return match ? match[1] : null;
    };

    const ogData = {
      title: getMetaContent('og:title') || getMetaContent('title'),
      description: getMetaContent('og:description') || getMetaContent('description'),
      image: getMetaContent('og:image'),
      siteName: getMetaContent('og:site_name'),
    };

    return NextResponse.json(ogData);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch URL' }, { status: 500 });
  }
}
