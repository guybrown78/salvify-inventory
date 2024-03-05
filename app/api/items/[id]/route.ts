import { patchItemSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function PATCH(
	request: NextRequest, 
	{ params }: { params: { id: string }}) {

		const body = await request.json();
		const validation = patchItemSchema.safeParse(body)
		if(!validation.success){
			return NextResponse.json(validation.error.format(), {status: 400});
		}

		const { title, information, requiredCount, type, category, grouping } = body;
		// 

		const item = await prisma.item.findUnique({
			where: { id: parseInt(params.id) }
		})
		if(!item){
			return NextResponse.json({ error: 'Invalid Item'}, {status: 404});
		}

		const updatedItem = await prisma.item.update({
			where: { id: item.id },
			data: {
				title, 
				information, 
				requiredCount, 
				type,
				category, 
				grouping
			}
		});

		return NextResponse.json(updatedItem);
}