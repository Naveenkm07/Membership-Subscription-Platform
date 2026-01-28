import { NextResponse } from "next/server";
import Stripe from "stripe";

function isTestKey(key: string | undefined) {
  return typeof key === "string" && key.startsWith("sk_test_");
}

export async function POST(req: Request) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    return new NextResponse("Missing STRIPE_SECRET_KEY", { status: 500 });
  }
  if (!isTestKey(stripeSecretKey)) {
    return new NextResponse("Live Stripe keys are not allowed. Use a sk_test_ key.", { status: 400 });
  }

  const form = await req.formData();
  const planId = String(form.get("planId") ?? "");

  if (!planId || planId === "free") {
    return new NextResponse("Invalid plan. Choose basic or pro.", { status: 400 });
  }

  const priceId =
    planId === "basic"
      ? process.env.STRIPE_PRICE_BASIC
      : planId === "pro"
        ? process.env.STRIPE_PRICE_PRO
        : undefined;

  if (!priceId) {
    return new NextResponse("Missing Stripe price environment variable for selected plan", { status: 500 });
  }

  const origin = req.headers.get("origin") ?? process.env.BUSINESS_URL;
  if (!origin) {
    return new NextResponse("Missing BUSINESS_URL", { status: 500 });
  }

  const stripe = new Stripe(stripeSecretKey);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin.replace(/\/$/, "")}/billing?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin.replace(/\/$/, "")}/pricing?checkout=cancel`,
      metadata: { planId },
    });

    return NextResponse.redirect(session.url!, { status: 303 });
  } catch (err: any) {
    return new NextResponse(err?.message ? String(err.message) : "Failed to create Stripe Checkout session", { status: 500 });
  }
}
