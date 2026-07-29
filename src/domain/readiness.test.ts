import { describe, expect, it } from "vitest";
import { calculateReadiness } from "./readiness";
import type { EventProject } from "./types";

const project = {
  facts: [
    { id: "1", field: "date", label: "日期", value: "2026-08-22", status: "confirmed", required: true },
    { id: "2", field: "budget", label: "预算", value: null, status: "missing", required: true },
    { id: "3", field: "guestCount", label: "人数", value: "180", status: "conflict", required: true },
    { id: "4", field: "theme", label: "主题", value: null, status: "missing", required: false },
  ],
  issues: [{ id: "i1", type: "conflict", severity: "blocking", title: "人数冲突", description: "", factIds: ["3"], resolved: false }],
} as EventProject;

describe("calculateReadiness", () => {
  it("scores required confirmed facts and returns blockers", () => {
    const result = calculateReadiness(project);
    expect(result.score).toBe(33);
    expect(result.confirmedRequired).toBe(1);
    expect(result.totalRequired).toBe(3);
    expect(result.blockingCount).toBe(2);
  });
});
