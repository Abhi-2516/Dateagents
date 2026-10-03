import { PersonAnalysis, AgentPersona, DialogueTurn, DateEvaluation } from "../validation/schemas";

export interface AIProvider {
  analyzePerson(
    linkedInText: string,
    instagramText: string,
    personName: string
  ): Promise<PersonAnalysis>;
  
  createAgent(
    analysis: PersonAnalysis,
    personName: string,
    personId: string
  ): Promise<AgentPersona>;

  conductDate(
    agentA: AgentPersona & { personName: string },
    agentB: AgentPersona & { personName: string },
    turnsCount?: number
  ): Promise<DialogueTurn[]>;

  evaluateDate(
    agentA: AgentPersona & { personName: string },
    agentB: AgentPersona & { personName: string },
    turns: DialogueTurn[]
  ): Promise<DateEvaluation>;
}

export function getAIProvider(): AIProvider {
  const providerName = (process.env.AI_PROVIDER || "gemini").toLowerCase();

  if (providerName === "gemini" && process.env.GEMINI_API_KEY) {
    const { GeminiProvider } = require("./gemini");
    return new GeminiProvider();
  }

  if (providerName === "groq" && process.env.GROQ_API_KEY) {
    const { GroqProvider } = require("./groq");
    return new GroqProvider();
  }

  if (providerName === "openrouter" && process.env.OPENROUTER_API_KEY) {
    const { OpenRouterProvider } = require("./openrouter");
    return new OpenRouterProvider();
  }

  // If GEMINI_API_KEY is present default to Gemini
  if (process.env.GEMINI_API_KEY) {
    const { GeminiProvider } = require("./gemini");
    return new GeminiProvider();
  }

  // Fallback intelligent provider when no API key is specified
  const { FallbackAIProvider } = require("./fallback");
  return new FallbackAIProvider();
}
