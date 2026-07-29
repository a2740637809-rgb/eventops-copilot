import type { EventProject } from "./types";

export function canApprove(project: EventProject) {
  const blockers = project.issues.filter(
    (issue) => issue.severity === "blocking" && !issue.resolved,
  );
  const missing = project.facts.filter(
    (fact) => fact.required && fact.status === "missing",
  );
  const reasons: string[] = [];
  if (blockers.length) reasons.push(`仍有 ${blockers.length} 个阻塞问题未解决`);
  if (missing.length) reasons.push(`仍有 ${missing.length} 个必填事实未确认`);
  return { allowed: reasons.length === 0, reasons };
}
