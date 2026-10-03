import { AgentPersona, DialogueTurn, DateEvaluation } from "../validation/schemas";
import { getAIProvider } from "../ai/provider";

export async function evaluateDatingSession(
  agentA: AgentPersona & { personName: string },
  agentB: AgentPersona & { personName: string },
  turns: DialogueTurn[]
): Promise<DateEvaluation> {
  const provider = getAIProvider();
  return provider.evaluateDate(agentA, agentB, turns);
}
