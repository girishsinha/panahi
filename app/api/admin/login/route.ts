import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (password === process.env.ADMIN_PASSWORD) {
    const res = NextResponse.json({ success: true });
    res.cookies.set("isAdmin", "true", { httpOnly: true, path: "/" });
    return res;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}

export async function GET(req: NextRequest) {
  const isAdmin = req.cookies.get("isAdmin")?.value;

  if (isAdmin) {
    const res = NextResponse.json({ success: true });
    res.cookies.set("isAdmin", "false", { httpOnly: true, path: "/" });
    return res;
  } else {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}
