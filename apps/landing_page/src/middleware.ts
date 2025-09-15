// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Protect only the /dashboard route
export default withAuth(
  function middleware() {
    // You can add custom logic here if needed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Only allow access if the user is logged in
        return !!token;
      },
    },
    pages: {
      signIn: "/dashboard/login", // redirect here if not logged in
    },
  }
);

// Only run middleware on /dashboard
export const config = {
  matcher: ["/dashboard/:path*"],
};
