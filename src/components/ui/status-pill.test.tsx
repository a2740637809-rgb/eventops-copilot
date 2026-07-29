import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatusPill } from "./status-pill";

describe("StatusPill", () => {
  it.each([
    ["synthetic", "合成演示"],
    ["warning", "存在冲突"],
    ["success", "已确认"],
    ["neutral", "待处理"],
  ] as const)("renders an accessible %s label", (tone, label) => {
    render(<StatusPill tone={tone}>{label}</StatusPill>);
    expect(screen.getByText(label)).toHaveAttribute("data-tone", tone);
  });
});
