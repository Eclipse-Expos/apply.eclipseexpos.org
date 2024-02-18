import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const useSecureCookies = (process.env.NEXTAUTH_URL as string).startsWith(
  "https://",
);
const cookiePrefix = useSecureCookies ? "__Secure-" : "";
const hostName = new URL(process.env.NEXTAUTH_URL as string).hostname;
const rootDomain = process.env.NEXTAUTH_ROOT_DOMAIN as string;

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Password",
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;

        try {
          const res = await fetch(
            process.env.NEXTAUTH_URL + "/api/auth/validate-credentials",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(credentials),
            },
          );

          const data = await res.json();

          if (data.user) {
            return data.user;
          } else {
            return null;
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/logout",
    newUser: "/setup-account",
  },

  session: {
    strategy: "jwt",
  },

  cookies: {
    sessionToken: {
      name: `${cookiePrefix}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
        domain: hostName === "localhost" ? hostName : `.${rootDomain}`,
      },
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
