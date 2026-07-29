import { demoEvent } from "@/data/demo-event";
import { WorkspaceShell } from "@/components/workspace/workspace-shell";

export default function WorkspacePage() {
  return <WorkspaceShell initialProject={demoEvent} />;
}
