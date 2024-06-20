import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface TripIdProps {
    params: { 
        userId?: string,
    };
}

export async function GET(request: Request, { params: { userId } }: TripIdProps) {
  const { searchParams } = new URL(request.url);

  console.log({ userId });

  if (!userId) {
    return {
      status: 400,
      body: {
        message: "Missing userId",
      },
    };
  }

  const reservations = await prisma.tripReservation.findMany({
    where: {
      userId: userId,
    },
    include: {
      trip: true,
    },
  });

  console.log({ reservations });

  return new NextResponse(JSON.stringify(reservations), { status: 200 });
}