import { Session } from "next-auth"
import { UpdateSession } from "next-auth/react"

export const authenticatedSessionMock: { update: UpdateSession, data: Session | null, status: any } = {
    update: function (data?: any): Promise<Session | null> { throw '' },
    data: {
        expires: '',
        user: {
            email: 'testEmail@test.com'
        }
    },
    status: 'authenticated'
}

export const unauthenticatedSessionMock: { update: UpdateSession, data: Session | null, status: any } = {
    update: function (data?: any): Promise<Session | null> { throw '' },
    data: null,
    status: 'unauthenticated'
}

export const loadingSessionMock: { update: UpdateSession, data: Session | null, status: any } = {
    update: function (data?: any): Promise<Session | null> { throw '' },
    data: null,
    status: 'loading'
}