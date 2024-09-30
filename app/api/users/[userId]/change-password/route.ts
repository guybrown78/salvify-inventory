import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getSessionUser } from "@/app/_utils/getSessionUser";
import prisma from "@/prisma/client";
import { changePasswordSchema } from "@/app/validationSchema";

// PATCH request handler for changing password
export async function PATCH(
  request:  NextRequest, 
  { params }: { params: { userId: string } }
) {
  // Step 1: Authenticate user
  const sessionUser = await getSessionUser();
  if (!sessionUser || sessionUser.id !== params.userId) {
    return NextResponse.json("You don't have the access rights to change the password", { status: 403 });
  }
  
  // Step 2: Validate request body using changePasswordSchema
  const body = await request.json();
  const validation = changePasswordSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const { currentPassword, newPassword } = validation.data;

  try {
    // Step 3: Get the current user from the database
    const user = await prisma.user.findUnique({
      where: { id: sessionUser.id },
      select: { 
        hashedPassword: true,  // Correct selection of hashedPassword
      },
    });

    if (!user || !user.hashedPassword) {
      return NextResponse.json("User not found", { status: 404 });
    }

    // Step 4: Compare currentPassword with the hashed password in the database
    const passwordMatch = await bcrypt.compare(currentPassword, user.hashedPassword);
    if (!passwordMatch) {
      return NextResponse.json("Incorrect current password", { status: 401 });
    }

    // Step 5: Hash the new password using bcrypt
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Step 6: Update the user's hashedPassword in the database
    await prisma.user.update({
      where: { id: sessionUser.id },
      data: { hashedPassword: hashedNewPassword },  // Correct update for hashedPassword
    });

    // Step 7: Return success response
    return NextResponse.json("Password successfully changed", { status: 200 });
  } catch (error) {
    console.error("Error changing password:", error);
    return NextResponse.json("Failed to change the password", { status: 500 });
  }
}