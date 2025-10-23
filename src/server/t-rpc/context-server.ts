import { db } from "./db";
import { cookies, headers } from "next/headers";

export const createServerActionContext = async () => {
  return {
    db,
    cookieStore: cookies(),
    headerStore: headers(),
  };
};
