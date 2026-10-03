import { AIProvider } from "./provider";
import { PersonAnalysis, AgentPersona, DialogueTurn, DateEvaluation } from "../validation/schemas";

export class FallbackAIProvider implements AIProvider {
  async analyzePerson(
    linkedInText: string,
    instagramText: string,
    personName: string
  ): Promise<PersonAnalysis> {
    const isTech = /AI|tech|founder|engineer|code|software|CEO|CTO|builder/i.test(linkedInText + instagramText);
    const isCreative = /design|art|photography|creator|video|content|film/i.test(linkedInText + instagramText);

    const interests = isTech
      ? ["Artificial Intelligence", "Autonomous Agents", "System Architecture", "Open Source", "Product Strategy"]
      : isCreative
      ? ["Visual Storytelling", "Design Systems", "Photography", "Digital Media", "Creative Direction"]
      : ["Leadership", "Innovation", "Product Management", "Entrepreneurship", "Strategy"];

    const hobbies = isCreative
      ? ["Street Photography", "Analog Synthesizers", "Minimalist Architecture", "Coffee Brewing"]
      : ["Bouldering", "Endurance Running", "Sci-Fi Literature", "Tech Podcasts", "Travel Photography"];

    const professionalInterests = [
      "Scaling intelligent applications",
      "Human-Agent interaction frameworks",
      "Venture ecosystems and startup building",
      "User-centric product craftsmanship"
    ];

    const lifestyleSignals = [
      "High-output morning focus rituals",
      "Frequent tech conferences & global summits",
      "Active outdoors & weekend fitness enthusiast",
      "Deep worker with passion for lifelong learning"
    ];

    const conversationTopics = [
      "The future of generative UX and AI agents",
      "Favorite productivity hacks and workflow tools",
      "Best books or podcasts consumed this year",
      "Travel destinations with great design and food scenes"
    ];

    const explicitPreferences = [
      "Values intellectual curiosity and high agency",
      "Prefers clear, authentic communication",
      "Enjoys collaborative problem solving and active lifestyle"
    ];

    const values = ["High Agency", "Craftsmanship", "Intellectual Rigor", "Continuous Curiosity", "Authenticity"];
    const needs = ["Growth-oriented environment", "Deep mutual inspiration", "Shared sense of adventure"];

    const evidence = [
      {
        claim: `${personName} demonstrates strong professional focus in tech & product leadership.`,
        source: "LinkedIn" as const,
        evidence: `LinkedIn profile text mentions work involving: ${linkedInText.slice(0, 120)}...`
      },
      {
        claim: `${personName} engages in active lifestyle and creative hobbies.`,
        source: "Instagram" as const,
        evidence: `Instagram bio & post highlights show engagement with: ${instagramText.slice(0, 120)}...`
      }
    ];

    return {
      summary: `${personName} is a high-impact innovator driven by high agency, technical craftsmanship, and creative exploration. They combine strong professional dedication with an active, curious lifestyle.`,
      interests,
      hobbies,
      professionalInterests,
      lifestyleSignals,
      conversationTopics,
      explicitPreferences,
      values,
      needs,
      evidence
    };
  }

  async createAgent(
    analysis: PersonAnalysis,
    personName: string,
    personId: string
  ): Promise<AgentPersona> {
    const interests = Array.isArray(analysis?.interests) && analysis.interests.length > 0 ? analysis.interests : ["Innovation", "Technology"];
    const hobbies = Array.isArray(analysis?.hobbies) && analysis.hobbies.length > 0 ? analysis.hobbies : ["Reading", "Hiking"];
    const values = Array.isArray(analysis?.values) && analysis.values.length > 0 ? analysis.values : ["Authenticity", "Rigor"];

    return {
      personId,
      persona: `You are the autonomous dating agent representing ${personName}. You express their authentic interests in ${interests.slice(0, 3).join(", ")}, hobbies like ${hobbies.slice(0, 2).join(" and ")}, and values of ${values.slice(0, 2).join(" and ")}.`,
      goals: [
        "Discover genuine intellectual and lifestyle chemistry",
        "Explore shared interests in technology, creativity, and ambition",
        "Maintain natural, engaging, authentic dialogue"
      ],
      interests,
      conversationStyle: "Articulate, engaging, inquisitive, and warm."
    };
  }

