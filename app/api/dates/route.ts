import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const sessions = await prisma.datingSession.findMany({
      include: {
        personA: true,
        personB: true,
      },
      orderBy: { createdAt: "desc" }
    });

    const formatted = sessions.map(s => ({
      ...s,
      transcript: JSON.parse(s.transcript || "[]"),
      sharedInterests: JSON.parse(s.sharedInterests || "[]"),
      interestingMoments: JSON.parse(s.interestingMoments || "[]"),
      frictionPoints: JSON.parse(s.frictionPoints || "[]"),
      compatibilityBreakdown: JSON.parse(s.compatibilityBreakdown || "{}"),
    }));

    return NextResponse.json({ success: true, count: formatted.length, data: formatted });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
