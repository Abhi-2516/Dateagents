import { z } from "zod";

export const SourceEvidenceSchema = z.object({
  claim: z.string(),
  source: z.enum(["LinkedIn", "Instagram"]),
  evidence: z.string(),
});

export const PersonAnalysisSchema = z.object({
  summary: z.string(),
  interests: z.array(z.string()),
  hobbies: z.array(z.string()),
  professionalInterests: z.array(z.string()),
  lifestyleSignals: z.array(z.string()),
  conversationTopics: z.array(z.string()),
  explicitPreferences: z.array(z.string()),
  values: z.array(z.string()),
  needs: z.array(z.string()),
  evidence: z.array(SourceEvidenceSchema),
});

export type SourceEvidence = z.infer<typeof SourceEvidenceSchema>;
export type PersonAnalysis = z.infer<typeof PersonAnalysisSchema>;

export const AgentSchema = z.object({
  id: z.string().optional(),
  personId: z.string(),
  persona: z.string(),
  goals: z.array(z.string()),
  interests: z.array(z.string()),
  conversationStyle: z.string(),
});

export type AgentPersona = z.infer<typeof AgentSchema>;

export const TurnSchema = z.object({
  sender: z.enum(["A", "B"]),
  agentName: z.string(),
  personName: z.string(),
  message: z.string(),
  thinking: z.string().optional(),
  sharedInterestDiscovered: z.string().optional(),
  potentialFriction: z.string().optional(),
});

export type DialogueTurn = z.infer<typeof TurnSchema>;

export const CompatibilityBreakdownSchema = z.object({
  sharedInterests: z.number().min(0).max(100),
  conversationChemistry: z.number().min(0).max(100),
  lifestyleAlignment: z.number().min(0).max(100),
  professionalAlignment: z.number().min(0).max(100),
  explicitPreferenceAlignment: z.number().min(0).max(100),
});

export type CompatibilityBreakdown = z.infer<typeof CompatibilityBreakdownSchema>;

export const DateEvaluationSchema = z.object({
  compatibilityScore: z.number().min(0).max(100),
  compatibilityBreakdown: CompatibilityBreakdownSchema,
  whyTheyConnected: z.array(z.string()),
  potentialFriction: z.array(z.string()),
  bestNextConversation: z.string(),
  agentAImpression: z.string(),
  agentBImpression: z.string(),
});

export type DateEvaluation = z.infer<typeof DateEvaluationSchema>;

export const PersonImportInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  linkedinUrl: z.string().url("Valid LinkedIn URL required"),
  instagramUrl: z.string().url("Valid Instagram URL required"),
  profileImage: z.string().url().optional(),
  headline: z.string().optional(),
  bio: z.string().optional(),
});

export type PersonImportInput = z.infer<typeof PersonImportInputSchema>;
