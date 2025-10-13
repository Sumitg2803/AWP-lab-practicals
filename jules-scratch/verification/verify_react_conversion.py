import asyncio
import os
from playwright.async_api import async_playwright, expect

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        # Clear local storage before running the test
        context = await browser.new_context(storage_state=None)
        page = await context.new_page()

        # Get absolute paths for local files
        contact_page_path = f"file://{os.path.abspath('Lab Experiments/Personal Website/contact.html')}"
        admin_page_path = f"file://{os.path.abspath('Lab Experiments/Personal Website/admin-responses-7b8c9d.html')}"

        # Step 1: Navigate to contact.html and submit the form
        await page.goto(contact_page_path)

        await page.fill("#name", "Final Test User")
        await page.fill("#email", "final.test@example.com")
        await page.select_option("#subject", "project")
        await page.fill("#message", "This is the final test message from Playwright.")
        await page.click("button[type='submit']")

        # Wait for the success message to ensure localStorage is updated
        await expect(page.locator("#successMessage")).to_be_visible(timeout=5000)

        # Step 2: Navigate to the admin page
        await page.goto(admin_page_path)

        # Step 3: Verify the data is in the table
        await expect(page.locator("td:has-text('Final Test User')")).to_be_visible(timeout=10000)
        await expect(page.locator("td:has-text('final.test@example.com')")).to_be_visible()
        await expect(page.locator("span.badge:has-text('project')")).to_be_visible()

        # Step 4: Take a screenshot
        await page.screenshot(path="jules-scratch/verification/verification.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())