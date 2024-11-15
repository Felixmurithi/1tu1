// top level, runs on every route/page code (if ther cookies the routes will be dynamic), match er can be used to stop running on selcted routes. Only 1 miidleware file and function should be created. "middleware redirects or rewrites to a route"
// gets acess to the incoming request

import { auth } from "./app/_lib/auth";

export const middleware = auth;
export const config = {
  matcher: ["/dates", "/user"],
};

// Middleware, request, redirecting and matching the route to run the middleware function
// import { NextResponse } from "next/server";

// export function middleware(request) {
//   return NextResponse.redirect(new URL("/about", request.url));
// }
// export const config = {
//     matcher: ["/account"],
//   };

//TODO
// u can send json back with middleware
