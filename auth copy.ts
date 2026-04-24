import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

type Role = "USER" | "ADMIN";

declare module "next-auth" {
  interface User {
    role?: Role;
  }
  interface Session {
    user: {
      id: string;
      role: Role;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google,
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // For development: accept demo credentials
        // In production: validate against database with hashed passwords
        if (
          credentials?.email === "admin@pawmatch.com" &&
          credentials?.password === "admin123"
        ) {
          return {
            id: "admin-1",
            name: "Admin User",
            email: "admin@pawmatch.com",
            role: "ADMIN" as Role,
          };
        }
        if (
          credentials?.email === "user@pawmatch.com" &&
          credentials?.password === "user123"
        ) {
          return {
            id: "user-1",
            name: "Demo User",
            email: "user@pawmatch.com",
            role: "USER" as Role,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id ?? token.sub;
        token.role = user.role ?? "USER";
      }
      // For Google OAuth: use the sub claim as the user ID
      if (account?.provider === "google") {
        token.id = token.sub;
        token.role = "USER";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
});
