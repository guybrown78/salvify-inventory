
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

		const { clientId, clientName, firstname, surname, email } = await request.json();

		const updates: any = {};
		if (clientId !== undefined) updates.clientId = clientId;
    if (clientName !== undefined) updates.clientName = clientName;
    if (firstname !== undefined) updates.firstname = firstname;
    if (surname !== undefined) updates.surname = surname;
		if (email !== undefined) updates.email = email;

		// Construct the full name only if firstname or surname has changed
    if (updates.firstname || updates.surname) {
      updates.name = `${updates.firstname || session.user.firstname || ""} ${
        updates.surname || session.user.surname || ""
      }`.trim();
    }
		
		// Dynamically update session properties
    if (clientId !== undefined) session.user.clientId = clientId;
    if (clientName !== undefined) session.user.clientName = clientName;
    if (firstname) session.user.firstname = firstname;
    if (surname) session.user.surname = surname;
    if (email) session.user.email = email;
    if (updates.name) session.user.name = updates.name;


    return NextResponse.json({ session: session.user }, { status: 200 });
  } catch (error) {
    console.error("Error updating session:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

