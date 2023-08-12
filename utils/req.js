import { parse } from "cookie";

export const getCachedTheme = (req) => {
  const cookies = parse(req.headers.cookie || "");

  return cookies.cachedTheme || null;
};
