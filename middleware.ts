import authConfig from "@/auth.config";
import NextAuth from "next-auth";

import {
  DEFAULT_LOGIN_REDIRECT,
  authAPIPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

export const { auth } = NextAuth(authConfig);

export default auth((req) => {
  
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  /**
   * This will return a boolean value based on::
   * The URL returned is compared against the pathname from the url is the same as the specified public routes
   *
   * @function {includes} Determines whether an array includes a certain element, returning true or false as appropriate.
   * @type { boolean }
   */
  const isPublicRoute: boolean = publicRoutes.includes(nextUrl.pathname);
  const isAPIAuthRoute = nextUrl.pathname.startsWith(authAPIPrefix);
  const isAuthRoute: boolean = authRoutes.includes(nextUrl.pathname);

  /**
   * What this is doing is that it is confirming whether the current param URLS API routes is prefixed by
   * the @path { "/api/auth"}. If that is the case it goes on to return a null value.
   *
   * Note, on return, this is supposed to give the page. If not true it will not return the page,
   * just break or go to the next code
   * That is first allow every single API route.
   */

  if (isAPIAuthRoute) {
    return;
  }

  /**
   * We then go check the auth routes. While technically they are public routes,
   * we did not include them in the public routes. Otherwise, you are left in an infite redirect loop.
   * The auth routes include @param {["/auth/login", "/auth/register"]}
   *
   * On this, when the isAuthroute is true, it means you are in either of the above routes. If false you are in another page.
   *
   * when I return null, it means it is true, hence it executes the code.
   *
   * Hence it checks the isLoggedIn. If this is true, it redirect to the DEFAULT_LOGIN_REDIRECT page.
   * If the loggin is false, it will not redirect to that page,
   *
   * @boolean { isLoggedIn }
   *
   * In the login, we return the Response, and from the response we get the redirect function, where we initialize a redirect URL
   * we pass in the second argument, which in turn allows to create an absolute URL. like
   * @url {http://localhost:3000/auth/login}
   */
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    // By this, we mean that we will always allow people to visit the auth route
    return;
  }

  /**
   * If you are not logged in; ie isLoggedIn is false and the it is not a publicRoutes, we redirect to the login page.
   * @type {boolean}
   */
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return;
});

/**
 * The @expression matcher is used to invoke the @function auth()
 * In this matcher, it has specified that we ignore all pages except the ones in the regular expression.
 *
 * Learned something new
 *
 * @const isLoggedIn = !!req.auth;
 *  console.log("Is logged in Status: ", isLoggedIn);
 *
 * This returns a boolean state, when we add the exclamation marks, otherwise it will return a null value.
 * 
 * Optionally, don't invoke Middleware on some paths
 */
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

