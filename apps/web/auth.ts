
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
    secret: process.env.AUTH_SECRET,
    providers: [GitHub, Google, Apple({
        clientId: 'invalid',
        clientSecret: 'invalid',
        wellKnown: "https://appleid.apple.com/.well-known/openid-configuration",
        checks: ["pkce"],
        token: {
            url: `https://appleid.apple.com/auth/token`,
        },
        authorization: {
            url: 'https://appleid.apple.com/auth/authorize',
            params: {
                scope: '',
                response_type: 'code',
                response_mode: 'query',
                state: crypto.randomUUID()
            },
        },
        client: {
            token_endpoint_auth_method: "client_secret_post",
        },
    }),]
})