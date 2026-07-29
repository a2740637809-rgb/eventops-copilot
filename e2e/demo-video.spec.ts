import { test } from "@playwright/test";

test.use({ video: { mode: "on", size: { width: 1280, height: 720 } } });

test("record 50 second product walkthrough", async ({ page }) => {
  test.setTimeout(70_000);
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto("/");
  await page.waitForTimeout(6000);
  await page.goto("/workspace");
  await page.waitForTimeout(5000);
  await page.getByRole("button", { name: "查看来源：活动日期" }).click();
  await page.waitForTimeout(5000);
  await page.getByRole("button", { name: /问题中心/ }).click();
  await page.waitForTimeout(5000);
  await page.getByRole("button", { name: /执行包/ }).click();
  await page.waitForTimeout(6000);
  await page.getByRole("button", { name: /问题中心/ }).click();
  await page.getByRole("button", { name: "应用合成确认，解除全部阻塞" }).click();
  await page.getByRole("button", { name: /审批与工具/ }).click();
  await page.waitForTimeout(4000);
  await page.getByRole("button", { name: "审批执行包" }).click();
  await page.waitForTimeout(2500);
  await page.getByRole("button", { name: /模拟日历操作/ }).click();
  await page.waitForTimeout(3500);
  await page.goto("/evaluation");
  await page.waitForTimeout(7000);
});
