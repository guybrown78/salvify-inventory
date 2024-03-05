import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
	request: NextRequest, 
	{ params }: { params: { id: string }}) {

		const body = await request.json();
		return NextResponse.json({});
}