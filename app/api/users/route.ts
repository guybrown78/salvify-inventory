import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/app/_utils/getSessionUser";

export async function GET(request: NextRequest) {

	const sessionUser = await getSessionUser();
	if (!sessionUser) {
    return NextResponse.json("Unauthorized access", { status: 401 });
  }

	const clientId = sessionUser.clientId;
  if (!clientId) {
    return NextResponse.json("No client assigned to the user", { status: 400 });
  }

	try {
    const users = await prisma.user.findMany({
      where: { clientId },
      orderBy: { name: "asc" },
    });

    // Step 5: Return the filtered users
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json("Failed to fetch users", { status: 500 });
  }


}


