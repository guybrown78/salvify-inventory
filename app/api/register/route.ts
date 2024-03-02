
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"
import bcrypt from 'bcrypt'


const schema = z.object({
	firstname: z.string().min(1),
	surname: z.string().min(1),
	name: z.string().min(2),
	email: z.string().email(),
	password: z.string().min(8),
})

export async function POST(request: NextRequest) {
	const body = await request.json();
	
	const validation = schema.safeParse(body)

	if(!validation.success)
		return NextResponse.json(validation.error.errors, { 
			status: 400 
		});

	const user = await prisma.user.findUnique({ 
		where: { email: body.email }
	})

	if(user)
		return NextResponse.json(
		{ error: 'User already exists'}, 
		{ status: 400 }
	);
	//
	const hashedPassword = await bcrypt.hash(body.password, 10);
	// 
	const newUser = await prisma.user.create({ 
		data:{
			firstname: body.firstname,
			surname: body.surname,
			name: body.name,
			email: body.email,
			hashedPassword,
		}
	})
	//
	return NextResponse.json({ email: newUser.email });
}