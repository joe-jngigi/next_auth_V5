/**
 * This is an array of routes that are accessible to the public
 * They don't require authentication
 * @type {string[]}
 */

export const publicRoutes: string[] = ["/"];

/**
 * This is an array of routes that are accessible to the Authentication
 * They  require authentication
 * @type {string[]}
 */
export const authRoutes: string[] = ["/auth/login", "/auth/register"];

/**
 * The prefix API for authentication API routes.
 * These are routes that start with this prefix and are used for authentication.
 * The default path is: "/api/auth"
 * @type {string}
 */
export const authAPIPrefix: string = "/api/auth/";

/**
 * The default redirect login route
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/settings";
