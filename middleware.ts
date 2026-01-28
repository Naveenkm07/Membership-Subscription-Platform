import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const authed = req.cookies.get("mp_auth")?.value === "1";

  if (!authed) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/content/:path*", "/profile/:path*", "/billing/:path*"],
};
