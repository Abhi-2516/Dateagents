import { AgentPersona, DialogueTurn } from "../validation/schemas";
import { getAIProvider } from "../ai/provider";

export async function runDatingSession(
  agentA: AgentPersona & { personName: string },
  agentB: AgentPersona & { personName: string },
  turnsCount = 6
): Promise<DialogueTurn[]> {
  const provider = getAIProvider();
  return provider.conductDate(agentA, agentB, turnsCount);
}
