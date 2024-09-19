
import NextAuth from "next-auth"
import Apple from "next-auth/providers/apple"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
    cookies: {
        pkceCodeVerifier: {
            name: "next-auth.pkce.code_verifier",
            options: {
                httpOnly: true,
                sameSite: "none",
                path: "/",
                secure: true,
            },
        },
    },
    providers: [GitHub, Google, Apple({
        clientId: process.env.AUTH_APPLE_ID,
        clientSecret: "" + process.env.AUTH_APPLE_SECRET,
        checks: ["pkce"],
        token: {
            url: `https://appleid.apple.com/auth/token`,
        },
        client: {
            token_endpoint_auth_method: "client_secret_post",
        },
        authorization: {
            params: {
                response_mode: "form_post",
                response_type: "code",//do not set to "code id_token" as it will not work
                scope: "name email"
            },
        }
    }),]
})