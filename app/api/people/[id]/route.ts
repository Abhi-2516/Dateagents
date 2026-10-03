import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const person = await prisma.person.findUnique({
      where: { id },
      include: {
        analysis: true,
        agent: true,
        sources: true,
        rankings: {
          include: { matchedPerson: true },
          orderBy: { rank: "asc" },
        },
        datingSessionsAsA: {
          include: { personB: true },
          orderBy: { createdAt: "desc" },
        },
        datingSessionsAsB: {
          include: { personA: true },
          orderBy: { createdAt: "desc" },
        },
      }
    });

    if (!person) {
      return NextResponse.json({ success: false, error: "Person not found" }, { status: 404 });
    }

    const formatted = {
      ...person,
      analysis: person.analysis ? {
        ...person.analysis,
        interests: JSON.parse(person.analysis.interests || "[]"),
        hobbies: JSON.parse(person.analysis.hobbies || "[]"),
        professionalInterests: JSON.parse(person.analysis.professionalInterests || "[]"),
        lifestyleSignals: JSON.parse(person.analysis.lifestyleSignals || "[]"),
        conversationTopics: JSON.parse(person.analysis.conversationTopics || "[]"),
        explicitPreferences: JSON.parse(person.analysis.explicitPreferences || "[]"),
        values: JSON.parse(person.analysis.values || "[]"),
        needs: JSON.parse(person.analysis.needs || "[]"),
        evidence: JSON.parse(person.analysis.evidence || "[]"),
      } : null,
      agent: person.agent ? {
        ...person.agent,
        goals: JSON.parse(person.agent.goals || "[]"),
        interests: JSON.parse(person.agent.interests || "[]"),
      } : null,
    };

    return NextResponse.json({ success: true, data: formatted });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
