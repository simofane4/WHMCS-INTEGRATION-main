import { NextResponse } from 'next/server';

// Move these to environment variables in production
const WHMCS_API_URL = 'https://login.wget.ma/includes/api.php';
const API_IDENTIFIER = 'PLAfTuv5XfgMDdsy0a6ETC3sjs9qFwLU';
const API_SECRET = 'pw08vf3Il8lHsm2P7Hyx0kyTFdtXwo9X';
const ACCESS_KEY = 'CE39E3CFFC98BE973FDDD165C9AC9';

export async function POST(request: Request) {
  try {
    const { domain } = await request.json();

    if (!domain) {
      return NextResponse.json(
        { error: 'Domain name is required' },
        { status: 400 }
      );
    }

    const requestData = {
      action: 'DomainWhois',
      username: API_IDENTIFIER,
      password: API_SECRET,
      accesskey: ACCESS_KEY,
      domain,
      responsetype: 'json',
    };

    const response = await fetch(WHMCS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(requestData),
    });

    if (!response.ok) {
      throw new Error(`WHMCS API responded with status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Domain search error:', error);
    return NextResponse.json(
      { error: 'Failed to check domain availability' },
      { status: 500 }
    );
  }
}