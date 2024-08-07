import { getSessionUser } from "@/app/_utils/getSessionUser";
import authOptions from "@/app/auth/authOptions";
import { itemSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {

	const session = await getServerSession(authOptions);
	if(!session){
		return NextResponse.json({}, {status: 401});
	}
	const sessionUser = await getSessionUser();
	if(!sessionUser){
		return NextResponse.json("Cannot find session user", {status: 400});
	}
	if(!sessionUser.clientId){
		return NextResponse.json("Cannot find session user client", {status: 400});
	}
	
	const body = await request.json();
	const validation = itemSchema.safeParse(body);
	if(!validation.success){
		return NextResponse.json(validation.error.format(), {status: 400});
	}

	// create new item
	const newItem = await prisma.item.create({
		data: {
			title: body.title,
			information: body.information || null,
			requiredCount: body.requiredCount || null,
			type: body.type,
			category: body.category,
			grouping: body.grouping,
			instructionsURL: body.instructionsURL || null,
			bnfSlug: body.bnfSlug || null,
  		emcId: body.emcId || null,
			clientId:sessionUser!.clientId!
		}
	})

	return NextResponse.json(newItem, { status: 201 });
}

export async function GET(request: NextRequest){
	const session = await getServerSession(authOptions);
	if(!session){
		return NextResponse.json({}, {status: 401});
	}
	const sessionUser = await getSessionUser();
	if(!sessionUser){
		return NextResponse.json("Cannot find session user", {status: 400});
	}
	if(!sessionUser.clientId){
		return NextResponse.json("Cannot find session user client", {status: 400});
	}


	const url = new URL(request.url);
  const search = url.searchParams.get('search')?.toLowerCase() || '';

	const items = await prisma.item?.findMany({
    where:{
			clientId: sessionUser!.clientId!,
			title: {
        contains: search
      },
		}
  });

	return NextResponse.json(items)

}