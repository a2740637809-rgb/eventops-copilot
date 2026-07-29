import { describe, expect, it } from "vitest";
import { detectScheduleConflicts } from "./conflicts";

describe("detectScheduleConflicts", () => {
  it("detects overlapping schedule items assigned to the same owner", () => {
    const issues = detectScheduleConflicts([
      { id: "a", start: "18:30", end: "18:45", title: "嘉宾签到", owner: "场控" },
      { id: "b", start: "18:40", end: "19:00", title: "开场联排", owner: "场控" },
      { id: "c", start: "18:40", end: "19:00", title: "灯光检查", owner: "灯光师" },
    ]);
    expect(issues).toHaveLength(1);
    expect(issues[0].title).toContain("场控");
    expect(issues[0].factIds).toEqual(["a", "b"]);
  });
});
