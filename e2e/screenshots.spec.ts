import { test } from "@playwright/test";

test("capture portfolio screenshots", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const [name, path] of [
    ["home", "/"],
    ["workspace", "/workspace"],
    ["evaluation", "/evaluation"],
  ] as const) {
    await page.goto(path);
    await page.screenshot({
      path: `public/screenshots/${name}.png`,
      fullPage: true,
    });
  }
});
