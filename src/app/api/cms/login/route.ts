import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { passphrase } = await req.json();

  if (passphrase === process.env.CMS_KEY) {
    const res = NextResponse.json({ success: true });
    res.cookies.set("cms_auth", "true", {
      httpOnly: true,
      path: "/",
    });
    return res;
  }

  return NextResponse.json(
    { success: false, message: "Invalid passphrase" },
    { status: 401 }
  );
}
