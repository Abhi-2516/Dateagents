import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAIProvider } from "@/lib/ai/provider";
import { INITIAL_25_PEOPLE } from "@/lib/data/mock-people";
import { generatePersonRankings } from "@/lib/rankings/ranking-engine";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { personAId, personBId } = await request.json();

    if (!personAId || !personBId || personAId === personBId) {
      return NextResponse.json({ success: false, error: "Two distinct valid person IDs required." }, { status: 400 });
    }

    // 1. Fetch Person A & B from DB or Mock
    let dbPersonA = await prisma.person.findUnique({ where: { id: personAId }, include: { analysis: true, agent: true } });
    let dbPersonB = await prisma.person.findUnique({ where: { id: personBId }, include: { analysis: true, agent: true } });

    const mockA = INITIAL_25_PEOPLE.find(p => p.id === personAId);
    const mockB = INITIAL_25_PEOPLE.find(p => p.id === personBId);

    const nameA = dbPersonA?.name || mockA?.name || "Person A";
    const nameB = dbPersonB?.name || mockB?.name || "Person B";

    const agentAData = dbPersonA?.agent ? {
      personId: personAId,
      persona: dbPersonA.agent.persona,
      goals: JSON.parse(dbPersonA.agent.goals || "[]"),
      interests: JSON.parse(dbPersonA.agent.interests || "[]"),
      conversationStyle: dbPersonA.agent.conversationStyle,
      personName: nameA,
    } : (mockA ? { ...mockA.agent, personName: mockA.name } : {
      personId: personAId,
      persona: `Agent representing ${nameA}`,
      goals: ["Discover compatibility"],
      interests: ["Innovation"],
      conversationStyle: "Engaging",
      personName: nameA
    });

    const agentBData = dbPersonB?.agent ? {
      personId: personBId,
      persona: dbPersonB.agent.persona,
      goals: JSON.parse(dbPersonB.agent.goals || "[]"),
      interests: JSON.parse(dbPersonB.agent.interests || "[]"),
      conversationStyle: dbPersonB.agent.conversationStyle,
      personName: nameB,
    } : (mockB ? { ...mockB.agent, personName: mockB.name } : {
      personId: personBId,
      persona: `Agent representing ${nameB}`,
      goals: ["Discover compatibility"],
      interests: ["Innovation"],
      conversationStyle: "Engaging",
      personName: nameB
    });

    // 2. Generate Turn-by-Turn Dynamic Dialogue
    const aiProvider = getAIProvider();
    const turns = await aiProvider.conductDate(agentAData, agentBData, 6);

    // 3. Evaluate Date & Compatibility Score
    const evalResult = await aiProvider.evaluateDate(agentAData, agentBData, turns);

    // 4. Save Session to Database
    let session;
    try {
      session = await prisma.datingSession.create({
        data: {
          personAId,
          personBId,
          agentAId: personAId,
          agentBId: personBId,
          transcript: JSON.stringify(turns),
          sharedInterests: JSON.stringify(turns.filter(t => t.sharedInterestDiscovered).map(t => t.sharedInterestDiscovered)),
          interestingMoments: JSON.stringify(turns.filter(t => t.sharedInterestDiscovered).map(t => t.sharedInterestDiscovered)),
          frictionPoints: JSON.stringify(evalResult.potentialFriction),
          agentAImpression: evalResult.agentAImpression,
          agentBImpression: evalResult.agentBImpression,
          compatibilityScore: evalResult.compatibilityScore,
          compatibilityBreakdown: JSON.stringify(evalResult.compatibilityBreakdown),
        }
      });
    } catch (e) {
      console.warn("Could not persist session to DB, returning live evaluated session.");
    }

    return NextResponse.json({
      success: true,
      data: {
        id: session?.id || `session-${Date.now()}`,
        personA: { id: personAId, name: nameA, image: dbPersonA?.profileImage || mockA?.profileImage },
        personB: { id: personBId, name: nameB, image: dbPersonB?.profileImage || mockB?.profileImage },
        turns,
        evaluation: evalResult,
      }
    });
  } catch (err: any) {
    console.error("Error conducting live date:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
