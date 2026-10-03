import { AIProvider } from "./provider";
import { PersonAnalysis, AgentPersona, DialogueTurn, DateEvaluation, PersonAnalysisSchema, DateEvaluationSchema } from "../validation/schemas";
import { FallbackAIProvider } from "./fallback";

export class GeminiProvider implements AIProvider {
  private fallback = new FallbackAIProvider();

  async analyzePerson(
    linkedInText: string,
    instagramText: string,
    personName: string
  ): Promise<PersonAnalysis> {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) return this.fallback.analyzePerson(linkedInText, instagramText, personName);

      const prompt = `You are a professional profile analyst. Given the following public LinkedIn and Instagram profile data for "${personName}", extract structured intelligence.

CRITICAL SAFETY & PRIVACY RULES:
1. Do NOT infer sensitive characteristics (race, ethnicity, religion, politics, sexual orientation, health, income, criminal history, or private relationships).
2. ONLY use explicitly public, non-sensitive information present in the source text.
3. Every claim in the "evidence" array MUST cite either "LinkedIn" or "Instagram" as source with exact context.

LinkedIn Text:
${linkedInText.slice(0, 3000)}

Instagram Text:
${instagramText.slice(0, 3000)}

Return ONLY valid JSON matching this exact structure:
{
  "summary": "2-3 sentence overview of their professional and lifestyle identity",
  "interests": ["list", "of", "interests"],
  "hobbies": ["list", "of", "hobbies"],
  "professionalInterests": ["list"],
  "lifestyleSignals": ["list"],
  "conversationTopics": ["list"],
  "explicitPreferences": ["list"],
  "values": ["list"],
  "needs": ["list"],
  "evidence": [
    {
      "claim": "Specific claim",
      "source": "LinkedIn" or "Instagram",
      "evidence": "Supporting quote or observation"
    }
  ]
}`;

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });

      if (!res.ok) {
        console.warn("Gemini API call failed, falling back to heuristic analyzer");
        return this.fallback.analyzePerson(linkedInText, instagramText, personName);
      }

      const json = await res.json();
      const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) return this.fallback.analyzePerson(linkedInText, instagramText, personName);

      const parsed = JSON.parse(text);
      return PersonAnalysisSchema.parse(parsed);
    } catch (err) {
      console.error("Gemini analysis error:", err);
      return this.fallback.analyzePerson(linkedInText, instagramText, personName);
    }
  }

  async createAgent(
    analysis: PersonAnalysis,
    personName: string,
    personId: string
  ): Promise<AgentPersona> {
    return this.fallback.createAgent(analysis, personName, personId);
  }

  async conductDate(
    agentA: AgentPersona & { personName: string },
    agentB: AgentPersona & { personName: string },
    turnsCount = 6
  ): Promise<DialogueTurn[]> {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) return this.fallback.conductDate(agentA, agentB, turnsCount);

      const prompt = `Conduct a dynamic date dialogue between two autonomous AI dating agents representing ${agentA.personName} and ${agentB.personName}.

Agent A (${agentA.personName}):
Persona: ${agentA.persona}
Interests: ${agentA.interests.join(", ")}
Style: ${agentA.conversationStyle}

Agent B (${agentB.personName}):
Persona: ${agentB.persona}
Interests: ${agentB.interests.join(", ")}
Style: ${agentB.conversationStyle}

RULES:
1. Generate ${turnsCount} turn-by-turn conversational exchanges (alternating sender "A" and "B").
2. Agents MUST act as representatives who explore mutual compatibility based ONLY on public profile interests.
3. Include inner "thinking" step for each turn.
4. If a turn reveals a shared interest, set "sharedInterestDiscovered".
5. If a turn reveals a potential difference, set "potentialFriction".

Return ONLY JSON array of turns matching:
[
  {
    "sender": "A",
    "agentName": "${agentA.personName}'s Agent",
    "personName": "${agentA.personName}",
    "thinking": "inner thought...",
    "sharedInterestDiscovered": "optional string",
    "potentialFriction": "optional string",
    "message": "spoken message..."
  }
]`;

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });

      if (!res.ok) return this.fallback.conductDate(agentA, agentB, turnsCount);

      const json = await res.json();
      const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) return this.fallback.conductDate(agentA, agentB, turnsCount);

      return JSON.parse(text) as DialogueTurn[];
    } catch (err) {
      console.error("Gemini date generation error:", err);
      return this.fallback.conductDate(agentA, agentB, turnsCount);
    }
  }

  async evaluateDate(
    agentA: AgentPersona & { personName: string },
    agentB: AgentPersona & { personName: string },
    turns: DialogueTurn[]
  ): Promise<DateEvaluation> {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) return this.fallback.evaluateDate(agentA, agentB, turns);

      const prompt = `Evaluate the completed date dialogue between ${agentA.personName}'s Agent and ${agentB.personName}'s Agent.

Dialogue transcript:
${turns.map(t => `${t.personName}: ${t.message}`).join("\n")}

Provide an objective compatibility breakdown (0-100 score).

Return ONLY JSON:
{
  "compatibilityScore": 86,
  "compatibilityBreakdown": {
    "sharedInterests": 90,
    "conversationChemistry": 88,
    "lifestyleAlignment": 84,
    "professionalAlignment": 85,
    "explicitPreferenceAlignment": 83
  },
  "whyTheyConnected": ["reason 1", "reason 2", "reason 3"],
  "potentialFriction": ["friction 1", "friction 2"],
  "bestNextConversation": "topic suggestion",
  "agentAImpression": "impression string",
  "agentBImpression": "impression string"
}`;

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });

      if (!res.ok) return this.fallback.evaluateDate(agentA, agentB, turns);

      const json = await res.json();
      const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) return this.fallback.evaluateDate(agentA, agentB, turns);

      const parsed = JSON.parse(text);
      return DateEvaluationSchema.parse(parsed);
    } catch (err) {
      console.error("Gemini evaluation error:", err);
      return this.fallback.evaluateDate(agentA, agentB, turns);
    }
  }
}
