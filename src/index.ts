import { chromium } from "playwright";

type Story = {
  title: string;
  link: string;
};

const fun1 = async () => {
  //
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://news.ycombinator.com");

  let stories: Story[] = [];

  let content = await page.locator(".titleline > a");

  await page.screenshot({ path: ".screenshots/ss.png" });

  for (let i = 0; i < (await content.count()); i++) {
    let title = await content.nth(i).textContent();
    let link = await content.nth(i).getAttribute("href");

    if (title && link) stories.push({ title, link });
  }

  console.log(stories);
  // await page.keyboard.press("Enter");

  await page.waitForTimeout(30000);

  // await browser.close();
};

const fun2 = async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on("response", async (res) => {
    const type = res.headers()["content-type"];

    if (!type?.includes("application/json")) {
      console.log(type);
      return;
    }

    console.log(res.url());
    if (res.url().includes("price") || res.url().includes("product")) {
      try {
        console.dir(await res.json(), { depth: null });
        console.log("\n");
      } catch (error) {
        console.log("error in parsing ");
      }
    }
  });

  //
  await page.waitForTimeout(60000);

  await browser.close();
};

const fun3 = async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();

  const page = await context.newPage();

  await page.goto("https://codeforces.com/enter?back=%2F");
  //
  await page.locator("#handleOrEmail").fill("ninjaHattori1");
  await page.locator("#password").fill("Sahil@Minati");
  await page.locator("input.submit").click();

  await page.waitForURL("*/codeforces");

  await context.storageState({ path: "./src/auth.json" });

  await browser.close();
};

const fun4 = async () => {
  //
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://google.com");
  let signInButton = page.locator(`a[aria-label="Sign in"]`);

  await signInButton.click();
  // const newPage = await pagePromise;

  // console.log("newpage url ", newPage.url());
  //
  await page.locator("input#identifierId").fill("sahillovegames@gmail.com");
  await page.locator("button").first().click();

  await page.waitForTimeout(1000);

  await page.locator(`input[type="email"]`).first().fill("8860283753");
  await page.locator("button").first().click();

  await page.locator(`input[name="firstName"]`).fill("20bcs053_Vishwajeet");
  await page.locator("button").first().click();
};

const fun5 = async () => {
  //
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://google.com");
  let signInButton = page.locator(`a[aria-label="Sign in"]`);

  await signInButton.click();
  // const newPage = await pagePromise;

  // console.log("newpage url ", newPage.url());
  //
  await page.locator("input#identifierId").fill("sahillovegames@gmail.com");
  await page.locator("button").first().click();

  await page.waitForTimeout(1000);

  await page.locator(`input[type="email"]`).first().fill("8860283753");
  await page.locator("button").first().click();

  await page.locator(`input[name="firstName"]`).fill("20bcs053_Vishwajeet");
  await page.locator("button").first().click();
};

const main = async () => {
  // await fun1();
  // await fun2();
  // await fun3();
  await fun4();
};

main();
