import { cookies } from "next/headers";
import { PlanId } from "./plans";

export type CurrentUser = {
  id: string;
  email: string;
  name: string;
  plan: PlanId;
  subscriptionStatus: "active" | "canceled" | "past_due" | "trialing";
  onboarded: boolean;
  progress: Record<string, number>;
};

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const cookieStore = await cookies();
  const authed = cookieStore.get("mp_auth")?.value === "1";
  if (!authed) return null;

  const email = cookieStore.get("mp_email")?.value ?? "member@example.com";
  const plan = (cookieStore.get("mp_plan")?.value ?? "free") as PlanId;
  const onboarded = cookieStore.get("mp_onboarded")?.value === "1";

  return {
    id: "user_stub_1",
    email,
    name: "Member",
    plan,
    subscriptionStatus: "active",
    onboarded,
    progress: {
      "getting-started": 0,
      "content-systems": 0,
      "pro-growth-playbook": 0,
    },
  };
}

export async function isAuthenticated() {
  return (await getCurrentUser()) !== null;
}

export async function updateProgress(slug: string, percent: number) {
  const cookieStore = await cookies();
  const current = cookieStore.get(`mp_progress_${slug}`)?.value;
  const existing = current ? parseInt(current, 10) : 0;
  if (percent > existing) {
    cookieStore.set(`mp_progress_${slug}`, percent.toString(), { httpOnly: true, secure: true, sameSite: "lax", path: "/" });
  }
}

export async function getProgress(slug: string): Promise<number> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(`mp_progress_${slug}`)?.value;
  return raw ? parseInt(raw, 10) : 0;
}
