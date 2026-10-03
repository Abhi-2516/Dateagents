import { prisma } from "../lib/prisma";
import { INITIAL_25_PEOPLE } from "../lib/data/mock-people";
import { generatePersonRankings } from "../lib/rankings/ranking-engine";
import { FallbackAIProvider } from "../lib/ai/fallback";

async function seedDemo() {
  console.log("🚀 Starting DateAgents 25-Person Demo Database Seeding...");
  const aiProvider = new FallbackAIProvider();

  for (let i = 0; i < INITIAL_25_PEOPLE.length; i++) {
    const person = INITIAL_25_PEOPLE[i];
    console.log(`[${i + 1}/25] Processing ${person.name}...`);

    try {
      // 1. Create or Update Person
      const dbPerson = await prisma.person.upsert({
        where: { id: person.id },
        update: {
          name: person.name,
          linkedinUrl: person.linkedinUrl,
          instagramUrl: person.instagramUrl,
          profileImage: person.profileImage,
          headline: person.headline,
          bio: person.bio,
        },
        create: {
          id: person.id,
          name: person.name,
          linkedinUrl: person.linkedinUrl,
          instagramUrl: person.instagramUrl,
          profileImage: person.profileImage,
          headline: person.headline,
          bio: person.bio,
        }
      });

      // 2. PersonSource LinkedIn & Instagram
      await prisma.personSource.deleteMany({ where: { personId: dbPerson.id } });

      await prisma.personSource.createMany({
        data: [
          {
            personId: dbPerson.id,
            sourceType: "LINKEDIN",
            url: person.linkedinUrl,
            rawData: JSON.stringify({ raw: person.linkedInRaw }),
            normalizedText: person.linkedInRaw,
            status: "SUCCESS",
          },
          {
            personId: dbPerson.id,
            sourceType: "INSTAGRAM",
            url: person.instagramUrl,
            rawData: JSON.stringify({ raw: person.instagramRaw }),
            normalizedText: person.instagramRaw,
            status: "SUCCESS",
          }
        ]
      });

      // 3. PersonAnalysis
      await prisma.personAnalysis.upsert({
        where: { personId: dbPerson.id },
        update: {
          summary: person.analysis.summary,
          interests: JSON.stringify(person.analysis.interests),
          hobbies: JSON.stringify(person.analysis.hobbies),
          professionalInterests: JSON.stringify(person.analysis.professionalInterests),
          lifestyleSignals: JSON.stringify(person.analysis.lifestyleSignals),
          conversationTopics: JSON.stringify(person.analysis.conversationTopics),
          explicitPreferences: JSON.stringify(person.analysis.explicitPreferences),
          values: JSON.stringify(person.analysis.values),
          needs: JSON.stringify(person.analysis.needs),
          evidence: JSON.stringify(person.analysis.evidence),
        },
        create: {
          personId: dbPerson.id,
          summary: person.analysis.summary,
          interests: JSON.stringify(person.analysis.interests),
          hobbies: JSON.stringify(person.analysis.hobbies),
          professionalInterests: JSON.stringify(person.analysis.professionalInterests),
          lifestyleSignals: JSON.stringify(person.analysis.lifestyleSignals),
          conversationTopics: JSON.stringify(person.analysis.conversationTopics),
          explicitPreferences: JSON.stringify(person.analysis.explicitPreferences),
          values: JSON.stringify(person.analysis.values),
          needs: JSON.stringify(person.analysis.needs),
          evidence: JSON.stringify(person.analysis.evidence),
        }
      });

      // 4. Agent
      await prisma.agent.upsert({
        where: { personId: dbPerson.id },
        update: {
          persona: person.agent.persona,
          goals: JSON.stringify(person.agent.goals),
          interests: JSON.stringify(person.agent.interests),
          conversationStyle: person.agent.conversationStyle,
        },
        create: {
          personId: dbPerson.id,
          persona: person.agent.persona,
          goals: JSON.stringify(person.agent.goals),
          interests: JSON.stringify(person.agent.interests),
          conversationStyle: person.agent.conversationStyle,
        }
      });

      console.log(`  ✓ ${person.name} profile, sources, analysis, and agent seeded.`);
    } catch (err: any) {
      console.warn(`  ⚠ Failed to seed ${person.name}:`, err.message);
    }
  }

  // 5. Generate Sample Agent Dating Sessions for High Compatibility Pairs
  console.log("\n💬 Generating Agent-to-Agent Dating Sessions for selected candidate pairs...");
  const evaluationsMap: Record<string, any> = {};

  const demoPairs = [
    ["sam-altman", "andrej-karpathy"],
    ["mkbhd", "brian-chesky"],
    ["satya-nadella", "sundar-pichai"],
    ["alexis-ohanian", "sara-blakely"],
    ["lex-fridman", "vitalik-buterin"],
    ["yann-lecun", "patrick-collison"],
    ["melanie-perkins", "emily-weiss"],
    ["serena-williams", "mrbeast"],
    ["palmer-luckey", "elon-musk"],
    ["jensen-huang", "linus-torvalds"],
    ["paul-graham", "andrew-ng"],
    ["tim-cook", "gwyneth-paltrow"],
    ["mark-zuckerberg", "alexis-ohanian"]
  ];

  await prisma.datingSession.deleteMany({});

  for (const [idA, idB] of demoPairs) {
    const pA = INITIAL_25_PEOPLE.find(p => p.id === idA);
    const pB = INITIAL_25_PEOPLE.find(p => p.id === idB);
    if (!pA || !pB) continue;

    console.log(`  - Dating: ${pA.name}'s Agent ↔ ${pB.name}'s Agent...`);
    const agentAWithId = { ...pA.agent, personName: pA.name };
    const agentBWithId = { ...pB.agent, personName: pB.name };

    const turns = await aiProvider.conductDate(agentAWithId, agentBWithId, 6);
    const evalResult = await aiProvider.evaluateDate(agentAWithId, agentBWithId, turns);

    const evalKey = [idA, idB].sort().join(":");
    evaluationsMap[evalKey] = evalResult;

    await prisma.datingSession.create({
      data: {
        personAId: pA.id,
        personBId: pB.id,
        agentAId: pA.id,
        agentBId: pB.id,
        transcript: JSON.stringify(turns),
        sharedInterests: JSON.stringify([pA.analysis.interests[0], pB.analysis.interests[0]]),
        interestingMoments: JSON.stringify(turns.filter(t => t.sharedInterestDiscovered).map(t => t.sharedInterestDiscovered)),
        frictionPoints: JSON.stringify(evalResult.potentialFriction),
        agentAImpression: evalResult.agentAImpression,
        agentBImpression: evalResult.agentBImpression,
        compatibilityScore: evalResult.compatibilityScore,
        compatibilityBreakdown: JSON.stringify(evalResult.compatibilityBreakdown),
      }
    });
  }

  // 6. Generate Rankings Matrix for ALL 25 People
  console.log("\n📊 Generating 25x25 Rankings Matrix...");
  await prisma.ranking.deleteMany({});

  const allPeopleFormatted = INITIAL_25_PEOPLE.map(p => ({
    id: p.id,
    name: p.name,
    analysis: p.analysis,
  }));

  for (const person of INITIAL_25_PEOPLE) {
    const rankings = generatePersonRankings(person.id, person.analysis, allPeopleFormatted, evaluationsMap);

    await prisma.ranking.createMany({
      data: rankings.map(r => ({
        personId: r.personId,
        matchedPersonId: r.matchedPersonId,
        rank: r.rank,
        score: r.score,
        reasoning: r.reasoning,
      }))
    });
  }

  console.log("\n✅ DateAgents Database Seeding Completed Successfully! All 25 people, agents, dating sessions, and rankings are ready.");
}

seedDemo()
  .catch(e => {
    console.error("Fatal error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
