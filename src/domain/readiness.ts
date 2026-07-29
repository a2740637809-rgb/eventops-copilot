import type { EventProject } from "./types";

export function calculateReadiness(project: EventProject) {
  const required = project.facts.filter((fact) => fact.required);
  const confirmed = required.filter((fact) => fact.status === "confirmed");
  const unresolvedBlockers = project.issues.filter(
    (issue) => issue.severity === "blocking" && !issue.resolved,
  ).length;
  const missingRequired = required.filter(
    (fact) => fact.status === "missing",
  ).length;

  return {
    score: required.length
      ? Math.round((confirmed.length / required.length) * 100)
      : 100,
    confirmedRequired: confirmed.length,
    totalRequired: required.length,
    blockingCount: unresolvedBlockers + missingRequired,
  };
}
