import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const isAdmin = req.cookies.get("isAdmin")?.value === "true";
  const pathname = req.nextUrl.pathname;

  if (
    pathname.startsWith("/admin") &&
    pathname !== "/admin/login" &&
    !isAdmin
  ) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

// Only run middleware on admin routes
export const config = {
  matcher: ["/admin/:path*"],
};
