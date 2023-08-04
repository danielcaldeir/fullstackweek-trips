import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const UserWhereUniqueInput = (text: string) =>{
    let searchQuery: any = {
        id: text,
      };
      return searchQuery;
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const text = searchParams.get("text");

    if (!text) {
        return new NextResponse(
          JSON.stringify({
            message: "Missing text parameter",
            texto: text,
          }),
          { status: 400 }
        );
      }

    const trips = await prisma.trip.findUnique({
        where: UserWhereUniqueInput(text),
      });

  return new NextResponse(JSON.stringify(trips), { status: 200 });
}