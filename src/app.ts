import express, { Application, Request, Response, NextFunction } from "express";
import puppeteer from "puppeteer";

import { validateUrl, getRedisData, setRedisData } from "./utils";
import { ResponseData } from "./interfaces/type";

const app: Application = express();

let responseData: ResponseData = {
  title: "",
  description: "",
  primaryImage: "",
};

const getUrlMetadata = async (
  response: Response,
  url: string,
): Promise<Response> => {
  try {
    const validatedUrl: string | boolean = validateUrl(url);

    if (!validatedUrl) {
      return response.status(400).json({
        message: "Invalid Url",
      });
    }

    // Fetch cached data
    const cachedData: string | boolean = await getRedisData(
      validatedUrl as string,
    );

    if (cachedData) {
      responseData = JSON.parse(cachedData as any);

      return response.status(200).json({
        message: `${validatedUrl}`,
        data: responseData,
      });
    }

    //Scrape URL using puppeteer
    const browser = await puppeteer.launch(
      { args: ["--no-sandbox", "--disable-setuid-sandbox"] },
    );
    const page = await browser.newPage();

    await page.goto(validatedUrl as string, {
      waitUntil: "load",
      timeout: 0,
    });

    //Scrape title
    const title: string = await page.title();
    //Scrape primary image
    const primaryImage: string = await page.evaluate(() => {
      return Array.from(document.images, (e) => e).sort(
        (a, b) =>
          b.naturalWidth * b.naturalHeight - a.naturalWidth * a.naturalHeight,
      )[0].src;
    });

    //Scrape description
    const description: string = await page.$eval(
      "head > meta[name='description']",
      (element: any) => element.content,
    );

    //Reassign response data
    responseData = {
      title,
      description,
      primaryImage,
    };

    //Set result to redis
    await setRedisData(validatedUrl as string, responseData);

    await browser.close();

    return response.status(200).json({
      message: `${validatedUrl}`,
      data: responseData,
    });
  } catch (error) {
    console.log(error.message);
    return response.status(400).json({
      message: "Invalid Url make sure you pass a valid url",
    });
  }
};

function ignoreFavicon(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  if (request.originalUrl === "/favicon.ico") {
    response.status(204).json({ nope: true });
  } else {
    next();
  }
}

app.use(ignoreFavicon);

app.use("/", async (request: Request, response: Response) => {
  await getUrlMetadata(response, request.originalUrl.substr(1));
});

export default app;
