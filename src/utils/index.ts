import redis from "../cache";
import { ResponseData } from "../interfaces/type";
import validUrl from "valid-url";

export const validateUrl = (url: string): string | boolean => {
  const prefix = ["https://", "http://"];

  if (
    prefix.includes(url.substring(0, 7)) ||
    prefix.includes(url.substring(0, 8))
  ) {
    return url;
  } else {
    if (validUrl.isUri(`${prefix[0]}${url}`)) {
      return `${prefix[0]}${url}`;
    } else {
      return false;
    }
  }
};

export const getRedisData = async (url: string): Promise<string | boolean> => {
  const urlData = await redis.get(`${url}`);

  if (urlData) {
    return urlData;
  }

  return false;
};

export const setRedisData = async (identifier: string, data: ResponseData) => {
  return redis.set(identifier, JSON.stringify(data), "ex", 60 * 60 * 24);
};
