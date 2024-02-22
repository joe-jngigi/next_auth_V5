import { auth } from "./auth";

export default auth((req) => {

    const isLoggedIn = !!req.auth;

    console.log("Is logged in Status: ", isLoggedIn);
    
    // req.auth
    console.log("Auth Route:", req.nextUrl.pathname);
    
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

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
 */