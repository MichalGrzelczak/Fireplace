import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token && process.env.NEXTAUTH_URL) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: "/app/:path*",
};
