import { withClerkMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// TODO: This is deprecated, should use authMiddleware

export default withClerkMiddleware((_req: NextRequest) => {
  console.log("Middleware running");
  return NextResponse.next();
});

// Stop Middleware running on static files
export const config = {
  matcher: ["/((?!_next/image|_next/static|favicon.ico).*)"],
};
