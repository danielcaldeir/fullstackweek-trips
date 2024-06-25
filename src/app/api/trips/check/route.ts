import { prisma } from "@/lib/prisma";
import { differenceInDays, isBefore } from "date-fns";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const req = await request.json();

  const trip = await prisma.trip.findUnique({
    where: {
      id: req.tripId,
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

  if (isBefore(new Date(req.startDate), new Date(trip.startDate))) {
    return new NextResponse(
      JSON.stringify({
        success: false,
        error: {
          code: "INVALID_START_DATE",
        },
        tripStart: new Date(trip.startDate),
        startDate: new Date(req.startDate),
      }),
      {
        status: 400,
      }
    );
  }

  // Data de fim recebida precisa ser menor ou igual a data de fim da viagem
  if (isBefore(new Date(trip.endDate), new Date(req.endDate))) {
    return new NextResponse(
      JSON.stringify({
        success: false,
        error: {
          code: "INVALID_END_DATE",
        },
        tripEnd: new Date(trip.endDate),
        endDate: new Date(req.endDate),
      }),
      {
        status: 400,
      }
    );
  }

  const reservations = await prisma.tripReservation.findMany({
    where: {
      // tripId: req.tripId,
      userId: req.userId,
      // VERIFICA SE EXISTE RESERVA ENTRE AS DATAS
      startDate: {
        lte: new Date(req.endDate),
      },
      endDate: {
        gte: new Date(req.startDate),
      },
    },
  });

  if (reservations.length > 0) {
    return new NextResponse(
      JSON.stringify({
        success: false,
        error: {
          code: "TRIP_ALREADY_RESERVED",
        },
      })
    );
  }

  return new NextResponse(
    JSON.stringify({
      success: true,
      trip,
      totalPrice: differenceInDays(new Date(req.endDate), new Date(req.startDate)) * Number(trip.pricePerDay),
    })
  );
}