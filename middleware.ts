import { type NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/"],
};

export default async function middleware(request: NextRequest) {
  const visitor = request.nextUrl.searchParams.get("visitor");

  if (visitor) {
    request.nextUrl.searchParams.delete("visitor");

    const res = NextResponse.redirect(request.nextUrl);

    res.cookies.set("visitor", visitor);

    return res;
  }

  return NextResponse.next();
}
