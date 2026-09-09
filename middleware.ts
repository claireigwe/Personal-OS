import { auth } from "@/auth";

const publicRoutes = ["/login", "/signup", "/api/auth", "/api/tts"];

export default auth((req) => {
  const isPublic = publicRoutes.some((route) => req.nextUrl.pathname.startsWith(route));
  if (!req.auth && !isPublic) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.href);
    return Response.redirect(loginUrl);
  }
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|manifest.webmanifest|sw.js|icons).*)"]
};
