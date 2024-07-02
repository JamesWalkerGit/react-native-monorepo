
import NextAuth from "next-auth"
import Apple from "next-auth/providers/apple"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [GitHub, Google,

        Apple({
            clientId: process.env.APPLE_ID,
            clientSecret: process.env.APPLE_SECRET,
            wellKnown: "https://appleid.apple.com/.well-known/openid-configuration",
            checks: ["pkce"],
            authorization: {
                url: 'https://appleid.apple.com/auth/authorize',
                params: {
                    scope: "name email",
                    response_type: "code",
                    response_mode: "form_post",
                    state: crypto.randomUUID(),
                },
            },
            token: {
                url: `https://appleid.apple.com/auth/token`,
            },
            client: {
                token_endpoint_auth_method: "client_secret_post",
            },
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name || null,
                    email: profile.email || null,
                    image: null,
                }
            },
            profileConform(profile, query) {
                if (query.user) {
                    const user = JSON.parse(query.user);
                    if (user.name) {
                        profile.name = Object.values(user.name).join(" ");
                    }
                }
                return profile;
            },
        })
    ],
    session: {
        strategy: 'jwt'
    },
})