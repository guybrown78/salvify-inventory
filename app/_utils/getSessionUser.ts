import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions'
import { SessionUser } from '@/app/_types/types'
import prisma from '@/prisma/client';

export async function getSessionUser():Promise<SessionUser | null> {
	try {
		const session = await getServerSession(authOptions)
		if(!session){
			return null;
		}
		const user = await prisma.user.findUnique({
			where: { email: session?.user.email },
			include: { selectedClient: true }
		});
		if(!user){
			return null;
		}
		const sessionUser:SessionUser = {
			id: user.id,
			firstname: user.firstname ?? null,
			surname: user.surname ?? null,
			name: user.name!,
			email: user.email!,
			image: user.image ?? null,
			role: user.role!,
			clientId: user.clientId!,
			clientName: user.selectedClient!.name,
		}
		return sessionUser
	} catch (err) {
		if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error('An unknown error occurred');
    }
		return null;
	}
}