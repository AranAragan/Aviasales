const { test, expect } = require('@playwright/test');


test.describe("Aviasales",()=>{
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.aviasales.com/');
  });
  test('test', async ({ page }) => {
  await page.locator('[data-test-id="origin-autocomplete-field"]').click();
  await page.waitForTimeout(1000)
  await page.locator('[data-test-id="origin-autocomplete-field"]').fill('New York');
  await page.locator('[data-test-id="destination-autocomplete-field"]').click();
  await page.waitForTimeout(1000)
  await page.locator('[data-test-id="destination-autocomplete-field"]').fill('Berlin');
  await page.locator('[data-test-id="departure-date-field"]').click();
  await page.locator('[data-test-id="departure-date-field"]').click();
  const firstTodo = page.locator('.calendar__month').nth(0);
  await firstTodo.locator(".calendar-day__date").nth(29).click()
  await page.locator('[data-test-id="no-return-ticket"]').click();
  await page.locator('[data-test-id="passengers-field"]').click();
  await page.locator('[data-test-id="passengers-adults-field"] svg').nth(1).click();
  
  const [page1] = await Promise.all([
    page.waitForEvent('popup'),
    await page.locator('[data-test-id="form-submit"]').click()
  ]);
  await page1.locator('.ticket-desktop__content').nth(0).click();
  const ticket = page1.locator('.ticket-main-modal__itinerary-info')
  await  expect(ticket.locator('.header_990455f [data-test-id="text"]').nth(0)).toHaveText([
    "New York – Berlin"
  ])
})   
})