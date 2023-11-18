import express, { Request, Response } from "express";
import { Browser, executablePath } from "puppeteer";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import cors from "cors";
import dotenv from "dotenv";
import { moveToElement, randomDelay, typeWithRandomDelay } from "./utils";

// middlewares
puppeteer.use(StealthPlugin());
dotenv.config();

// express init
const app = express();
const PORT = process.env.PORT || 8111;
app.use(cors());
app.use(express.json());

app.post("/send-text", async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) throw new Error("Invalid Auth Token!");

    const { profileURL, message } = req.body;

    const browser: Browser = await puppeteer.launch({
      headless: true,
      executablePath:
        process.env.NODE_ENV === "production"
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
      args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote",
      ],
    });

    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();

    // set cookies function
    async function setCookies() {
      const cookies = [
        {
          name: "auth_token",
          value: token,
          domain: ".twitter.com",
          path: "/",
          secure: true,
          httpOnly: true,
          sameSite: "None",
        },
      ];
      await page.setCookie(...(cookies as any));
    }

    // set authentication cookies
    await setCookies();

    const recipientProfileUrl = profileURL;
    await page.goto(recipientProfileUrl, { waitUntil: "networkidle2" });

    // simulate mouse movement and click on DM button
    await page.waitForSelector('div[data-testid="sendDMFromProfile"]');
    await moveToElement(page, 'div[data-testid="sendDMFromProfile"]');
    await page.waitForTimeout(randomDelay(1000, 2000)); // random delay before clicking
    await page.click('div[data-testid="sendDMFromProfile"]');

    // wait and type the message with random delay
    await page.waitForTimeout(randomDelay(2000, 4000)); // random delay before typing
    await page.waitForSelector('div[data-testid="dmComposerTextInput"]');
    await typeWithRandomDelay(
      page,
      'div[data-testid="dmComposerTextInput"]',
      message
    );

    // simulate mouse movement and click the send button
    await page.waitForSelector('div[data-testid="dmComposerSendButton"]');
    await moveToElement(page, 'div[data-testid="dmComposerSendButton"]');
    await page.waitForTimeout(randomDelay(500, 1000)); // random delay before clicking
    await page.click('div[data-testid="dmComposerSendButton"]', {
      delay: randomDelay(1000, 2000),
    });

    await page.close();
    await context.close();
    await browser.close();

    res.status(200).send("Text sent successfully!");
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
