import prisma from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

type ExtendedUserType = User & {
	clientId?: number | null;
	role?: UserRole | null;
};

interface UserSession {
	id: string | null;
	name?: string | null;
	email?: string | null;
	image?: string | null;
	role?: UserRole | null;
	clientId?: number | null;
}
interface JWTToken {
	uid: string;
	role?: UserRole | null | undefined;
	clientId?: number | null | undefined;
	// Add other properties as needed
}

async function getUserDetails(emailOrUser: string | { email?: string | null }) {
	try {
		// Determine the email to use
		const email =
			typeof emailOrUser === "string" ? emailOrUser : emailOrUser.email;

		// If no email is provided, return null
		if (!email) return null;

		// Fetch user details from the database
		const dbUser = await prisma.user.findUnique({
			where: { email },
			select: {
				id: true,
				role: true,
				clientId: true,
				email: true, // Include email for additional verification
				name: true,
				firstname: true,
				surname: true,
				image: true,
				selectedClient: { select: { name: true } },
				optionalClients: {
					select: { clientId: true, client: { select: { name: true } } },
				},
			},
		});

		if (!dbUser) {
			return null; // Return null if the user does not exist
		}

		return {
			...dbUser,
			clientName: dbUser.selectedClient?.name || null,
			optionalClients: dbUser.optionalClients.map((oc) => ({
				clientId: oc.clientId,
				name: oc.client.name,
			})),
		};
	} catch (error) {
		console.error("Error fetching user details:", error);
		return null;
	}
}

const castTokenToSession = (
	sessionUser: UserSession,
	token: {
		sub: string | null;
		role?: UserRole | null;
		clientId?: number | null;
	}
): UserSession => {
	let user: UserSession = { ...sessionUser };
	if (token.sub) {
		console.log("sub", typeof token.sub);
		user.id = token.sub;
	}
	if (token.role) {
		console.log("role", typeof token.role);
		user.role = token.role;
	}
	if (token.clientId) {
		console.log("clientId", typeof token.clientId);
		user.clientId = token.clientId;
	} else {
		user.clientId = null;
	}
	return user;
};

const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email", placeholder: "Email" },
				password: {
					label: "Password",
					type: "password",
					placeholder: "Password",
				},
			},
			async authorize(credentials, req) {
				if (!credentials?.email || !credentials.password) return null;

				const user = await prisma.user.findUnique({
					where: { email: credentials.email },
				});

				if (!user) return null;
				const passwordsMatch = await bcrypt.compare(
					credentials.password,
					user.hashedPassword!
				);

				return passwordsMatch ? user : null;
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],

	callbacks: {
		async jwt({ token, user, account }) {
			try {
				// Attempt to get user details
				const dbUser = await getUserDetails(user || token);

				// If no user found, return existing token
				if (!dbUser) {
					console.warn("No user found for token/user", { token, user });
					return token;
				}

				// Update token with latest user information
				return {
					...token,
					id: dbUser.id,
					email: dbUser.email,
					name: dbUser.name,
					firstname: dbUser.firstname,
					surname: dbUser.surname,
					image: dbUser.image,
					role: dbUser.role,
					clientId: dbUser.clientId,
					clientName: dbUser.clientName,
					optionalClients: dbUser.optionalClients,
				};
			} catch (error) {
				console.error("JWT Callback Error:", error);
				return token;
			}
		},
		async session({ session, token }) {
			session.user = {
				...session.user, // Include default fields
				id: token.id as string, // Ensure type consistency
				role: token.role as UserRole,
				clientId: token.clientId as number | null,
				name: token.name ?? session.user.name,
				firstname: token.firstname ?? session.user.firstname,
				surname: token.surname ?? session.user.surname,
				email: token.email ?? session.user.email,
				image: token.image ?? session.user.image,
				clientName: token.clientName as string | null,
				optionalClients: token.optionalClients as {
					clientId: number;
					name: string;
				}[],
			};
			return session;
		},
	},

	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/auth/signin",
		// signOut: '/auth/signout',
	},
};

export default authOptions;
