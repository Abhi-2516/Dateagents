import { PersonAnalysis, AgentPersona } from "../validation/schemas";
import { getAIProvider } from "../ai/provider";

export async function createDatingAgent(
  analysis: PersonAnalysis,
  personName: string,
  personId: string
): Promise<AgentPersona> {
  const provider = getAIProvider();
  return provider.createAgent(analysis, personName, personId);
}
