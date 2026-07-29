export type FactStatus = "confirmed" | "pending" | "conflict" | "missing";
export type Provenance = "source" | "template" | "human";

export interface SourceRef {
  documentId: string;
  documentName: string;
  locator: string;
  quote: string;
}

export interface EventFact {
  id: string;
  field: string;
  label: string;
  value: string | null;
  status: FactStatus;
  required: boolean;
  source?: SourceRef;
}

export interface Issue {
  id: string;
  type: "missing" | "conflict" | "risk";
  severity: "blocking" | "warning";
  title: string;
  description: string;
  factIds: string[];
  resolved: boolean;
}

export interface ScheduleItem {
  id: string;
  start: string;
  end: string;
  title: string;
  owner: string;
  location?: string;
  provenance?: Provenance;
  sources?: SourceRef[];
}

export interface DeliverableItem {
  id: string;
  title: string;
  detail: string;
  owner?: string;
  due?: string;
  provenance: Provenance;
  sources: SourceRef[];
}

export interface RunStep {
  id: string;
  name: string;
  status: "succeeded" | "failed" | "waiting" | "simulated";
  durationMs: number;
  inputTokens: number;
  outputTokens: number;
  estimatedCostCny: number;
  timestamp: string;
}

export interface EventProject {
  id: string;
  name: string;
  eventType: string;
  date: string;
  status: "draft" | "review" | "approved";
  documents: { id: string; name: string; type: string; pages?: number }[];
  facts: EventFact[];
  issues: Issue[];
  schedule: ScheduleItem[];
  roles: DeliverableItem[];
  materials: DeliverableItem[];
  risks: DeliverableItem[];
  runSteps: RunStep[];
}

export interface EvaluationCase {
  id: string;
  expectedFacts: number;
  extractedFacts: number;
  correctFacts: number;
  unsupportedFacts: number;
  expectedConflicts: number;
  detectedConflicts: number;
  toolCalls: number;
  successfulToolCalls: number;
  durationMs: number;
  estimatedCostCny: number;
}

export interface RateMetric {
  numerator: number;
  denominator: number;
  value: number | null;
}
