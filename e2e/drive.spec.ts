import { expect, test } from "@playwright/test";

test("opens Cluj and warps to Tokyo", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "OpenRoads" })).toBeVisible();
  await expect(page.getByTestId("author-credit")).toContainText("Alghisi Alessandro Paolo");
  await expect(page.getByTestId("drive-status")).toContainText("46.7712");

  await page.getByTestId("city-tokyo").click();
  await expect(page.getByTestId("drive-status")).toContainText("35.6595");
});

test("arrow keys increase speed on Cluj streets", async ({ page }) => {
  await page.goto("/");
  await page.locator("body").click();
  await page.keyboard.down("ArrowUp");
  await page.waitForTimeout(400);
  await page.keyboard.up("ArrowUp");
  const status = await page.getByTestId("drive-status").textContent();
  expect(status).not.toMatch(/^0 km\/h/);
});
