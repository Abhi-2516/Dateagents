import { AIProvider } from "./provider";
import { PersonAnalysis, AgentPersona, DialogueTurn, DateEvaluation } from "../validation/schemas";
import { FallbackAIProvider } from "./fallback";

export class OpenRouterProvider implements AIProvider {
  private fallback = new FallbackAIProvider();

  async analyzePerson(linkedInText: string, instagramText: string, personName: string): Promise<PersonAnalysis> {
    return this.fallback.analyzePerson(linkedInText, instagramText, personName);
  }

  async createAgent(analysis: PersonAnalysis, personName: string, personId: string): Promise<AgentPersona> {
    return this.fallback.createAgent(analysis, personName, personId);
  }

  async conductDate(agentA: AgentPersona & { personName: string }, agentB: AgentPersona & { personName: string }, turnsCount = 6): Promise<DialogueTurn[]> {
    return this.fallback.conductDate(agentA, agentB, turnsCount);
  }

  async evaluateDate(agentA: AgentPersona & { personName: string }, agentB: AgentPersona & { personName: string }, turns: DialogueTurn[]): Promise<DateEvaluation> {
    return this.fallback.evaluateDate(agentA, agentB, turns);
  }
}
