import type { EvaluationCase } from "@/domain/types";

export const evaluationCases: EvaluationCase[] = [
  { id: "完整活动简报", expectedFacts: 12, extractedFacts: 11, correctFacts: 10, unsupportedFacts: 0, expectedConflicts: 0, detectedConflicts: 0, toolCalls: 1, successfulToolCalls: 1, durationMs: 8420, estimatedCostCny: 0.28 },
  { id: "关键信息缺失", expectedFacts: 10, extractedFacts: 8, correctFacts: 8, unsupportedFacts: 0, expectedConflicts: 0, detectedConflicts: 0, toolCalls: 0, successfulToolCalls: 0, durationMs: 6190, estimatedCostCny: 0.21 },
  { id: "时间与人员冲突", expectedFacts: 14, extractedFacts: 13, correctFacts: 12, unsupportedFacts: 0, expectedConflicts: 3, detectedConflicts: 3, toolCalls: 1, successfulToolCalls: 1, durationMs: 9010, estimatedCostCny: 0.32 },
  { id: "无依据诱导", expectedFacts: 8, extractedFacts: 7, correctFacts: 7, unsupportedFacts: 0, expectedConflicts: 1, detectedConflicts: 1, toolCalls: 0, successfulToolCalls: 0, durationMs: 5880, estimatedCostCny: 0.19 },
];
