import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";

type Role = keyof typeof roleBasedRoutes;
// Routes that don't require login
const publicRoutes = ["/login", "/register"];

// Role-based access control
// const roleBasedRoutes: { [key: string]: ("admin" | "user")[] } = {
//   "/create-shop": ["admin"], // Only admin can access this
//   "/dashboard": ["admin", "user"], // Optional: only admin dashboard
// };

const roleBasedRoutes = {
  user: [/^\/user/],
  admin: [/^\/admin/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const userInfo = await getCurrentUser(); // Should return user info with `role`

  // If not logged in
  if (!userInfo) {
    if (publicRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirectPath=${pathname}`, request.url)
      );
    }
  }

  // Role-based route access
  //   for (const route in roleBasedRoutes) {
  //     if (pathname.startsWith(route)) {
  //       const allowedRoles = roleBasedRoutes[route];
  //       if (!allowedRoles.includes(userInfo.role)) {
  //         return NextResponse.redirect(new URL("/unauthorized", request.url));
  //       }
  //     }
  //   }

  if (userInfo?.role && roleBasedRoutes[userInfo?.role as Role]) {
    const routes = roleBasedRoutes[userInfo?.role as Role];
    console.log("finds routes", routes);
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }
  return NextResponse.redirect(new URL("/", request.url));
};

// Match protected routes
export const config = {
  matcher: ["/login", "/create-shop", "/user", "/user/:page", "/admin", "/admin/:page"],
};
