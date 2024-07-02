import { NextRequest, NextResponse } from 'next/server'
import { GET as NextAuthGET } from '../[...nextauth]/route'

export { NextAuthGET as GET }

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const queryParams: { [key: string]: string } = {};
  data.forEach((value, key) => {
    queryParams[key] = value.toString();
  });

  const searchParams = new URLSearchParams(queryParams);
  const cookie = req.headers.get('cookie') || '';

  return NextResponse.redirect(
    `https://${req.headers.get('host')}/api/auth/callback/apple?${searchParams.toString()}`,
    {
      status: 302,
      headers: {
        cookie,
      },
    }
  );
}
