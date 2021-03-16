import { NextApiHandler } from 'next'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { SessionBase } from 'next-auth/_utils'

interface Session extends SessionBase {
  jwt: string
  id: string
}

const Auth: NextApiHandler = (req, res) =>
  NextAuth(req, res, {
    pages: {
      signIn: '/auth/signin',
      newUser: '/', // redirect on new user
    },
    providers: [
      Providers.Email({
        server: process.env.EMAIL_SERVER,
        from: process.env.EMAIL_FROM,
      }),
    ],
    database: process.env.NEXT_PUBLIC_DATABASE_URL,
    session: {
      jwt: true,
    },
    callbacks: {
      session: async (session, user) =>
        ({
          ...session,
          jwt: (user as any).jwt,
          id: (user as any).id,
        } as Session),

      jwt: async (token, user, account) => {
        const isSignIn = !!user

        if (isSignIn) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/${account.provider}/callback?access_token=${account?.accessToken}`,
          )
          const data = await response.json()
          console.dir(data)
          token.jwt = data.jwt
          token.id = data.user.id
        }

        return token
      },
    },
  })

export default Auth
