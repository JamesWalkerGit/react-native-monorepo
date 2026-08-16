
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

const isAuthDebugEnabled = process.env.AUTH_DEBUG === 'true'

const normalizeLogMetadata = (metadata: unknown) => {
    if (!metadata || typeof metadata !== 'object') {
        return metadata
    }

    if (metadata instanceof Error) {
        return {
            name: metadata.name,
            message: metadata.message,
            stack: metadata.stack
        }
    }

    return metadata
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [GitHub, Google,],
    pages: {
        error: '/auth/error'
    },
    debug: isAuthDebugEnabled,
    logger: {
        error(error) {
            console.error('[auth][error]', normalizeLogMetadata(error))
        },
        warn(code) {
            console.warn('[auth][warn]', code)
        },
        debug(code, metadata) {
            if (!isAuthDebugEnabled) {
                return
            }

            console.debug('[auth][debug]', code, normalizeLogMetadata(metadata))
        }
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
            if (url.startsWith('/api/auth/error')) {
                const parsed = new URL(url, baseUrl)
                const error = parsed.searchParams.get('error')
                return `${baseUrl}/auth/error${error ? `?error=${encodeURIComponent(error)}` : ''}`
            }

            if (url.startsWith('/')) {
                return `${baseUrl}${url}`
            }

            if (new URL(url).origin === baseUrl) {
                return url
            }

            return baseUrl
        }
    }
})
