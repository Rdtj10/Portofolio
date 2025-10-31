import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const cmsAuth = req.cookies.get("cms_auth")?.value;

  if (!cmsAuth && req.nextUrl.pathname.startsWith("/cms")) {
    const redirectUrl = new URL("/", req.url);
    redirectUrl.searchParams.set("unauthorized", "true");
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cms", "/cms/:path*"],
};
