import { appRouter } from "@/server/t-rpc/root";
import { createCallerContext } from "@/server/t-rpc/context";

export async function POST(req: Request) {
  const ctx = await createCallerContext();
  const caller = appRouter.createCaller(ctx);

  const { passphrase } = await req.json();
  const result = await caller.auth.login({ passphrase });

  if (result.success) {
    const response = Response.json(result);
    response.headers.append(
      "Set-Cookie",
      `cms_auth=true; Path=/; HttpOnly; SameSite=Lax`
    );
    return response;
  }

  return Response.json(result, { status: 401 });
}
