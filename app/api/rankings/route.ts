import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const personId = searchParams.get("personId");

    const whereCondition = personId ? { personId } : {};

    const rankings = await prisma.ranking.findMany({
      where: whereCondition,
      include: {
        person: true,
        matchedPerson: true,
      },
      orderBy: [
        { personId: "asc" },
        { rank: "asc" }
      ]
    });

    return NextResponse.json({ success: true, count: rankings.length, data: rankings });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
