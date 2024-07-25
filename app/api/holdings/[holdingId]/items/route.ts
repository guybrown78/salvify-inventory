import { getSessionUser } from "@/app/_utils/getSessionUser";
import authOptions from "@/app/auth/authOptions";
import { itemSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	request: NextRequest,
	{
		params,
	}: {
		params: {
			holdingId: string;
		};
	}
) {
	const session = await getServerSession(authOptions);
	if (!session) {
		return NextResponse.json({}, { status: 401 });
	}
	const sessionUser = await getSessionUser();
	if (!sessionUser) {
		return NextResponse.json("Cannot find session user", { status: 400 });
	}
	if (!sessionUser.clientId) {
		return NextResponse.json("Cannot find session user client", {
			status: 400,
		});
	}

	const holdingId = parseInt(params.holdingId);

	const url = new URL(request.url);
	const search = url.searchParams.get("search")?.toLowerCase() || "";

	const items = await prisma.item?.findMany({
		where: {
			clientId: sessionUser!.clientId!,
			title: {
				contains: search,
			},
			OR: [
				{
					instances: {
						some: {
							location: {
								holding: {
									id: holdingId,
								},
							},
						},
					},
				},
				{
					holdingItems: {
						some: {
							holding: {
								id: holdingId,
							},
						},
					},
				},
			],
		},
	});

	return NextResponse.json(items);
}
