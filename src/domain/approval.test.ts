import { describe, expect, it } from "vitest";
import { canApprove } from "./approval";
import type { EventProject } from "./types";

describe("canApprove", () => {
  it("blocks approval when unresolved blocking issues exist", () => {
    const result = canApprove({
      issues: [{ id: "i1", severity: "blocking", resolved: false }],
      facts: [],
    } as unknown as EventProject);
    expect(result.allowed).toBe(false);
    expect(result.reasons).toContain("仍有 1 个阻塞问题未解决");
  });
});
