import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const res = NextResponse.redirect(new URL("/", req.url));
  const secure = process.env.NODE_ENV === "production";

  res.cookies.set("mp_auth", "0", { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: 0 });
  res.cookies.set("mp_email", "", { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: 0 });
  res.cookies.set("mp_plan", "", { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: 0 });
  res.cookies.set("mp_onboarded", "", { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: 0 });

  return res;
}
