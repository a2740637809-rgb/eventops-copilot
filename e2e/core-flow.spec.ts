import { expect, test } from "@playwright/test";

test("evidence-first approval flow", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('a[href="/workspace"]').first()).toBeVisible();
  await page.goto("/workspace");
  await expect(page.getByText("先确认事实，再放行方案。")).toBeVisible();
  await page.getByRole("button", { name: "查看来源：活动日期" }).click();
  await expect(page.getByText(/活动日期：2026年8月22日/)).toBeVisible();
  await page.getByRole("button", { name: /问题中心/ }).click();
  await expect(page.getByText("场控在 18:40 存在任务重叠")).toBeVisible();
  await page.getByRole("button", { name: "应用合成确认，解除全部阻塞" }).click();
  await page.getByRole("button", { name: /审批与工具/ }).click();
  await page.getByRole("button", { name: "审批执行包" }).click();
  await expect(page.getByRole("status")).toContainText("执行包已审批");
  await page.getByRole("button", { name: /模拟日历操作/ }).click();
  await expect(page.getByRole("status")).toContainText("未写入真实日历");
});