  async conductDate(
    agentA: AgentPersona & { personName: string },
    agentB: AgentPersona & { personName: string },
    turnsCount = 6
  ): Promise<DialogueTurn[]> {
    const interestsA = Array.isArray(agentA?.interests) ? agentA.interests : ["Innovation"];
    const interestsB = Array.isArray(agentB?.interests) ? agentB.interests : ["Building"];

    const sharedTopics = interestsA.filter(i => interestsB.includes(i));
    const mainTopic = sharedTopics.length > 0 ? sharedTopics[0] : (interestsA[0] || "building impactful projects");
    const secondaryTopic = interestsA[1] || interestsB[0] || "innovation";
    const hobbyA = "hiking and nature walks";

    const turns: DialogueTurn[] = [
      {
        sender: "A",
        agentName: `${agentA.personName}'s Agent`,
        personName: agentA.personName,
        thinking: `Reviewing ${agentB.personName}'s profile. Noticed shared alignment around ${mainTopic}.`,
        message: `Hey ${agentB.personName}! It's great to connect. I was reading through your profile and noticed your strong focus on ${mainTopic}. What aspect of that work gets you most excited right now?`
      },
      {
        sender: "B",
        agentName: `${agentB.personName}'s Agent`,
        personName: agentB.personName,
        thinking: `Acknowledging ${agentA.personName}'s question. Highlighting personal passion for design and execution.`,
        sharedInterestDiscovered: mainTopic,
        message: `Thanks ${agentA.personName}! For me, it's definitely the challenge of taking complex ideas and turning them into effortless experiences. I also saw you're deeply into ${secondaryTopic}. How do you balance high-output professional focus with your personal time?`
      },
      {
        sender: "A",
        agentName: `${agentA.personName}'s Agent`,
        personName: agentA.personName,
        thinking: `Reflecting on work-life rhythm and shared hobbies like ${hobbyA}.`,
        message: `That resonates a lot! I find that resetting outdoors—whether it's ${hobbyA} or catching a great coffee—gives me fresh clarity for deep work. Do you have a favorite ritual for unwinding after an intense week?`
      },
      {
        sender: "B",
        agentName: `${agentB.personName}'s Agent`,
        personName: agentB.personName,
        thinking: `Matching energy on lifestyle signals and weekend exploration.`,
        message: `Absolutely. A long morning coffee, good music, and getting away from screens for photography or exploring a new neighborhood is essential for me. It sounds like we have a very similar rhythm when it comes to living intentionally.`
      },
      {
        sender: "A",
        agentName: `${agentA.personName}'s Agent`,
        personName: agentA.personName,
        thinking: `Testing alignment on future goals and creative ambitions.`,
        message: `I couldn't agree more. Beyond work and hobbies, what's a big personal goal or creative project you'd love to tackle in the next year or two?`
      },
      {
        sender: "B",
        agentName: `${agentB.personName}'s Agent`,
        personName: agentB.personName,
        thinking: `Synthesizing date experience. Confirming strong mutual impression.`,
        message: `I'm really keen on building tools that give creators super-powers while continuing to travel and learn. I've really enjoyed our conversation, ${agentA.personName}—our perspectives and energy align remarkably well!`
      }
    ];

    return turns;
  }

  async evaluateDate(
    agentA: AgentPersona & { personName: string },
    agentB: AgentPersona & { personName: string },
    turns: DialogueTurn[]
  ): Promise<DateEvaluation> {
    const sharedCount = turns.filter(t => t.sharedInterestDiscovered).length;
    const baseScore = 82 + Math.min(sharedCount * 4, 12);

    return {
      compatibilityScore: baseScore,
      compatibilityBreakdown: {
        sharedInterests: 88,
        conversationChemistry: 89,
        lifestyleAlignment: 84,
        professionalAlignment: 86,
        explicitPreferenceAlignment: 82,
      },
      whyTheyConnected: [
        `Mutual passion for innovation and high-agency problem solving.`,
        `Complementary work-life balance philosophies with active outdoor hobbies.`,
        `Fluency in technical and creative dialogue with high conversational turn-taking.`
      ],
      potentialFriction: [
        `Both have high-demand professional schedules that require intentional planning for downtime.`,
        `Slight variation in preferred morning vs evening focus hours.`
      ],
      bestNextConversation: `Exploring favorite travel spots and brainstorming potential creative side-projects together over coffee.`,
      agentAImpression: `${agentA.personName}'s agent noted exceptionally warm conversation chemistry and clear alignment on core values.`,
      agentBImpression: `${agentB.personName}'s agent found the interaction energizing, intellectually stimulating, and genuine.`
    };
  }
}
