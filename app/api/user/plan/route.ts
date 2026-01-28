import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { plan } = body;

    if (!plan || !["free", "basic", "pro"].includes(plan)) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const cookieStore = await cookies();
    cookieStore.set("mp_plan", plan, { 
      httpOnly: true, 
      secure: true, 
      sameSite: "lax", 
      path: "/" 
    });

    return NextResponse.json({ success: true, plan });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update plan" }, { status: 500 });
  }
}
