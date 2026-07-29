import { describe, expect, it } from "vitest";
import { evaluateCases } from "./evaluation";

describe("evaluateCases", () => {
  it("reports metric values with explicit denominators", () => {
    const result = evaluateCases([
      {
        id: "complete",
        expectedFacts: 10,
        extractedFacts: 9,
        correctFacts: 8,
        unsupportedFacts: 0,
        expectedConflicts: 2,
        detectedConflicts: 2,
        toolCalls: 1,
        successfulToolCalls: 1,
        durationMs: 1200,
        estimatedCostCny: 0.08,
      },
    ]);
    expect(result.informationOmissionRate).toEqual({ numerator: 1, denominator: 10, value: 0.1 });
    expect(result.unsupportedFactRate.value).toBe(0);
    expect(result.toolSuccessRate.value).toBe(1);
    expect(result.sampleSize).toBe(1);
  });

  it("returns null instead of inventing a rate for a zero denominator", () => {
    const result = evaluateCases([]);
    expect(result.toolSuccessRate.value).toBeNull();
  });
});
