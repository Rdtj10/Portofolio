export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://portofolio-api-steel.vercel.app";

export const fetcher = async (url: string) => {
  const res = await fetch(`${API_BASE_URL}${url}`);
  if (!res.ok) {
    throw new Error(`API error: ${res.statusText}`);
  }
  return res.json();
};
