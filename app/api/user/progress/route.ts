import { NextResponse } from "next/server";
import { updateProgress } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { slug, percent } = body;

    if (typeof slug !== "string" || typeof percent !== "number") {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    await updateProgress(slug, percent);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update progress" }, { status: 500 });
  }
}
