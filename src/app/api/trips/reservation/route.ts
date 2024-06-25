import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const req = await request.json();

  console.log(req);
  const { startDate, endDate, userId, tripId, totalPaid, guests } = req;

  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
  });

  if (!trip) {
    return new NextResponse(
      JSON.stringify({
        success: false,
        error: {
          code: "TRIP_NOT_FOUND",
        },
      })
    );
  }

  if (!userId) {
    return new NextResponse(
      JSON.stringify({
        success: false,
        error: {
          code: "USER_NOT_FOUND",
        },
      })
    );
  }

  await prisma.tripReservation.create({
    data: {
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      userId,
      tripId,
      totalPaid,
      guests,
    },
  });

  return new NextResponse(
    JSON.stringify({
      success: true,
      startDate: startDate, 
      endDate: endDate, 
      userId: userId, 
      tripId: tripId, 
      totalPaid: totalPaid, 
      guests: guests,
    }),
    { status: 201 }
  );
}