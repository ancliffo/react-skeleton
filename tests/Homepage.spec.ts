import { test, expect } from '@playwright/test';

test.describe('MERIDIAN Solutions Homepage', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display navigation menu', async ({ page, isMobile }) => {
    if (isMobile)
    {
      await page.getByRole('button', { name: 'open drawer' }).click();
      await expect(page.getByRole('dialog')).toMatchAriaSnapshot(`
        - heading "MERIDAN"
        - list:
          - listitem:
            - link "Home":
              - /url: /
          - listitem:
            - link "About Us":
              - /url: /about-us
          - listitem:
            - link "Demo":
              - /url: /demo
          - listitem:
            - link "DnD":
              - /url: /dnd
        `);
    }
    else {
      await expect(page.locator('#root')).toMatchAriaSnapshot(`
        - text: MERIDIAN
        - link "Home":
          - /url: /
        - link "About Us":
          - /url: /about-us
        - link "Demo":
          - /url: /demo
        - link "DnD":
          - /url: /dnd
        - button "Toggle color scheme"
        `);
    }
  });

  test('should display welcome message', async ({ page }) => {
    await expect(page.locator('h1')).toMatchAriaSnapshot(`
      - heading "Welcome to MERIDIAN!"
      `);
  });

  test('should display modules', async ({ page }) => {
    await expect(page.getByRole('main')).toMatchAriaSnapshot(`
      - link "T&E Create and Manage Test Events":
        - /url: /
        - heading "T&E" [level=6]
        - paragraph: Create and Manage Test Events
      - link "TOR/EMAF Discrepancy Reports":
        - /url: /
        - heading "TOR/EMAF" [level=6]
        - paragraph: Discrepancy Reports
      - link "Staff Management Manage Staff":
        - /url: /
        - heading "Staff Management" [level=6]
        - paragraph: Manage Staff
      - link "CS Cybersecurity Modules":
        - /url: /
        - heading "CS" [level=6]
        - paragraph: Cybersecurity Modules
      - link "WIMS Warehouse Inventory Management System":
        - /url: /
        - heading "WIMS" [level=6]
        - paragraph: Warehouse Inventory Management System
      - link "CSAT Combat Systems Assessment Team":
        - /url: /
        - heading "CSAT" [level=6]
        - paragraph: Combat Systems Assessment Team
      `);
  });
});
