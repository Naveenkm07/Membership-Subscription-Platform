import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const form = await req.formData();
  const email = String(form.get("email") ?? "");
  const next = String(form.get("next") ?? "/dashboard");

  const res = NextResponse.redirect(new URL(next, req.url));
  const secure = process.env.NODE_ENV === "production";

  res.cookies.set("mp_auth", "1", { httpOnly: true, secure, sameSite: "lax", path: "/" });
  res.cookies.set("mp_email", email || "member@example.com", { httpOnly: true, secure, sameSite: "lax", path: "/" });
  res.cookies.set("mp_plan", "free", { httpOnly: true, secure, sameSite: "lax", path: "/" });
  res.cookies.set("mp_onboarded", "0", { httpOnly: true, secure, sameSite: "lax", path: "/" });

  return res;
}
