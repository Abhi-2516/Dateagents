import { NextResponse } from "next/server";
import { PersonImportInputSchema } from "@/lib/validation/schemas";
import { fetchLinkedInProfile } from "@/lib/apify/linkedin";
import { fetchInstagramProfile } from "@/lib/apify/instagram";
import { getAIProvider } from "@/lib/ai/provider";
import { prisma } from "@/lib/prisma";
import { generatePersonRankings } from "@/lib/rankings/ranking-engine";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedInput = PersonImportInputSchema.safeParse(body);

    if (!parsedInput.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: parsedInput.error.format() },
        { status: 400 }
      );
    }

    const { linkedinUrl, instagramUrl, name: rawName, profileImage: customImg } = parsedInput.data;

    // 1. Fetch LinkedIn Profile via Apify
    const linkedInRes = await fetchLinkedInProfile(linkedinUrl);
    
    // 2. Fetch Instagram Profile via Apify
    const instagramRes = await fetchInstagramProfile(instagramUrl);

    const linkedInText = linkedInRes.success && linkedInRes.data
      ? `Name: ${linkedInRes.data.fullName}. Headline: ${linkedInRes.data.headline}. About: ${linkedInRes.data.about}. Location: ${linkedInRes.data.location || ""}. Skills: ${(linkedInRes.data.skills || []).join(", ")}.`
      : `LinkedIn URL: ${linkedinUrl}. Public profile summary.`;

    const instagramText = instagramRes.success && instagramRes.data
      ? `Name: ${instagramRes.data.fullName}. Bio: ${instagramRes.data.biography}. Posts Count: ${instagramRes.data.postsCount}. Captions: ${instagramRes.data.latestPosts.map(p => p.caption).join(" | ")}.`
      : `Instagram URL: ${instagramUrl}. Public profile summary.`;

    const personName = rawName || linkedInRes.data?.fullName || instagramRes.data?.fullName || "Custom Person";
    const personId = personName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + Math.floor(Math.random() * 1000);

    const avatarUrl = customImg || instagramRes.data?.profilePicUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80";
    const headline = linkedInRes.data?.headline || "Public Professional & Creator";
    const bio = linkedInRes.data?.about || instagramRes.data?.biography || "Public profile analyzed from LinkedIn and Instagram.";

    // 3. Run AI Profile Analysis using ONLY LinkedIn + Instagram data
    const aiProvider = getAIProvider();
    const analysis = await aiProvider.analyzePerson(linkedInText, instagramText, personName);

    // 4. Create Agent Persona
    const agent = await aiProvider.createAgent(analysis, personName, personId);

    // 5. Store in Prisma DB
    const dbPerson = await prisma.person.create({
      data: {
        id: personId,
        name: personName,
        linkedinUrl,
        instagramUrl,
        profileImage: avatarUrl,
        headline,
        bio,
        sources: {
          create: [
            {
              sourceType: "LINKEDIN",
              url: linkedinUrl,
              rawData: JSON.stringify(linkedInRes.data || { note: linkedInRes.error }),
              normalizedText: linkedInText,
              status: linkedInRes.success ? "SUCCESS" : "FAILED",
            },
            {
              sourceType: "INSTAGRAM",
              url: instagramUrl,
              rawData: JSON.stringify(instagramRes.data || { note: instagramRes.error }),
              normalizedText: instagramText,
              status: instagramRes.success ? "SUCCESS" : "FAILED",
            }
          ]
        },
        analysis: {
          create: {
            summary: analysis.summary,
            interests: JSON.stringify(analysis.interests),
            hobbies: JSON.stringify(analysis.hobbies),
            professionalInterests: JSON.stringify(analysis.professionalInterests),
            lifestyleSignals: JSON.stringify(analysis.lifestyleSignals),
            conversationTopics: JSON.stringify(analysis.conversationTopics),
            explicitPreferences: JSON.stringify(analysis.explicitPreferences),
            values: JSON.stringify(analysis.values),
            needs: JSON.stringify(analysis.needs),
            evidence: JSON.stringify(analysis.evidence),
          }
        },
        agent: {
          create: {
            persona: agent.persona,
            goals: JSON.stringify(agent.goals),
            interests: JSON.stringify(agent.interests),
            conversationStyle: agent.conversationStyle,
          }
        }
      }
    });

    // 6. Generate Rankings against existing profiles
    const existingPeople = await prisma.person.findMany({
      include: { analysis: true }
    });

    const formattedPeople = existingPeople.map(p => ({
      id: p.id,
      name: p.name,
      analysis: p.analysis ? {
        summary: p.analysis.summary,
        interests: JSON.parse(p.analysis.interests || "[]"),
        hobbies: JSON.parse(p.analysis.hobbies || "[]"),
        professionalInterests: JSON.parse(p.analysis.professionalInterests || "[]"),
        lifestyleSignals: JSON.parse(p.analysis.lifestyleSignals || "[]"),
        conversationTopics: JSON.parse(p.analysis.conversationTopics || "[]"),
        explicitPreferences: JSON.parse(p.analysis.explicitPreferences || "[]"),
        values: JSON.parse(p.analysis.values || "[]"),
        needs: JSON.parse(p.analysis.needs || "[]"),
        evidence: JSON.parse(p.analysis.evidence || "[]"),
      } : analysis
    }));

    const rankings = generatePersonRankings(dbPerson.id, analysis, formattedPeople);

    await prisma.ranking.createMany({
      data: rankings.map(r => ({
        personId: r.personId,
        matchedPersonId: r.matchedPersonId,
        rank: r.rank,
        score: r.score,
        reasoning: r.reasoning,
      }))
    });

    return NextResponse.json({
      success: true,
      personId: dbPerson.id,
      name: personName,
      warnings: [
        ...(!linkedInRes.success ? [`LinkedIn: ${linkedInRes.error}`] : []),
        ...(!instagramRes.success ? [`Instagram: ${instagramRes.error}`] : []),
      ]
    });
  } catch (err: any) {
    console.error("Error analyzing custom person:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
