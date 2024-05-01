import prisma from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { Prisma, UserRole } from "@prisma/client";
import { NextAuthOptions, Awaitable, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";

type ExtendedUserType = User & { 
	clientId?: number | null; 
	role?: UserRole | null; 
};


// NEED TO ADD THE USER DETAILS (clientId & role) TO THE SESSION>USER BUT WHEN WE DO IT DOESNT BUILD - THINK ITS VERSIONS SO NEED TO INVESTIGATE THE BEST VERSION OF NEXT-AUTH, NEXT AND NEXTAUTHPRISMAADAPTER TO USE!
// interface UserSession {
//   id: string | null;
//   name?: string | null;
//   email?: string | null;
//   image?: string | null;
//   role?: UserRole | null; 
//   clientId?: number | null; 
// }
// interface JWTToken {
//   uid: string;
//   role?: UserRole | null | undefined; 
//   clientId?: number | null | undefined; 
//   // Add other properties as needed
// }

// const castTokenToSession = (sessionUser: UserSession, token:{
// 	sub: string | null;
// 	role?: UserRole | null;
//   clientId?: number | null; 
// }):UserSession => {
// 	let user:UserSession = { ...sessionUser }
// 	if(token.sub){
// 		console.log("sub", typeof token.sub)
// 		user.id = token.sub
// 	}
// 	if(token.role){
// 		console.log("role", typeof token.role)
// 		user.role = token.role
// 	}
// 	if(token.clientId){
// 		console.log("clientId", typeof token.clientId)
// 		user.clientId = token.clientId
// 	}else{
// 		user.clientId = null;
// 	}
// 	return user;
// }
const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers:[
		CredentialsProvider({
			name: 'Credentials',
			credentials:{
				email: { label: 'Email', type: 'email', placeholder: 'Email'},
				password: { label: 'Password', type: 'password', placeholder: 'Password'},
			},
			async authorize(credentials, req){
				if(!credentials?.email || !credentials.password) return null;

				const user = await prisma.user.findUnique(
					{where: { email: credentials.email },
				})

				if(!user) return null;

				const passwordsMatch = await bcrypt.compare(
					credentials.password, 
					user.hashedPassword!
				);

				return passwordsMatch ? user : null;
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!
		})
	],


	// callbacks: {
  //   session: async ({ session, token, user }) => {
	// 		if (session?.user) {
  //     	(session.user as ExtendedUserType).clientId = token.clientId ?? null
	// 		}
  //     return session;
  //   },
  // },


	session: {
		strategy: 'jwt'
	},
	pages:{
		signIn: '/auth/signin',
		// signOut: '/auth/signout',
	},
	
}

export default authOptions;