import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_ACCESS } from "@/lib/constants";
import { API_URL } from "@/lib/server-config";

type Context = { params: Promise<{ path: string[] }> };

async function forward(req: NextRequest, { params }: Context) {
  const { path } = await params;
  const token = req.cookies.get(COOKIE_ACCESS)?.value;
  const hasBody = !["GET", "HEAD"].includes(req.method);

  try {
    const res = await fetch(`${API_URL}/${path.join("/")}${req.nextUrl.search}`, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: hasBody ? await req.text() : undefined,
      cache: "no-store",
    });

    return new NextResponse(await res.text(), {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Server is unavailable, please try again", errors: [] },
      { status: 502 },
    );
  }
}

export { forward as GET, forward as POST, forward as PATCH, forward as PUT, forward as DELETE };