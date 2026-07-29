import type { EvaluationCase, RateMetric } from "./types";

function rate(numerator: number, denominator: number): RateMetric {
  return {
    numerator,
    denominator,
    value: denominator === 0 ? null : numerator / denominator,
  };
}

export function evaluateCases(cases: EvaluationCase[]) {
  const sum = (key: keyof EvaluationCase) =>
    cases.reduce((total, item) => total + Number(item[key]), 0);
  const expectedFacts = sum("expectedFacts");
  const extractedFacts = sum("extractedFacts");
  const toolCalls = sum("toolCalls");

  return {
    sampleSize: cases.length,
    informationOmissionRate: rate(
      Math.max(0, expectedFacts - extractedFacts),
      expectedFacts,
    ),
    fieldAccuracy: rate(sum("correctFacts"), extractedFacts),
    unsupportedFactRate: rate(sum("unsupportedFacts"), extractedFacts),
    conflictRecall: rate(sum("detectedConflicts"), sum("expectedConflicts")),
    toolSuccessRate: rate(sum("successfulToolCalls"), toolCalls),
    averageDurationMs: cases.length ? sum("durationMs") / cases.length : null,
    totalEstimatedCostCny: sum("estimatedCostCny"),
  };
}
