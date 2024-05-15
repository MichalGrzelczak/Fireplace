import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default withAuth(async (request: NextRequest) => {
  const token = await getToken({ req: request });
  console.log("token:", token);

  if (!token && process.env.NEXTAUTH_URL) {
    return NextResponse.redirect(new URL("/", request.url));
  }
});

export const config = {
  matcher: "/app/:path*",
};
