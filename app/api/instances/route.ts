import authOptions from "@/app/auth/authOptions";
import { addInstanceSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


// Helper function to convert date input value to Prisma DateTime
const convertDateToPrismaDateTime = (dateInputValue:string) => {
  // Parse the date input value
  const parsedDate = new Date(dateInputValue);

  // Check if the parsed date is valid
  if (isNaN(parsedDate.getTime())) {
    // Handle invalid date input value (optional)
    console.error('Invalid date input value:', dateInputValue);
    return null; // or throw an error, return a default value, etc.
  }

  // Construct a new DateTime object with a specific time (e.g., 12:00:00)
  const prismaDateTime = new Date(parsedDate.toISOString().split('T')[0] + 'T12:00:00.000Z');

  return prismaDateTime;
};


export async function POST(request: NextRequest) {

	const session = await getServerSession(authOptions);
	if(!session){
		return NextResponse.json({}, {status: 401});
	}

	const body = await request.json();
	const validation = addInstanceSchema.safeParse(body);
	if(!validation.success){
		return NextResponse.json(validation.error.format(), {status: 400});
	}
	
	// check the item
	const item = await prisma.item.findUnique({
		where: { id: parseInt(body.itemId) }
	})
	if(!item){
		return NextResponse.json({ error: 'Invalid Item' }, {status: 404})
	}
	// check the location
	const location = await prisma.location.findUnique({
		where: { id: parseInt(body.locationId) }
	})
	if(!location){
		return NextResponse.json({ error: 'Invalid Location' }, {status: 404})
	}
	// check date
	let prismaDateTime;
	prismaDateTime = await convertDateToPrismaDateTime(body.expiryDate);
	if(body.expiryDate !== "" && !prismaDateTime){
		return NextResponse.json({ error: 'Invalid Date' }, {status: 404})
	}
	console.log(prismaDateTime)

	const newInstance = await prisma.instance.create({ data: {
		itemId: item.id,
		locationId: location.id,
		quantity: parseInt(body.quantity),
		expiryDate: prismaDateTime,
		batch: body.batch
	}})


	return NextResponse.json(newInstance, { status: 201 });
}