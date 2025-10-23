import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const cmsAuth = req.cookies.get("cms_auth")?.value;

  if (req.nextUrl.pathname.startsWith("/cms") && cmsAuth !== "true") {
    return NextResponse.redirect(new URL("/", req.url)); // redirect ke home
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cms/:path*"],
};
