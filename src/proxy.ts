import { NextResponse, type NextRequest } from "next/server";
import { userServices } from "./services/user-service";
import { ROLE } from "./types";

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const session = await userServices.getUserSession();

  if (!session.success) {
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  // validate role
  const userRole = session.data?.user?.role;
  if (userRole === undefined) {
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  if (!Object.values(ROLE).includes(userRole)) {
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path*",
};
