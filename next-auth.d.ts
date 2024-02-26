import { DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";

export type extendedUser = DefaultSession["user"] & {
    role: UserRole
}

declare module "next-auth" {
    interface Session {
        user?: extendedUser
    }
}

// types/next-auth.d.ts

// import NextAuth from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       email?: string;
//       name?: string;
//       image?: string;
//       // Add other properties you need
//       role?: "admin" | "user" | string; // Adjust roles as needed
//     };
//   }

//   interface User {
//     id: string;
//     email?: string;
//     name?: string;
//     image?: string;
//     // Add other properties you need
//     role?: "admin" | "user" | string; // Adjust roles as needed
//   }
// }

