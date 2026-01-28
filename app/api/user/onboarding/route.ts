import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    cookieStore.set("mp_onboarded", "1", { 
      httpOnly: true, 
      secure: true, 
      sameSite: "lax", 
      path: "/" 
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update onboarding status" }, { status: 500 });
  }
}
