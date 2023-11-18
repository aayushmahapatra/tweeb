import { Page } from "puppeteer";

// helper function to create random delays
export const randomDelay = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// helper function to type with random delay
export const typeWithRandomDelay = async (
  page: Page,
  selector: string,
  text: string
) => {
  for (let char of text) {
    await page.type(selector, char, { delay: randomDelay(30, 150) });
  }
};

// helper function to simulate mouse movement
export const moveToElement = async (page: Page, selector: string) => {
  const element = await page.$(selector);
  const boundingBox = await element.boundingBox();
  await page.mouse.move(
    boundingBox.x + boundingBox.width / 2,
    boundingBox.y + boundingBox.height / 2
  );
};
