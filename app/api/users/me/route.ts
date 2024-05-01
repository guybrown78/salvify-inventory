import { SessionUser } from "@/app/_types/types";
import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
	const session = await getServerSession(authOptions);
	if (!session) {
		return NextResponse.json({}, { status: 401 });
	}
	
	const userEmail = session?.user?.email;
	if (!userEmail) {
		return NextResponse.json({ error: 'User email not found' }, { status: 404 });
	}
	
	const user = await prisma.user.findUnique({
		where: { email: userEmail }
	});
	if (!user) {
		return NextResponse.json({ error: 'Invalid User' }, { status: 404 })
	}
	const sessionUser:SessionUser = {
		firstname: user.firstname ?? null,
		surname: user.surname ?? null,
		name: user.name!,
		email: user.email!,
		image: user.image ?? null,
		role: user.role!,
		clientId: user.clientId ?? null
	}
	return NextResponse.json(sessionUser);

}