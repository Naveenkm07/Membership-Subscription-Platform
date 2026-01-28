const Stripe = require("stripe");

function getBusinessUrl(event) {
  const configured = process.env.BUSINESS_URL;
  if (configured) return configured.replace(/\/$/, "");

  const origin = event.headers?.origin;
  if (origin) return origin.replace(/\/$/, "");

  const referer = event.headers?.referer;
  if (referer) {
    try {
      return new URL(referer).origin;
    } catch {
      // fall through
    }
  }

  return "";
}

function isTestKey(key) {
  return typeof key === "string" && key.startsWith("sk_test_");
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    return { statusCode: 500, body: "Missing STRIPE_SECRET_KEY" };
  }

  // Payments must be test-mode only for this project.
  if (!isTestKey(stripeSecretKey)) {
    return { statusCode: 400, body: "Live Stripe keys are not allowed. Use a sk_test_ key." };
  }

  const businessUrl = getBusinessUrl(event);
  if (!businessUrl) {
    return { statusCode: 500, body: "Missing BUSINESS_URL" };
  }

  const rawBody = event.isBase64Encoded
    ? Buffer.from(event.body || "", "base64").toString("utf8")
    : event.body || "";

  const params = new URLSearchParams(rawBody);
  const planId = params.get("planId");

  if (!planId || planId === "free") {
    return { statusCode: 400, body: "Invalid plan. Choose basic or pro." };
  }

  const priceId =
    planId === "basic"
      ? process.env.STRIPE_PRICE_BASIC
      : planId === "pro"
        ? process.env.STRIPE_PRICE_PRO
        : null;

  if (!priceId) {
    return { statusCode: 500, body: "Missing Stripe price environment variable for selected plan" };
  }

  const stripe = new Stripe(stripeSecretKey);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${businessUrl}/billing?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${businessUrl}/pricing?checkout=cancel`,
      metadata: { planId },
    });

    return {
      statusCode: 303,
      headers: {
        Location: session.url,
      },
      body: "",
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err?.message ? String(err.message) : "Failed to create Stripe Checkout session",
    };
  }
};
