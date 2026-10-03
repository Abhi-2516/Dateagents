import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const people = await prisma.person.findMany({
      include: {
        analysis: true,
        agent: true,
        sources: true,
      },
      orderBy: { createdAt: "asc" }
    });

    console.log(`[GET /api/people] DATABASE_URL present: ${!!process.env.DATABASE_URL}, Fetched ${people.length} person records from DB.`);

    const formatted = people.map(p => ({
      ...p,
      analysis: p.analysis ? {
        ...p.analysis,
        interests: JSON.parse(p.analysis.interests || "[]"),
        hobbies: JSON.parse(p.analysis.hobbies || "[]"),
        professionalInterests: JSON.parse(p.analysis.professionalInterests || "[]"),
        lifestyleSignals: JSON.parse(p.analysis.lifestyleSignals || "[]"),
        conversationTopics: JSON.parse(p.analysis.conversationTopics || "[]"),
        explicitPreferences: JSON.parse(p.analysis.explicitPreferences || "[]"),
        values: JSON.parse(p.analysis.values || "[]"),
        needs: JSON.parse(p.analysis.needs || "[]"),
        evidence: JSON.parse(p.analysis.evidence || "[]"),
      } : null,
      agent: p.agent ? {
        ...p.agent,
        goals: JSON.parse(p.agent.goals || "[]"),
        interests: JSON.parse(p.agent.interests || "[]"),
      } : null
    }));

    return NextResponse.json({ success: true, count: formatted.length, data: formatted });
  } catch (err: any) {
    console.error("[GET /api/people Error]:", err);
    return NextResponse.json({ success: false, error: err.message || String(err) }, { status: 500 });
  }
}

