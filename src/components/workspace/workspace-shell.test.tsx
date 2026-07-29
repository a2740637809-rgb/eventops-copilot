import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { demoEvent } from "@/data/demo-event";
import { WorkspaceShell } from "./workspace-shell";

describe("WorkspaceShell", () => {
  it("shows evidence and blocks approval until blockers are resolved", () => {
    render(<WorkspaceShell initialProject={demoEvent} />);
    expect(screen.getAllByText("合成演示数据").length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole("button", { name: "查看来源：活动日期" }));
    expect(screen.getByText(/活动日期：2026年8月22日/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /问题中心/ }));
    expect(screen.getByText("场控在 18:40 存在任务重叠")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /审批与工具/ }));
    fireEvent.click(screen.getByRole("button", { name: "审批执行包" }));
    expect(screen.getByRole("status")).toHaveTextContent("阻塞问题未解决");
  });
});
