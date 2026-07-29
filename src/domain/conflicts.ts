import type { Issue, ScheduleItem } from "./types";

function minutes(value: string) {
  const [hour, minute] = value.split(":").map(Number);
  return hour * 60 + minute;
}

export function detectScheduleConflicts(items: ScheduleItem[]): Issue[] {
  const issues: Issue[] = [];
  for (let left = 0; left < items.length; left += 1) {
    for (let right = left + 1; right < items.length; right += 1) {
      const a = items[left];
      const b = items[right];
      const overlaps =
        minutes(a.start) < minutes(b.end) && minutes(b.start) < minutes(a.end);
      if (overlaps && a.owner === b.owner) {
        issues.push({
          id: `schedule-${a.id}-${b.id}`,
          type: "conflict",
          severity: "blocking",
          title: `${a.owner}在 ${b.start} 存在任务重叠`,
          description: `“${a.title}”与“${b.title}”时间重叠，需要调整时间或负责人。`,
          factIds: [a.id, b.id],
          resolved: false,
        });
      }
    }
  }
  return issues;
}
