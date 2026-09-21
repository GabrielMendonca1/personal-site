import { NextRequest, NextResponse } from "next/server";
import { preferredLocale } from "@/lib/i18n";

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const explicit = url.pathname.match(/^\/(pt|en)(?=\/|$)/);
  if (explicit) {
    url.pathname = url.pathname.slice(explicit[0].length) || "/";
    const response = NextResponse.redirect(url, 307);
    response.cookies.set("site-language", explicit[1], { path: "/", maxAge: 31536000, sameSite: "lax" });
    response.headers.set("Cache-Control", "private, no-store");
    return response;
  }
  const locale = preferredLocale(request.headers.get("accept-language"), request.cookies.get("site-language")?.value);
  url.pathname = `/${locale}${url.pathname === "/" ? "" : url.pathname}`;
  // Internal routing only: the browser keeps the same public URL in both languages.
  const response = NextResponse.rewrite(url);
  response.headers.set("Vary", "Accept-Language, Cookie");
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = { matcher: ["/", "/writing/:path*", "/pt/:path*", "/en/:path*"] };
