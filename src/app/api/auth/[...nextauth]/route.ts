import { apiServices } from "@/services/api"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "email", type: "text", placeholder: "your email@examole.com" },
                password: { label: "password", type: "password", placeholder: "*******" }
            },
            async authorize(credentials, req) {

                credentials?.email
                credentials?.password

                const response = await apiServices.login(credentials?.email ?? "", credentials?.password ?? "")



                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                // const res = await fetch("/your/endpoint", {
                //     method: 'POST',
                //     body: JSON.stringify(credentials),
                //     headers: { "Content-Type": "application/json" }
                // })

                if (response.message == "success") {
                    const user = {
                        id: response.user.email,
                        name: response.user.name,
                        email: response.user.email,
                        role: response.user.role,
                        token: response.token
                    }
                    return user
                } else {
                    return null

                }
           
            }
        })
    ],
    pages:{
        signIn: '/auth/login'
    },
    callbacks:{
            async session({session, token}){
                session.user.role = token.role as string;
                session.token = token.token as string ;
                return session
            }   ,
            async jwt({token , user}){
                if(user){
                    token.token = user.token;
                    token.role = user.role
                }
                return token
            }
    },
    secret:process.env.AUTH_SECRET,
    session:{
        strategy: "jwt"
    }
})

export { handler as GET, handler as POST }