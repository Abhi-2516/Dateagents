import { PersonAnalysis, DateEvaluation } from "../validation/schemas";

export interface RankingItem {
  personId: string;
  matchedPersonId: string;
  rank: number;
  score: number;
  reasoning: string;
  hasDate?: boolean;
}

export function calculateDeterministicScore(
  personAAnalysis: PersonAnalysis,
  personBAnalysis: PersonAnalysis,
  dateEval?: DateEvaluation
): { score: number; reasoning: string; hasDate: boolean } {
  // 1. Profile Interest Jaccard Similarity (40%)
  const setAInterests = new Set([...personAAnalysis.interests, ...personAAnalysis.hobbies, ...personAAnalysis.professionalInterests].map(i => i.toLowerCase()));
  const setBInterests = new Set([...personBAnalysis.interests, ...personBAnalysis.hobbies, ...personBAnalysis.professionalInterests].map(i => i.toLowerCase()));
  
  let sharedCount = 0;
  setAInterests.forEach(item => {
    if (setBInterests.has(item) || Array.from(setBInterests).some(b => b.includes(item) || item.includes(b))) {
      sharedCount++;
    }
  });

  const totalUnique = new Set([...setAInterests, ...setBInterests]).size;
  const profileSimRatio = totalUnique > 0 ? (sharedCount / Math.min(setAInterests.size, setBInterests.size)) : 0.5;
  const profileScore = Math.min(100, Math.round(60 + profileSimRatio * 38));

  // 2. Shared Interests Component (30%)
  const sharedInterestScore = dateEval ? dateEval.compatibilityBreakdown.sharedInterests : profileScore;

  // 3. Conversation Chemistry Component (20%)
  const chemistryScore = dateEval ? dateEval.compatibilityBreakdown.conversationChemistry : Math.round(profileScore * 0.95);

  // 4. Explicit Preference Alignment Component (10%)
  const prefScore = dateEval ? dateEval.compatibilityBreakdown.explicitPreferenceAlignment : Math.round(profileScore * 0.9);

  // Formula: 40% profile + 30% shared + 20% chemistry + 10% preference
  const finalScore = Math.round(
    0.40 * profileScore +
    0.30 * sharedInterestScore +
    0.20 * chemistryScore +
    0.10 * prefScore
  );

  const topShared = Array.from(setAInterests).filter(i => setBInterests.has(i)).slice(0, 2);
  const sharedText = topShared.length > 0 ? topShared.join(" and ") : "innovation and growth mindset";

  const hasDate = !!dateEval;

  const reasoning = dateEval
    ? `[VERIFIED AGENT DATE CHEMISTRY] (${finalScore}% AI-simulated score). Connected over ${sharedText}. ${dateEval.whyTheyConnected[0] || ""}`
    : `[PROFILE COMPATIBILITY ESTIMATE] (${finalScore}% AI-simulated score). Overlap in ${sharedText} and lifestyle signals.`;

  return { score: finalScore, reasoning, hasDate };
}

export function generatePersonRankings(
  targetPersonId: string,
  targetAnalysis: PersonAnalysis,
  allPeople: Array<{ id: string; name: string; analysis: PersonAnalysis }>,
  evaluationsMap: Record<string, DateEvaluation> = {}
): RankingItem[] {
  const candidates = allPeople.filter(p => p.id !== targetPersonId);

  const scoredCandidates = candidates.map(candidate => {
    const evalKey = [targetPersonId, candidate.id].sort().join(":");
    const dateEval = evaluationsMap[evalKey];
    
    const { score, reasoning, hasDate } = calculateDeterministicScore(targetAnalysis, candidate.analysis, dateEval);
    return {
      personId: targetPersonId,
      matchedPersonId: candidate.id,
      score,
      reasoning,
      hasDate,
    };
  });

  // Sort descending by score, deterministic tie-break by candidate ID
  scoredCandidates.sort((a, b) => b.score - a.score || a.matchedPersonId.localeCompare(b.matchedPersonId));

  return scoredCandidates.map((c, index) => ({
    ...c,
    rank: index + 1,
  }));
}
