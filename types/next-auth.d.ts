import { UserRole } from "@prisma/client";
import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
	interface Session {
		user: {
			name?: string | null;
			firstname?: string | null;
			surname?: string | null;
			email?: string | null;
			image?: string | null;
			id: string;
			role: UserRole;
			clientId?: number | null;
			clientName?: string | null;
			optionalClients?: { clientId: number; name: string }[];
		};
	}

	interface User {
		id: string;
		name?: string | null;
		firstname?: string | null;
		surname?: string | null;
		email?: string | null;
		image?: string | null;
		role: UserRole;
		clientId?: number | null;
		clientName?: string | null;
		optionalClients?: { clientId: number; name: string }[];
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		id: string;
		name?: string | null;
		firstname?: string | null;
		surname?: string | null;
		email?: string | null;
		image?: string | null;
		role: UserRole;
		clientId?: number | null;
		clientName?: string | null;
		optionalClients?: { clientId: number; name: string }[];
	}
}
